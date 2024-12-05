import { defineUserConfig } from "vuepress";

import theme from "./theme.js";

export default defineUserConfig({
  base: "/",

  lang: "zh-CN",
  title: "NekoBlog",
  description: "Chairowell's Blog 这里都是好玩的~",

  theme,

  // 和 PWA 一起启用
  // shouldPrefetch: false,
});
