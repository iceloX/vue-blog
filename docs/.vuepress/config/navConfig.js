module.exports = [
    {text: 'Home',link: '/',icon: 'reco-home'},
    {text: 'TimeLine', link: '/timeline/', icon: 'reco-date' },
    {text: 'About', link: '/about/', icon: 'reco-account' },
    {
        text: 'Tools',
        icon: 'reco-api',
        items: [{
                text: '系统镜像',
                items: [{
                        text: 'Windows',
                        link: 'https://msdn.itellyou.cn/',
                    },
                    {
                        text: 'Centos',
                        link: 'https://www.centos.org/',
                    },
                    {
                        text: 'Ubuntu',
                        link: 'https://ubuntu.com/download',
                    },
                ]
            },
            {
                text: '云服务',
                items: [{
                        text: '阿里云',
                        link: 'https://www.aliyun.com/',
                        icon: 'fa-aliyun'
                    },
                    {
                        text: '腾讯云',
                        link: 'https://cloud.tencent.com/'
                    },
                    {
                        text: '华为云',
                        link: 'https://www.huaweicloud.com/'
                    },
                    {
                        text: '七牛云',
                        link: 'https://www.qiniu.com/'
                    },
                ]
            },
            {
                text: '在线工具',
                items: [{
                        text: '在线抠图',
                        link: 'https://www.gaoding.com/koutu/'
                    },
                    {
                        text: 'GIF制作',
                        link: 'https://www.screentogif.com/'
                    },
                    {
                        text: '图片放大',
                        link: 'http://bigjpg.com/'
                    },
                    {
                        text: '图片压缩',
                        link: 'https://tinypng.com/'
                    },
                    {
                        text: '修改图片',
                        link: 'https://www.canva.cn/'
                    },

                ]
            },
        ]
    },
    {
        text: 'GitHub',
        link: 'https://github.com/iceloX',
        icon: 'reco-github'
    },
]