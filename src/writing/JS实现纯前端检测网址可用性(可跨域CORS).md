---
title: JS实现纯前端检测网址可用性(可跨域CORS)
date: 2022-07-24
tags:
  - Javascript
  - CORS
star: 1
isOriginal: true
sticky: 1
---

# JS实现纯前端检测网址可用性(可跨域CORS)

前段时间在完善自己的导航网页，因为里面有很多资源是临时或国外的，而且不会主动检测已有链接的可用性 ~~（因为懒）~~ ，所以想写个JS用来帮助我检测，以便发现和及时更新。

但，是写前端还是后端呢？上网搜了搜类似案例，大多都是后端的，而且有详细的讲解。好！那就写后端吧，简单 ~~（有的抄）~~ ，就嘎嘎地写了一下，检测，更新资源，上线部署。

不久后有朋友跟我说：“还是有很多(墙外)资源打不开啊。” 

我：“......不是（无语到了）”

每个人的网络环境都各不相同，有些资源上不去也是正常，但如何让他们明白，这可能是因为他们的网络环境问题呢？

我就在想，能否在前端尝试Ping或类似的测试呢？

## 方案一：通过响应码判断

前端发送网络请求，最快想到的就是 `XMLHttpRequest` 、`Ajax` 、`Fetch API` 这三兄弟了。通过发起网络请求，获取响应码，然后根据响应码判断是否可用。

![响应码判断](./JS实现纯前端检测网址可用性(可跨域CORS).assets/01.png)

### 用XMLHttpRequest发送请求

