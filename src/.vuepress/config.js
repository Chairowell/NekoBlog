import { defineUserConfig } from "vuepress";
import theme from "./theme.js";
import metingPlugin from "vuepress-plugin-meting2";

export default defineUserConfig({
  base: "/",

  lang: "zh-CN",
  title: "NekoBlog",
  description: "Chairowell's Blog 这里都是好玩的~",

  theme,

  // 和 PWA 一起启用
  shouldPrefetch: false,

  plugins: [
    metingPlugin({
      metingOptions: {
        global:true,
        api: "https://api.injahow.cn/meting/?server=:server&type=:type&id=:id&auth=:auth&r=:r",
        server: "netease",
        type: "playlist",
        mid: "6846157420",
        aplayerOptions: {
          fixed: true,
          mini: true,
          autoplay: false,
          theme: "#a33535",
          loop: "all",
          order: "random",
          preload: "auto",
          volume: 0.5,
          mutex: true,
        }
      },
    }),
  ],
});
