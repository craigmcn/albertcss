export function applyStripSnippets(html) {
  html = html.replace(
    /[ \t]*<details class="sg-snippet">[\s\S]*?<\/details>\n?/g,
    '',
  );
  html = html.replace(
    /\n\x20{6}\/\* ---- Code snippets ---- \*\/[\s\S]*?(?=\n\n\x20{6}\/\*)/,
    '',
  );
  html = html.replace(
    /\n\n\x20{6}\/\/ Copy buttons\n\x20{6}document\.querySelectorAll\('\.sg-snippet__copy'\)[\s\S]*?\}\);\n/,
    '\n',
  );
  return html;
}
