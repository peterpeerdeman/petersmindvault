import { PageLayout, SharedLayout } from "./quartz/cfg"
import * as Component from "./quartz/components"
import { byDateAndAlphabetical } from "./quartz/components/PageList"
import { SimpleSlug } from "./quartz/util/path"

// components shared across all pages
export const sharedPageComponents: SharedLayout = {
  head: Component.Head(),
  header: [],
  afterBody: [],
  footer: Component.Footer({
    links: {},
  }),
}

const recentNotesConfig = {
  title: "Recent notes",
  limit: 5,
  linkToMore: "changelog" as SimpleSlug,
}

const randomSort = (a: any, b: any) => {
  return Math.random() - 0.5
}

const explorerConfig = {
  title: "Explore",
  sortFn: randomSort,
}

// components for pages that display a single page (e.g. a single note)
export const defaultContentPageLayout: PageLayout = {
  beforeBody: [
    Component.Breadcrumbs(),
    Component.ArticleTitle(),
    Component.ContentMeta(),
    //Component.TagList(),
  ],
  left: [
    Component.PageTitle(),
    Component.DesktopOnly(Component.TableOfContents()),
    Component.DesktopOnly(Component.Explorer(explorerConfig)),
  ],
  right: [
    Component.Search(),
    Component.MobileOnly(Component.Spacer()),
    Component.Darkmode(),
    Component.Graph(),
    Component.Backlinks(),
    Component.RecentNotes(recentNotesConfig),
    Component.MobileOnly(Component.Explorer(explorerConfig)),
  ],
}

// components for pages that display lists of pages  (e.g. tags or folders)
export const defaultListPageLayout: PageLayout = {
  beforeBody: [Component.Breadcrumbs(), Component.ArticleTitle(), Component.ContentMeta()],
  left: [
    Component.PageTitle(),
    Component.MobileOnly(Component.Spacer()),
    Component.Search(),
    Component.Darkmode(),
    Component.DesktopOnly(Component.Explorer(explorerConfig)),
  ],
  right: [Component.Graph(), Component.MobileOnly(Component.Explorer(explorerConfig))],
}
