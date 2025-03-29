---
title: 如何用CSS给文本精准描边
date: 2024-12-21
categories:
  - 经验总结
tags:
  - CSS
---


# 如何用CSS给文本精准描边

  <style>
  .text {
    text-align: center;
    font-size: 42px;
    line-height: 2;
    color: #fff;
    font-weight: bold;
  }

  .native-text-shadow {
    text-shadow: 0 0 4px #32003C;
  }

  .multiple-text-shadow {
    text-shadow: 0 0 4px #32003C,
    0 0 4px #32003C,
    0 0 4px #32003C,
    0 0 4px #32003C,
    0 0 4px #32003C,
    0 0 4px #32003C,
    0 0 4px #32003C;
  }

  .native-webkit-text-stroke {
    -webkit-text-stroke: 4px #32003C;
  }
  .improve-webkit-text-stroke {
    -webkit-text-stroke: 8px #32003C;
    position: relative;
    z-index: 1;
  }
  .improve-webkit-text-stroke:after {
    content: "字体描边 | font stroke";
    color: #fff;
    position: absolute;
    z-index: 2;
    left: 0;
    right: 0;
    top: 0;
    -webkit-text-stroke-width: 0;
  }

  /*没有模糊的字体阴影*/
  /*上，右移动6px则 右上移动距离x,y 轴移动距离应该为 4px （6 / √2 ≈ 4.23 对角线长度为6的正方形的边长）  */
  .text-stroke-no-blur {
    text-shadow: 6px 0 0 #32003C,
    -6px 0 0 #32003C,
    0 6px 0 #32003C,
    0 -6px 0 #32003C,
    4px 4px 0 #32003C,
    -4px 4px 0 #32003C,
    4px -4px 0 #32003C,
    -4px -4px 0 #32003C;
  }

  .text-stroke {
    text-shadow: 0 -6px 4px #32003C, /*上*/
    4px -4px 4px #32003C, /*右上*/
    6px 0 4px #32003C, /*右*/
    4px 4px 4px #32003C, /*右下*/
    0 6px 4px #32003C, /*下*/
    -4px 4px 4px #32003C, /*左下*/
    -6px 0 4px #32003C, /*左*/
    -4px -4px 4px #32003C; /*左上*/
  }

  .text-stroke-colours {
    text-shadow: 0 -6px 4px #ff0000, /*上*/
    4px -4px 4px #46ff00, /*右上*/
    6px 0 4px #32003c, /*右*/
    4px 4px 4px #ffffff, /*右下*/
    0 6px 4px #ffd500, /*下*/
    -4px 4px 4px #ee00ff, /*左下*/
    -6px 0 4px #0021ff, /*左*/
    -4px -4px 4px #000000; /*左上*/
  }
  .svg-text-stroke {
    margin-top: 100px;
  }
  .svg-text-stroke svg,
  .improve-svg-text-stroke svg {
    overflow: visible;
    height: 2em;
  }
  .svg-text-stroke text,
  .improve-svg-text-stroke text{
    text-anchor: middle; /*文本居中*/
    fill: currentColor;  /*文本颜色*/
  }
  .svg-text-stroke text,
  .improve-svg-text-stroke use{
    stroke: #32003C;    /*描边颜色*/
    stroke-width: 4px;  /*控制描边宽度*/
    stroke-linejoin: round;  /*描边转角处理方式*/
  }
  </style>


<div class="native-text-shadow text">
  字体描边 | font stroke
</div>
<div class="multiple-text-shadow text">
  字体描边 | font stroke
</div>
<div class="native-webkit-text-stroke text">
  字体描边 | font stroke
</div>
<div class="improve-webkit-text-stroke text">
  字体描边 | font stroke
</div>
<div class="text-stroke-no-blur text">
  字体描边 | font stroke
</div>
<div class="text-stroke text">
  字体描边 | font stroke
</div>
<div class="text-stroke-colours text">
  字体描边 | font stroke
</div>

<div class="svg-text-stroke text">
  <svg>
    <text x='50%' >字体描边 | font stroke</text>
  </svg>
</div>
<div class="improve-svg-text-stroke text">
  <svg>
    <!--use 会完全复制 text 中的内容-->
    <use xlink:href="#text"></use>
    <text x='50%' id="text">字体描边 | font stroke</text>
  </svg>
</div>
