import { loadQuartzConfig, loadQuartzLayout } from "./quartz/plugins/loader/config-loader"
import { componentRegistry } from "./quartz/components/registry"
import { PageTypeDispatcher } from "./quartz/plugins/pageTypes"
import { enforceExplicitPublish } from "./custom/publish"
import { GitDates } from "./custom/gitDates"
import LicenseFooter from "./custom/LicenseFooter"
import { StaticFiles } from "./custom/staticFiles"

// Explorer: random order to encourage exploring. Serialised to the client, so keep it self-contained.
const explorerOverrides = { sortFn: () => Math.random() - 0.5 }
componentRegistry.setOptionOverrides("@quartz-community/explorer", explorerOverrides)
componentRegistry.setOptionOverrides("explorer", explorerOverrides)

const config = enforceExplicitPublish(await loadQuartzConfig())
config.plugins.transformers.push(GitDates())

export const layout = await loadQuartzLayout()

// Licence notice above the footer plugin, on every page type.
for (const pageLayout of [layout.defaults, ...Object.values(layout.byPageType)]) {
  pageLayout.footer = [LicenseFooter, ...(pageLayout.footer ?? [])]
}

// loadQuartzConfig() builds the page dispatcher from its own copy of the layout,
// so replace it with one that uses the customised layout above.
// Also swap the built-in Static emitter for one that doesn't apply the vault's ignorePatterns.
config.plugins.emitters = [
  ...config.plugins.emitters
    .filter((e) => e.name !== "PageTypeDispatcher")
    .map((e) => (e.name === "Static" ? StaticFiles() : e)),
  PageTypeDispatcher({ defaults: layout.defaults, byPageType: layout.byPageType }),
]

export default config
