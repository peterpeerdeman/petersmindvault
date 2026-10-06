import fs from "fs"
import { dirname } from "path"
import { FilePath, QUARTZ, joinSegments } from "../quartz/util/path"
import { glob } from "../quartz/util/glob"
import { QuartzEmitterPluginInstance } from "../quartz/plugins/types"

/**
 * Copies quartz/static to <output>/static.
 *
 * Replaces the built-in Static emitter, which applies the vault's ignorePatterns to
 * quartz/static as well. Our patterns exclude all non-markdown files outside attachments/,
 * which would drop icon.png, og-image.png and the giscus themes.
 */
export const StaticFiles = (): QuartzEmitterPluginInstance => ({
  name: "Static",
  async *emit({ argv }) {
    const staticPath = joinSegments(QUARTZ, "static")
    const fps = await glob("**", staticPath, [".DS_Store"])
    const outputStaticPath = joinSegments(argv.output, "static")
    await fs.promises.mkdir(outputStaticPath, { recursive: true })
    for (const fp of fps) {
      const src = joinSegments(staticPath, fp) as FilePath
      const dest = joinSegments(outputStaticPath, fp) as FilePath
      await fs.promises.mkdir(dirname(dest), { recursive: true })
      await fs.promises.copyFile(src, dest)
      yield dest
    }
  },
  async *partialEmit() {},
})
