# Peters Mind Vault

Only notes with `publish: true` in their frontmatter are published. This is enforced twice
(the `explicit-publish` plugin and `custom/publish.ts`), and the build refuses to run if either
filter is missing.

## usage commands

link the vault (once; `content` is excluded via `.git/info/exclude`, not `.gitignore`,
because Quartz skips gitignored files):

`ln -s /path/to/vault content`

serve development:

`npx quartz build --serve`

build:

`npx quartz build`

verify that only `publish: true` notes end up in the site (run after every upgrade):

`npm run test:publish`

deploy manually:
`NETLIFY_SITE_ID="" NETLIFY_AUTH_TOKEN="" netlify deploy --prod --dir=public`

## customisations

- site config and plugins: `quartz.config.yaml`
- code-level overrides (publish guard, git created dates, licence footer, explorer sort,
  static files): `quartz.ts` and `custom/`
- migration log from the v4 fork: `MIGRATION.md`

# based on Quartz v5

> “[One] who works with the door open gets all kinds of interruptions, but [they] also occasionally gets clues as to what the world is and what might be important.” — Richard Hamming

Quartz is a set of tools that helps you publish your [digital garden](https://jzhao.xyz/posts/networked-thought) and notes as a website for free.

🔗 Read the documentation and get started: https://quartz.jzhao.xyz/

[Join the Discord Community](https://discord.gg/cRFFHYye7t)

## Sponsors

<p align="center">
  <a href="https://github.com/sponsors/jackyzha0">
    <img src="https://cdn.jsdelivr.net/gh/jackyzha0/jackyzha0/sponsorkit/sponsors.svg" />
  </a>
</p>
