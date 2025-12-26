export function estimateReadingTime(content) {
    if (!content) return "1 min";

    let text = "";

    // Handle Sanity Portable Text
    if (Array.isArray(content)) {
        content.forEach(block => {
            if (block._type === 'block' && block.children) {
                block.children.forEach(child => {
                    text += child.text + " ";
                });
            }
        });
    } else if (typeof content === 'string') {
        text = content;
    }

    const words = text.trim().split(/\s+/).length;
    const wpm = 200; // Average reading speed
    const minutes = Math.ceil(words / wpm);

    return `${minutes} min read`;
}
