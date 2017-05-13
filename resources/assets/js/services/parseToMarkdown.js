import marked from 'marked';

export default function parseToMarkdown(rawBody) {
  return marked(rawBody, {
    gfm: true,
  });
}
