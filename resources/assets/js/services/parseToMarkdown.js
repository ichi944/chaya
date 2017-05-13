import { Converter } from 'showdown';

export default function parseToMarkdown(rawBody) {
  const converter = new Converter({
    simplifiedAutoLink: true,
    literalMidWordUnderscores: true,
    literalMidWordAsterisks: true,
    tables: true,
    ghCodeBlocks: true,
    simpleLineBreaks: true,
    openLinksInNewWindow: true,
  });
  return converter.makeHtml(rawBody);
}

