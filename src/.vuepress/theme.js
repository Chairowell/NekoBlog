import { hopeTheme } from "vuepress-theme-hope";

import navbar from "./navbar.js";
import sidebar from "./sidebar.js";

export default hopeTheme({
  hostname: "https://nekoblog.chairo.cc",
  favicon: "/NyanCat.gif",

  author: {
    name: "Chairowell",
    url: "https://nekoblog.chairo.cc",
  },

  iconAssets: "iconify",

  logo: "logo.jpg",

  repo: "chairowell/NekoBlog",

  docsDir: "src",

  // 导航栏
  navbar,

  // 侧边栏
  sidebar,

  // 页脚
  footer: `什么都想做馁喵~`,
  copyright: `Copyright © 2022-${new Date().getFullYear()} Chairowell`,
  displayFooter: true,

  // 博客相关
  blog: {
    description: "",
    // intro: "/intro.html",
    // sidebarDisplay: "mobile",
    // articlePerPage: 10,
    medias: {
      GitHub: "https://github.com/chairowell",
      NeteaseCloudMusic: {
        icon: "https://s1.music.126.net/style/favicon.ico",
        link: "https://music.163.com/#/user/home?id=5079761200",
      },
      BiliBili: "https://space.bilibili.com/84378256",
      Twitter: "https://x.com/chairowell",
      // Discord: "https://example.com",
      // Gmail: "mailto:chairowell@gmail.com",
    },
  },

  // 加密配置
  encrypt: {
    config: {
      "/demo/encrypt.html": ["1234"],
    },
  },

  // 如果想要实时查看任何改变，启用它。注: 这对更新性能有很大负面影响
  // hotReload: true,

  // 在这里配置主题提供的插件
  plugins: {
    blog: true,

    comment: {
      provider: "Giscus",
      repo: "Chairowell/NekoBlog",
      repoId: "R_kgDONZaJ8Q",
      category: "Announcements",
      categoryId: "DIC_kwDONZaJ8c4Ck8hU",
      mapping: "title",
      inputPosition: "bottom",
    },

    components: {
      components: ["ArtPlayer", "Badge", "BiliBili", "CodePen", "FontIcon", "SiteInfo", "VidStack", "VPBanner", "VPCard"],
    },

    markdownImage: {
      figure: true,
      lazyload: true,
      mark: true,
      size: true,
    },

    // markdownMath: {
    //   // 启用前安装 katex
    //   type: "katex",
    //   // 或者安装 mathjax-full
    //   type: "mathjax",
    // },

    markdownTab: true,

    mdEnhance: {
      align: true,
      attrs: true,
      component: true,
      demo: true,
      include: true,
      mark: true,
      plantuml: true,
      spoiler: true,
      stylize: [
        {
          matcher: "Recommended",
          replacer: ({ tag }) => {
            if (tag === "em")
              return {
                tag: "Badge",
                attrs: { type: "tip" },
                content: "Recommended",
              };
          },
        },
      ],
      sub: true,
      sup: true,
      tasklist: true,
      vPre: true,

      // 在启用之前安装 chart.js
      // chart: true,

      // insert component easily

      // 在启用之前安装 echarts
      // echarts: true,

      // 在启用之前安装 flowchart.ts
      // flowchart: true,

      // gfm requires mathjax-full to provide tex support
      // gfm: true,

      // 在启用之前安装 mermaid
      // mermaid: true,

      // playground: {
      //   presets: ["ts", "vue"],
      // },

      // 在启用之前安装 @vue/repl
      // vuePlayground: true,

      // install sandpack-vue3 before enabling it
      // sandpack: true,
    },
    markdownHint: {
      // 启用 GFM 警告
      alert: true,
      // hint: true,
    },

    // 如果你需要 PWA。安装 @vuepress/plugin-pwa 并取消下方注释
    // pwa: {
    //   favicon: "/favicon.ico",
    //   cacheHTML: true,
    //   cacheImage: true,
    //   appendBase: true,
    //   apple: {
    //     icon: "/assets/icon/apple-icon-152.png",
    //     statusBarColor: "black",
    //   },
    //   msTile: {
    //     image: "/assets/icon/ms-icon-144.png",
    //     color: "#ffffff",
    //   },
    //   manifest: {
    //     icons: [
    //       {
    //         src: "/assets/icon/chrome-mask-512.png",
    //         sizes: "512x512",
    //         purpose: "maskable",
    //         type: "image/png",
    //       },
    //       {
    //         src: "/assets/icon/chrome-mask-192.png",
    //         sizes: "192x192",
    //         purpose: "maskable",
    //         type: "image/png",
    //       },
    //       {
    //         src: "/assets/icon/chrome-512.png",
    //         sizes: "512x512",
    //         type: "image/png",
    //       },
    //       {
    //         src: "/assets/icon/chrome-192.png",
    //         sizes: "192x192",
    //         type: "image/png",
    //       },
    //     ],
    //     shortcuts: [
    //       {
    //         name: "Demo",
    //         short_name: "Demo",
    //         url: "/demo/",
    //         icons: [
    //           {
    //             src: "/assets/icon/guide-maskable.png",
    //             sizes: "192x192",
    //             purpose: "maskable",
    //             type: "image/png",
    //           },
    //         ],
    //       },
    //     ],
    //   },
    // },

    // 如果你需要幻灯片，安装 @vuepress/plugin-revealjs 并取消下方注释
    // revealjs: {
    //   plugins: ["highlight", "math", "search", "notes", "zoom"],
    // },
  },
});