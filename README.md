# Tejas H Badala

A multi-page portfolio for tejasbadala.in. The public pages cover the author’s profile, literary work, legal education, blog and contact information. Eleventy renders every page as HTML. Typography, artwork, photographs, icons and the animated signature are served locally.

## Publish a blog article

In GitHub, open `src/articles`, choose **Add file > Create new file**, and give it a filename such as `my-article.md`. The filename becomes the article address, for example `/blog/my-article/`. Keep the filename when editing a published article so existing links keep working.

Start the file with the following fields, then write the article in Markdown. Set the title, publication date, summary and category to match your article. Use `kn` for Kannada or `en` for English.

```markdown
---
title: "Your article title"
date: 2026-11-26
category: "Essay"
language: en
description: "A one-sentence summary."
---

Write the opening paragraph here.

## A section heading

Continue with your article.
```

For a bilingual title, add a `gloss` field for the English subtitle. To include an illustration, place the image inside `src/assets/` and set the optional `hero` filename and `heroAlt` description. When GitHub Pages is enabled, committing to `main` rebuilds the blog index and publishes the article. The index sorts articles by date. The separate Naanu Kapi section renders the Kannada archive from `src/_data/archive.json`.

## Appearance

The site follows the device’s light or dark preference on first visit. The appearance button in the header switches the theme and remembers the reader’s choice across pages and visits.

## Local preview

Use Node.js 22 or later.

```sh
npm ci
npm run dev
```

Open the address Eleventy prints. Run `npm run build` to produce the complete static site in `dist/`. The downloadable package includes a prebuilt copy in that folder. To preview that copy without installing Node, serve the folder with a local HTTP server, for example `python -m http.server --directory dist 8000`, and open `http://localhost:8000/`.

## GitHub Pages and the domain

The workflow in `.github/workflows/pages.yml` builds on pushes to `main`, updates the compiled files on `gh-pages`, and requests a GitHub Pages build. The Pages publishing source is the root of `gh-pages`. You can also run the workflow manually from the Actions tab.

In the repository’s Pages settings, save `tejasbadala.in` as the custom domain. Configure the domain’s DNS for GitHub Pages using the [official custom-domain instructions](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site). Check the domain verification and HTTPS status in Pages settings. The build also carries `src/CNAME` into `dist/`.

## Sources and visual credits

- Profile, degree and achievements come from the supplied CV, provisional pass certificate, Kannada author profile and the author’s [existing Kannada portfolio](https://github.com/indragopa/tejugoju). Event photographs and portraits come from the supplied profile. The site publishes the relevant facts and selected photographs.
- The Araṇyani cover is the publisher’s cover, reproduced to identify the work. [National Book Trust catalogue](https://www.nbtindia.gov.in/books_detail__60__pm-yuva-series__3392__aranyani.nbt)
- The Naanu Kapi section republishes the text of the author’s Kannada articles from [Naanu Kapi](https://naanukapi.blogspot.com/). The Kannada author’s note is reproduced from the author’s existing portfolio.
- The home portrait sits on a neutral background. The signature beside it is a transparent vector trace of the author’s handwriting. A nine-second loop traces the signature, holds the completed name and fades before restarting. Readers who prefer reduced motion see the complete signature.
- The Western Ghats and law desk are original generated illustrations. The site mark pairs ತೇ, the opening of Tejas’s Kannada name, with a small ray of light.
- The masthead links to the portfolio sections. The theme control uses [Radix Icons](https://www.radix-ui.com/icons). EB Garamond supplies the upright Latin text, including Indic transliteration. Noto Serif Kannada supplies Kannada script, and DM Sans is used for navigation. All three fonts are self-hosted. Font and icon licences are in `licenses/`.
