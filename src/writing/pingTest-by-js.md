---
title: JS实现纯前端检测网址可用性(可跨域)
date: 2022-07-24
tags:
  - Javascript  
---
**本文章为旧备份，还在重新整理中**

# JS实现纯前端检测网址可用性(可跨域)

前段时间在完善自己的导航网页，因为页面里有很多资源是临时或国外的，而且我不会经常去更新或检测已有链接的可用性（因为懒），所以想写个JS用来检测可用性，可以帮助检测，以便发现和及时更新。

但，是写前端还是后端呢？

上网搜了搜类似案例，大多都是后端的，而且有详细的讲解。

好！写后端吧，简单（有的抄），嘎嘎地写了一下，上线部署，更新资源。

不久后有朋友跟我说：“你有很多(墙外)资源我还是打不开啊。” 我：“..........”

每个人的网络环境不同，有些资源上不去是正常，但如何让他们明白这可能是因为他们的网络环境问题呢？

本地在线Ping！

![初步流程](./pingTest-by-js.assets/01-light.png#light)
![初步流程](./pingTest-by-js.assets/01-dark.png#dark)

## xmlHttpRequest 发请求，判断响应码

```javascript
function getURL(url) {
  function getXmlHttpRequest() {
    if (window.XMLHttpRequest) {
      return new XMLHttpRequest();
    }
    else if (window.ActiveXObject) {
      return new ActiveXObject("Microsoft.XMLHTTP");
    }
  };
  var xmlhttp = getXmlHttpRequest();
  xmlhttp.open("GET", url, false); //第三个参数表示是否异步
  xmlhttp.send();
  if (xmlhttp.readyState == 4) {
    if (xmlhttp.status == 200) {
      return true;
    } else {
      return false;
    }
  }
}
console.log("000----", getURL("http:127.0.0.1:8088"));
```

第二个方案 **利用Ajax发异步GET请求**

```html
<div class="url-setting">
  <input type="url" id="vueUrl" placeholder="格式如http://127.0.0.1:8080">
  <button id="linkBtn">进入系统</button>
</div>
//jquery检查连接的url服务是否有效,适用所有浏览器
const $ = require('jquery')
$(document).ready(function () {
  // 执行代码
  function NetPing(pingUrl) {
    $.ajax({
      type: "GET",
      cache: false,
      url: pingUrl,
      data: "",
      success: function () {
        alert("网址有效，开始加载。。");
        ipcRenderer.send('asynchronous-message',pingUrl); //异步将渲染进程的数据传给主进程
      },
      error: function () {
        alert("无效网址，请重新输入!");
        $("#vueUrl").val("");
      }
    });
  }

  //点击连接vue前端服务
  $("#linkBtn").click(function(){
    let urlVal = $("#vueUrl").val();
    NetPing(urlVal);
  })
});
```

这两种方法都不错，但一看控制台，精准的报错，CORS跨域问题，然后看了看解决方法，基本上就是后端改cors或者使用jsonp，可我要的是纯前端跨域检测啊喂，你这让我改后端，然而我又改不了其他服务器的后端，那我写这个有什么用？？？

![img](https://i0.hdslb.com/bfs/article/fb8e540ff739dc827a74d2232d5c271d848a26d3.png@!web-article-pic.avif)CORS跨域问题

![img](https://i0.hdslb.com/bfs/article/4adb9255ada5b97061e610b682b8636764fe50ed.png@progressive.webp)

这里是脚本之家的解决方法（参考）

```html
<!DOCTYPE>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>JS探测网站链接</title>
</head>
<body>
<div id="url1"></div>
<br/>
<div id="url2"></div>
<script language="JavaScript">
function butt(){
  tim=1;
  setInterval("tim++",100);
  autourl1="http://www.163.com"
  autourl2="https://www.jb51.net"
  var url1=document.getElementById("url1");
  var url2=document.getElementById("url2");
  url1.innerHTML=" 测试连接:http://www.163.com,测试中..... ";
  url2.innerHTML=" 测试连接:https://www.jb51.net,测试中..... ";
}
function auto(url){
  if(tim>20) {
    document.all(url).innerHTML=" 链接超时 "
  }else{
    document.all(url).innerHTML=" 链接耗时："+tim/10+"秒 "
  }
  //b++
}
function run(){
  document.write("<img src="+autourl1+"/"+Math.random()+" width=0 height=0 onerror=auto('url1')>")
  document.write("<img src="+autourl2+"/"+Math.random()+" width=0 height=0 onerror=auto('url2')>")
}
butt()
run()
</script>
</body>
</html>
```

![img](https://i0.hdslb.com/bfs/article/4adb9255ada5b97061e610b682b8636764fe50ed.png@progressive.webp)

HTML资源可以跨域引用，先请求一个压根不存在的文件，然后利用onerror事件判断时间，不但可以检测可用性，还可以查看访问速度！啊，多是一件美事啊

![img](https://i0.hdslb.com/bfs/article/1291769ab3f3a1bad52a9509152811240b9f8f35.png@1256w_1924h_!web-article-pic.avif)最终流程

```html
<div id="test" onclick="pingURL(this,'https://www.chairo.cc')">Ping My Website</div>
function pingURL(obj,url){
    var urlBox = document.getElementById(obj.id);
    var urlDate = new Date();
    var urlTime = urlDate.getMinutes()*60 + urlDate.getSeconds() + urlDate.getMilliseconds()/1000;
    urlBox.innerHTML = "<img id='"+urlTime+"' src="+url+"/"+Math.random()+" width=0 height=0 onerror='checkTime(this,"+urlTime+")' >Testing...";
}
function checkTime(obj,tim){
    var nowDate = new Date();
    var timec = (nowDate.getMinutes()*60 + nowDate.getSeconds() + nowDate.getMilliseconds()/1000 - tim).toFixed(2);
    if(timec>20){
       document.getElementById(obj.id).parentNode.innerHTML = "Ping Timeout"
     }else{
       document.getElementById(obj.id).parentNode.innerHTML = timec;
     }
}
```

# 使用方法

将上方JS引入，新建一个div，里面必须包含id属性和pingURL(this,url)函数

其中this不用改动，url部分放入链接（包含http://或https://）并用‘单引号’包裹

```html
<div id="test1" onclick="pingURL(this,'https://www.chairo.cc')">Ping www.chairo.cc</div>
<div id="test2" onclick="pingURL(this,'https://www.pixiv.ney')">Ping www.pixiv.net</div>
<div id="test3" onclick="pingURL(this,'https://www.baidu.com')">Ping www.baidu.com</div>
<div id="test4" onclick="pingURL(this,'https://www.google.com')">Ping www.google.com</div>
```

# **测试**



![img](https://i0.hdslb.com/bfs/article/6a7a25c8e2dfd55bf170c64864f17159472b1c73.gif@1256w_250h_!web-article-pic.avif)01 - V2ray未开启

![img](https://i0.hdslb.com/bfs/article/b7bc5a723beb78fc9ef866bb71b9050b8926d3ff.gif@1256w_250h_!web-article-pic.avif)
02 - V2ray开启

**
**

# **转载请保留链接**