module.exports = {
  // markdown-it-anchor 的选项
  anchor: { permalink: false },
  // markdown-it-toc 的选项
  toc: { includeLevel: [1, 2] },
  extendMarkdown: (md) => {
    // 使用更多的 markdown-it 插件!
    md.set({ html: true });
    md.use(require("markdown-it-katex"));
  },
};
