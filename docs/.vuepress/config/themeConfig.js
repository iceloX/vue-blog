const valineConf = require("./valineConfig");
const friendLinkConf = require("./friendLinkConfig");
const navConf = require("./navConfig");
const headConf = require("./headConfig");
const blogConf = require("./blogConfig");
module.exports = {
    lastUpdated: 'Last Updated',
    authorAvatar: '/avatar.png',
    valineConfig: valineConf,
    author: "icelo",
    nav: navConf,
    subSidebar: "auto",
    friendLink: friendLinkConf,
    head: headConf,
    blogConfig: blogConf,
    logo: "/avatar.png",
    type: "blog",
    codeTheme: 'tomorrow',
    // 备案号
    record: '皖ICP备19023356号-3',
    recordLink: 'https://beian.miit.gov.cn/',
}