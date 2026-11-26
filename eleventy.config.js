import path from "node:path";

export default function (config) {
  config.addPassthroughCopy("src/assets");
  config.addPassthroughCopy("src/favicon.ico");
  config.addPassthroughCopy("src/CNAME");
  config.addFilter("readableDate", date => new Intl.DateTimeFormat("en-GB", {
    day: "numeric", month: "long", year: "numeric", timeZone: "UTC"
  }).format(new Date(date)));
  config.addFilter("isoDate", date => new Date(date).toISOString().slice(0, 10));
  // A relative deployment root also supports a GitHub project URL before DNS is connected.
  config.addTransform("relative URLs", function (html) {
    if (!this.page.outputPath?.endsWith(".html")) return html;
    const relative = path.relative(path.dirname(this.page.outputPath), "dist").split(path.sep).join("/");
    return html.replaceAll("@root/", relative ? relative + "/" : "./");
  });
  return { dir: { input: "src", output: "dist" }, markdownTemplateEngine: false };
}
