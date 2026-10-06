import { QuartzComponent, QuartzComponentProps } from "../quartz/components/types"

/** CC BY-NC-SA 4.0 licence notice, rendered above the regular Quartz footer. */
const LicenseFooter: QuartzComponent = ({ displayClass }: QuartzComponentProps) => {
  const attributeElements = {
    "xmlns:cc": "http://creativecommons.org/ns#",
    "xmlns:dct": "http://purl.org/dc/terms/",
  }
  return (
    <div class={`license-footer ${displayClass ?? ""}`}>
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
        &nbsp;is licensed under&nbsp;
        <a
          href="http://creativecommons.org/licenses/by-nc-sa/4.0/?ref=chooser-v1"
          target="_blank"
          rel="license noopener noreferrer"
          style="display:inline-block;"
        >
          CC BY-NC-SA 4.0
        </a>
      </p>
    </div>
  )
}

LicenseFooter.css = `
.license-footer {
  opacity: 0.7;
}
`

export default LicenseFooter
