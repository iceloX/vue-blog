const  mdConf = require("./config/mdConfig")
const themeConf = require("./config/themeConfig")
const pluginsConf = require("./config/pluginsConfig");
module.exports = {
  title: "冰洛博客",
  description: "Don't repeat yourself",
  port: 80,
  markdown:mdConf,
  theme: "reco",
  plugins: pluginsConf,
  themeConfig:themeConf,
  
};
