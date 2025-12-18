export function hasImageInTiptap(content) {
  const blocks = content?.content;
  if (!Array.isArray(blocks)) return false;
  return blocks.some((b) => b?.type === "image");
}

export function isHtmlEmpty(html) {
  if (!html) return true;

  const text = html.replace(/<[^>]*>/g, "").replace(/\s+/g, " ").trim();
  return text.length === 0;
}

export function getFirstImageSrc(content) {
  const blocks = content?.content;
  if (!Array.isArray(blocks)) return null;

  for (const b of blocks) {
    if (b?.type === "image" && b?.attrs?.src) return b.attrs.src;
  }
  return null;
}