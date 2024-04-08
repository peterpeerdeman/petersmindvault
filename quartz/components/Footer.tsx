import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import style from "./styles/footer.scss"
import { version } from "../../package.json"
import { i18n } from "../i18n"

interface Options {
  links: Record<string, string>
}

export default ((opts?: Options) => {
  const Footer: QuartzComponent = ({ displayClass, cfg }: QuartzComponentProps) => {
    const year = new Date().getFullYear()
    const links = opts?.links ?? []
    const attributeElements = {
      "xmlns:cc": "http://creativecommons.org/ns#",
      "xmlns:dct": "http://purl.org/dc/terms/",
    }
    return (
      <footer class={`${displayClass ?? ""}`}>
        <hr />
        <p {...attributeElements}>
          <a property="dct:title" rel="cc:attributionURL" href="https://notes.peterpeerdeman.nl">
            Peter's Mind Vault
          </a>{" "}
          by{" "}
          <a
            rel="cc:attributionURL dct:creator"
            property="cc:attributionName"
            href="https://peterpeerdeman.nl"
          >
            Peter Peerdeman
          </a>
          is licensed under &nbsp;
          <a
            href="http://creativecommons.org/licenses/by-nc-sa/4.0/?ref=chooser-v1"
            target="_blank"
            rel="license noopener noreferrer"
            style="display:inline-block;"
          >
            CC BY-NC-SA 4.0
            <img
              style="height:22px!important;margin-left:3px;vertical-align:text-bottom;"
              src="https://mirrors.creativecommons.org/presskit/icons/cc.svg?ref=chooser-v1"
            />
            <img
              style="height:22px!important;margin-left:3px;vertical-align:text-bottom;"
              src="https://mirrors.creativecommons.org/presskit/icons/by.svg?ref=chooser-v1"
            />
            <img
              style="height:22px!important;margin-left:3px;vertical-align:text-bottom;"
              src="https://mirrors.creativecommons.org/presskit/icons/nc.svg?ref=chooser-v1"
            />
            <img
              style="height:22px!important;margin-left:3px;vertical-align:text-bottom;"
              src="https://mirrors.creativecommons.org/presskit/icons/sa.svg?ref=chooser-v1"
            />
          </a>
        </p>
        <p>
          {i18n(cfg.locale).components.footer.createdWith}{" "}
          <a href="https://quartz.jzhao.xyz/">Quartz v{version}</a> © {year}
        </p>
        <ul>
          {Object.entries(links).map(([text, link]) => (
            <li>
              <a href={link}>{text}</a>
            </li>
          ))}
        </ul>
      </footer>
    )
  }

  Footer.css = style
  return Footer
}) satisfies QuartzComponentConstructor
