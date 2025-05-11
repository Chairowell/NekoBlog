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

  logo: "chairowell.jpg",

  repo: "chairowell/NekoBlog",
  repoDisplay: false,

  docsDir: "src",

  // 导航栏
  navbar,
  navbarLayout: {
    start: ["Brand"],
    center: ["Links"],
    end: ["Language", "Repo", "Outlook", "Search"],
  },

  // 侧边栏
  sidebar,

  // 编辑此页链接
  editLink: false,

  // 页脚
  footer: `什么都想做馁喵~<img  src="//sstatic1.histats.com/0.gif?4915067&101" alt="" border="0">`,
  copyright: `Copyright © 2022-${new Date().getFullYear()} Chairowell`,
  displayFooter: true,

  // 博客相关
  blog: {
    description: "ヾ(≧▽≦*)o 什么都想做馁喵~",
    intro: "/intro.html",
    // sidebarDisplay: "mobile",
    // articlePerPage: 10,
    timeline: "摸鱼也挺快乐的说_(:зゝ∠)_",
    medias: {
      GitHub: "https://github.com/chairowell",
      // NeteaseCloudMusic: {
      //   icon: "https://s1.music.126.net/style/favicon.ico",
      //   link: "https://music.163.com/#/user/home?id=5079761200",
      // },
      "163Music": "https://music.163.com/#/user/home?id=5079761200",
      BiliBili: "https://space.bilibili.com/84378256",
      Twitter: "https://x.com/chairowell",
      // AFdian: {
      //   icon: "https://static.afdiancdn.com/favicon.ico",
      //   link: "https://afdian.com/a/chairowell",
      // },
      "AFDian": "https://afdian.com/a/chairowell",
  
      // Discord: "https://example.com",
      // Gmail: "mailto:chairowell@gmail.com",
    },
  },

  markdown: {
    align: true,
    alert: true,
    attrs: true,
    component: true,
    demo: true,
    footnote: true,
    highlighter: {
      type: "shiki",
      notationFocus: true,
      notationDiff: true,
      notationHighlight: true,
      notationErrorLevel: true,
    },
    include: true,
    tabs: true,
    codeTabs: true,
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

  // 如果想要实时查看任何改变，启用它。注: 这对更新性能有很大负面影响
  // hotReload: true,

  // 在这里配置主题提供的插件
  plugins: {
    blog: true,

    icon:{
      assets: "iconify",
    },

    comment: {
      provider: "Giscus",
      repo: "Chairowell/NekoBlog",
      repoId: "R_kgDONZggkg",
      category: "Announcements",
      categoryId: "DIC_kwDONZggks4Ck8_J",
      mapping: "title",
      inputPosition: "bottom",
    },

    components: {
      components: ["ArtPlayer", "Badge", "BiliBili", "CodePen", "SiteInfo", "VidStack", "VPBanner", "VPCard"],
    },

    // 如果你需要 PWA。安装 @vuepress/plugin-pwa 并取消下方注释
    pwa: {
      favicon: "/NyanCat.gif",
      update: "available",
      cacheHTML: true,
      cacheImage: true,
      appendBase: true,
      apple: {
        icon: "/assets/NyanCat.gif",
        statusBarColor: "black-translucent",
      },
      msTile: {
        image: "/assets/NyanCat.gif",
        color: "#ffffff",
      },
      manifest: {
        short_name: "NekoBlog",
        description: "NekoBlog 这里都是好玩的~",
        display: "fullscreen",
        icons: [
          {
            src: "/assets/NyanCat.gif",
            sizes: "512x512",
            purpose: "maskable",
            type: "image/gif",
          },
          {
            src: "/assets/NyanCat.gif",
            sizes: "192x192",
            purpose: "maskable",
            type: "image/gif",
          },
          {
            src: "/assets/NyanCat.gif",
            sizes: "512x512",
            type: "image/gif",
          },
          {
            src: "/assets/NyanCat.gif",
            sizes: "192x192",
            type: "image/gif",
          },
        ],
        shortcuts: [
          {
            name: "NekoBlog",
            short_name: "NekoBlog",
            url: "/",
            icons: [
              {
                src: "/assets/NyanCat.gif",
                sizes: "192x192",
                purpose: "maskable",
                type: "image/gif",
              },
            ],
          },
        ],
      },
    },

    // 如果你需要幻灯片，安装 @vuepress/plugin-revealjs 并取消下方注释
    // revealjs: {
    //   plugins: ["highlight", "math", "search", "notes", "zoom"],
    // },
  },
});
