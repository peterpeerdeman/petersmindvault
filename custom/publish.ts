import { QuartzConfig } from "../quartz/cfg"
import { QuartzFilterPluginInstance } from "../quartz/plugins/types"

/**
 * Only notes with `publish: true` (or the string "true") in their frontmatter are published.
 *
 * Same rule as @quartz-community/explicit-publish, but compiled into this repo so it keeps
 * working even if that plugin fails to install or load (the plugin loader logs such failures
 * and carries on building, which would otherwise publish the whole vault).
 */
export const StrictExplicitPublish = (): QuartzFilterPluginInstance => ({
  name: "StrictExplicitPublish",
  shouldPublish(_ctx, [_tree, vfile]) {
    const publish = vfile.data?.frontmatter?.publish
    return publish === true || publish === "true"
  },
})

/**
 * Adds StrictExplicitPublish and aborts the build unless both it and the community
 * ExplicitPublish filter are active.
 */
export function enforceExplicitPublish(config: QuartzConfig): QuartzConfig {
  config.plugins.filters.push(StrictExplicitPublish())

  const names = config.plugins.filters.map((f) => f.name)
  for (const required of ["ExplicitPublish", "StrictExplicitPublish"]) {
    if (!names.includes(required)) {
      throw new Error(
        `Refusing to build: publish filter "${required}" is not active (active filters: ${names.join(", ") || "none"}). ` +
          `Only notes with "publish: true" may be published.`,
      )
    }
  }
  return config
}
