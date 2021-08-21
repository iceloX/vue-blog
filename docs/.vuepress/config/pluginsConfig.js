module.exports = [
  [
    "@vuepress/last-updated",
  ],
  ['rpurl'],
  [
    "vuepress-plugin-auto-sidebar",
    {
      collapse: {
        open: true,
      },
      sort: {
        readmeFirstForce: true
      }
    },
  ],
  [
    "meting",
    {
      meting: {
        // 网易
        server: "netease",
        // 读取歌单列表
        type: "playlist",
        mid: "5453912201",
      },
      // 不配置该项的话不会出现全局播放器
      aplayer: {
        // 吸底模式
        fixed: true,
        mini: true,
        // 自动播放
        autoplay: false,
        // 歌曲栏折叠
        listFolded: true,
        // 颜色
        theme: "#f9bcdd",
        // 播放顺序为随机
        order: "random",
        // 初始音量
        volume: 0.1,
        // 关闭歌词显示
        lrcType: 0,
      },
      mobile: {
        // 手机端去掉cover图
        cover: false,
      },
    },
  ],
];
