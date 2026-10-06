import fs from "fs"
import path from "path"
import { styleText } from "util"
import { Repository } from "@napi-rs/simple-git"
import { QuartzTransformerPluginInstance } from "../quartz/plugins/types"

/**
 * Git-based created/modified dates for notes in the vault's own git repository.
 *
 * Replaces the "git" source of the CreatedModifiedDate plugin (configured with
 * `priority: [frontmatter]`), which resolves note paths relative to the working directory
 * instead of the vault repository and finds no history when `content` is a symlink.
 *
 * Frontmatter `created` / `modified` win; otherwise both use the note's last commit date
 * (as the v4 fork did). Must run after CreatedModifiedDate, so it is appended last.
 */
export const GitDates = (): QuartzTransformerPluginInstance => ({
  name: "GitDates",
  markdownPlugins(ctx) {
    let repo: Repository | undefined
    let workdir: string | undefined
    try {
      repo = Repository.discover(fs.realpathSync(ctx.argv.directory))
      workdir = repo.workdir() ?? undefined
    } catch {
      console.log(
        styleText(
          "yellow",
          `\nWarning: no git repository for ${ctx.argv.directory}, dates fall back to build time`,
        ),
      )
    }

    return [
      () => async (_tree, file) => {
        const dates = file.data.dates
        if (!dates || !repo || !workdir || !file.data.filePath) return

        const frontmatter: Record<string, unknown> = file.data.frontmatter ?? {}
        let gitDate: number | undefined
        try {
          const fullPath = fs.realpathSync(path.resolve(file.data.filePath))
          gitDate = await repo.getFileLatestModifiedDateAsync(path.relative(workdir, fullPath))
        } catch {
          return // not committed yet: keep the frontmatter / build-time dates
        }

        if (frontmatter.modified === undefined) dates.modified = new Date(gitDate)
        if (frontmatter.created === undefined) dates.created = new Date(gitDate)
      },
    ]
  },
})
