const YES_MARK_HTML = '<span class="coverage-mark coverage-mark--yes">✓</span>';
const VARIABLE_MARK_HTML = '<span class="coverage-mark coverage-mark--variable">±</span>';
const CROSS_ICON_HTML =
  '<span class="coverage-mark coverage-mark--no"><img src="/assets/img/cross-icon.svg" alt="cross-icon" /></span>';
const FEATURED_YES_HTML = `<td class="spectrum-table__featured-cell">${YES_MARK_HTML}</td>`;

/** Some WordPress fields were populated by pasting the page's original JSX verbatim
 * instead of real HTML (className=, rowSpan={n}, and the <YesMark />-style component
 * tags). This rewrites that back into markup a browser can actually render. */
export function wpJsxContentToHtml(raw) {
  if (!raw) return "";
  return raw
    .replace(/<FeaturedYes\s*\/>/g, FEATURED_YES_HTML)
    .replace(/<YesMark\s*\/>/g, YES_MARK_HTML)
    .replace(/<VariableMark\s*\/>/g, VARIABLE_MARK_HTML)
    .replace(/<CrossIcon\s*\/>/g, CROSS_ICON_HTML)
    .replace(/className=/g, "class=")
    .replace(/rowSpan=\{(\d+)\}/g, 'rowspan="$1"')
    .replace(/colSpan=\{(\d+)\}/g, 'colspan="$1"')
    .replace(/\{"\s*"\}/g, " ");
}

/** Splits the Zaynich Journey approval content into its header (title/subtitle) and
 * body (paragraphs) blocks so a video can be rendered between them, matching the
 * page's Title -> Video -> Paragraph layout. */
export function splitJourneyContent(raw) {
  const html = wpJsxContentToHtml(raw);
  const headerMatch = html.match(/<header[\s\S]*?<\/header>/i);
  const headerHtml = headerMatch ? headerMatch[0] : "";
  const rest = headerMatch ? html.slice(headerMatch.index + headerMatch[0].length) : html;
  const contentMatch = rest.match(/<div[^>]*class="zaynich-approval__content"[\s\S]*?<\/div>/i);
  const contentHtml = contentMatch ? contentMatch[0] : rest;
  return { headerHtml, contentHtml };
}
