export default {
  layout: "article.njk",
  tags: "article",
  section: "blog",
  permalink: ({ page }) => `/blog/${page.fileSlug}/index.html`
};