> 什么是 XMLHttpRequest (XHR)：用于与服务器交互。通过 XMLHttpRequest 可以在不刷新页面的情况下请求特定 URL，获取数据。这允许网页在不影响用户操作的情况下，更新页面的局部内容。
> 
> [XMLHttpRequest - Web API | MDN](https://developer.mozilla.org/zh-CN/docs/Web/API/XMLHttpRequest)

```javascript
function statusURL(url) {

  // 创建 XMLHttpRequest 对象
  function getXmlHttpRequest() {
    if (window.XMLHttpRequest) {
      return new XMLHttpRequest();
    } else if (window.ActiveXObject) { 
      // IE浏览器 不支持 XMLHttpRequest，但支持 ActiveXObject
      return new ActiveXObject("Microsoft.XMLHTTP");
    }
  }

  var xhr = getXmlHttpRequest();
  xhr.open("GET", url, true);    // 第三个参数true表示使用异步请求
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {  // 4表示表示请求已完成且响应已到达
      if (xhr.status === 200) {
        console.log("URL 可用");
      } else {
        console.log("URL 不可用");
      }
    }
  };
  
  xhr.onerror = function () {
    console.log("请求发生错误");
  };

  xhr.send();
}

statusURL("http://localhost:5500/");  // 本地LiveServer服务
statusURL("https://www.baidu.com/");  // 未被墙网站
statusURL("https://www.google.com/");  // 被墙网站
```

::: details 查看运行结果
![http://localhost:5500/](./JS实现纯前端检测网址可用性(可跨域CORS).assets/02.png)
![https://www.baidu.com/](./JS实现纯前端检测网址可用性(可跨域CORS).assets/03.png)
![https://www.google.com/](./JS实现纯前端检测网址可用性(可跨域CORS).assets/04.png)
:::

::: details **这里有一种更好的写法**

参考和修改自：[elsewhere | 用Javascript检测跨域资源(CORS)的可用性](https://devylee.github.io/post/2017/04/cors-reachability-detect-in-javascript.html)

```javascript
function statusURL(url) {
  var xhr = new ( window.ActiveXObject || XMLHttpRequest )( 'Microsoft.XMLHTTP' );
  xhr.open('HEAD', url, true);  // 只发送HEAD请求，不发送实际数据
  xhr.timeout = 3000;  // 设置超时时间
  xhr.onreadystatechange = () => {
    if (xhr.readyState == 4) {
      if ([200, 301, 302, 304, 307].includes(xhr.status)) {
        console.log("URL 可用，响应码：", xhr.status);
      } else {
        console.log("URL 不可用，响应码：", xhr.status);
      }
    }
  }
  xhr.onerror = () => {
    console.log("请求发生错误");
  }
  xhr.send();
}

statusURL("http://localhost:5500/");  // 本地LiveServer服务
statusURL("https://www.baidu.com/");  // 未被墙网站
statusURL("https://www.google.com/");  // 被墙网站
```

![运行结果](./JS实现纯前端检测网址可用性(可跨域CORS).assets/06.png)

:::

通过测试，可以看到在向同地址的服务器发请求时，返回了200响应码，则说明该地址可用。

![CORS跨域错误](./JS实现纯前端检测网址可用性(可跨域CORS).assets/05.png)

但是向其他地址的服务器发请求时，发现浏览器抛出了CORS跨域错误，并没能实现我们需要的效果。

- `CORS policy: No 'Access-Control-Allow-Origin'` 响应中缺少 Access-Control-Allow-Origin，浏览器阻止了该跨源请求。
- `net::ERR_FAILED 200 (OK)` 在这里表示服务器响应成功，但是浏览器拒绝了访问。

> 什么是CORS跨域：CORS 是一种由浏览器实现的安全特性，旨在防止恶意网站通过脚本访问不属于它们域的资源。基本上，它允许服务器通过在响应中设置一些 HTTP 头，明确指示哪些域可以访问该资源。
> 
> [跨源资源共享（CORS） - HTTP | MDN](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/CORS)

既然 XMLHttpRequest 不能实现跨域请求，那就只能用其他方式了。

### 用Ajax发送请求

> 什么是 Ajax：即**A**synchronous **J**avascript **A**nd **X**ML（异步JavaScript和XML）是一种在 Web 应用中通过异步发送 HTTP 请求向服务器获取内容，并使用这些新内容更新页面中相关的部分，而无需重新加载整个页面的 Web 开发技术。
>
> [AJAX - MDN Web 文档术语表：Web 相关术语的定义 | MDN](https://developer.mozilla.org/zh-CN/docs/Glossary/AJAX)

::: details **需要提前引入jQuery**

```javascript:no-line-numbers
// 引入jquery
function loadjQuery(callback) {
  const script = document.createElement('script');
  script.src = 'https://cdn.bootcdn.net/ajax/libs/jquery/3.6.0/jquery.min.js';
  script.onload = () => {
    console.log('jQuery loaded');
    if (callback) {
      callback();  // 当 jQuery 加载完成后调用回调函数
    }
  };
  script.onerror = () => {
    console.error('Failed to load jQuery');
  };
  document.head.appendChild(script);  // 将<script>标签添加到<head>中
}

// 使用加载的 jQuery
loadjQuery(() => {
  // 在这里可以使用 jQuery
  $(document).ready(function () {
    console.log("jQuery is ready to use!");
  });
});
```
:::

```javascript
// 发送Ajax请求
function statusURL(url) {
  $.ajax({
    url: url,
    type: "GET",
    cache: false,
    data: "",
    success: function () {
      console.log("URL 可用");
    },
    error: function () {
      console.log("URL 不可用");
    }
  });
}

statusURL("http://localhost:5500/");  // 本地LiveServer服务
statusURL("https://www.baidu.com/");  // 未被墙网站
statusURL("https://www.google.com/");  // 被墙网站
```
::: details 查看运行结果

这里的运行结果和上面的 XMLHttpRequest 是一样的，只是用了 jQuery 封装了一下而已。不过因为加了 `cache: false,` , 所以每次请求后面都会跟上一个时间戳，避免缓存。

![运行结果](./JS实现纯前端检测网址可用性(可跨域CORS).assets/07.png)

:::

老的方案(实际中不推荐使用),这里做简单介绍(实际项目中如果要使用JSONP,一般会使用JQ等对JSONP进行了封装的类库来进行ajax请求)

这两种方法都不错，但一看控制台，精准的报错，CORS跨域问题，然后看了看解决方法，基本上就是后端改cors或者使用jsonp，可我要的是纯前端跨域检测啊喂，你这让我改后端，然而我又改不了其他服务器的后端，那我写这个有什么用？？？

![img](https://i0.hdslb.com/bfs/article/fb8e540ff739dc827a74d2232d5c271d848a26d3.png@!web-article-pic.avif)CORS跨域问题

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

## 相关文章
暂无

## 参考

- [XMLHttpRequest - Web API | MDN](https://developer.mozilla.org/zh-CN/docs/Web/API/XMLHttpRequest)
- [跨源资源共享（CORS） - HTTP | MDN](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/CORS)
- [elsewhere | 用Javascript检测跨域资源(CORS)的可用性](https://devylee.github.io/post/2017/04/cors-reachability-detect-in-javascript.html)
- [AJAX - MDN Web 文档术语表：Web 相关术语的定义 | MDN](https://developer.mozilla.org/zh-CN/docs/Glossary/AJAX)