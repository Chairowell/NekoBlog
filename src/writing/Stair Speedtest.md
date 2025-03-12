---
title: Stair Speedtest 食用教程
cover: assets/images/speedtest.jpg
date: 2023-01-21 11:22:40
categories:
  - 教程
---
**本文章为旧备份，还在重新整理中**

# Stair Speedtest 食用教程

## 引言

由于2rayN和clash软件内 **鸡肋** 的节点测试，我找来了基于Shadowsocks(R)和V2Ray的代理性能批量测试器——**StairSpeedtest**

**StairSpeedtest**来自**subconverter**（订阅转换器，用过机场的应该都知道）的作者**tindy2013**大佬编写

## 项目地址：

- Bat版：https://github.com/tindy2013/stairspeedtest
- C++版：https://github.com/tindy2013/stairspeedtest-reborn
- 电报 (Telegram) 频道：https://t.me/stairspeedtest

## 说明：

该食用教程仅为本人使用 StairSpeedtest 时所总结的经验以及项目文档翻译，若有错误还请在评论区纠正，谢谢

该食用教程 **不提供** 任何机场服务，如有需要请 **自行解决** ！！！

## 1.1 已测试的平台

- Windows 10 1903 x64, Windows Server 2008 R2 x64, Windows 7 SP1 x64
- Ubuntu 18.10
- Debian 6.3
- CentOS 7.6
- MacOS 10.13.6 High Sierra, 10.14.6 Mojave, 10.15 Catalina
- Android 8.0, 9.0 (Termux客户端)
- iOS/iPadOS 13 (iSH Shell客户端) **性能不佳，仅用于测试目的**
- Raspberry Pi 4B with RaspbianOS (armv7l)

## 1.2 支持的代理类型

![img](https://article.biliimg.com/bfs/article/2a39dd95516cce892a422f96189bea53bde73fb9.png@!web-article-pic.avif)支持的代理类型

## 2.1 下载

下载自己所需的版本（本人目前使用0.7.1，都找到这种文章看了，应该可以正常访问Github吧）

https://github.com/tindy2013/stairspeedtest-reborn/releases

## 2.2 食用方法

**一个小建议/提醒：**测速前记得与相关机场主做好沟通，因为占用大量有可能账号被封，机场节点测速是一件很讨嫌的事情，对于机场主或其他机场用户都是（任何服务器的带宽都是有限的），对于有IPLC/IEPL专线/AIA专线的机场而言，测速会花掉的流量折和成套餐费用也是不菲的，**测速是会扣除你套餐的流量的，量小的不建议测速**

## 2.2.1 初级 - 使用图形化界面进行测试（新手用）

**若是要大量节点测试，请转跳 2.2.2 进阶 ，GUI版对大量节点测试不稳定，占用很高**

![img](https://article.biliimg.com/bfs/article/2eec2a049ce9ffcbe008cb53baf41f455f1b9f77.png@!web-article-pic.avif)文件内容

Windows用户运行 **webgui.bat** 脚本，Linux用户(包括可执行shell命令的客户端)运行 **webgui.sh** 脚本

Mac用户就参考这篇文章吧，写的很详细了(才不是因为我没有Mac偷懒不写的)

https://limbopro.com/archives/ssrspeed.html

![img](https://article.biliimg.com/bfs/article/40ff8a71b4264b20baaf8a5bb34c2d5ccc357f62.png@1256w_424h_!web-article-pic.avif)命令窗口

当命令行窗口出现 **http://127.0.0.1:xxxxx/gui.html** 就说明服务跑起来了

将 **http://127.0.0.1:xxxxx/gui.html** 填入 **本机** 的浏览器，这里就直接 **进阶模式** 就行，功能全

![img](https://article.biliimg.com/bfs/article/3b6b2c8db348baea4075b4afc8d9de1fdd6dec36.png@1256w_916h_!web-article-pic.avif)一股浓浓的React的味道

请根据自己的需求，自行设置其它参数

设置好各项参数即可点击 提交 开始测试

测试过程的时间长短由 **节点数量** 和 **质量** 以及 **设定参数、网络质量好坏** 而定

**！！！切记测试时不要关闭网页和命令行窗口！！！**

![img](https://article.biliimg.com/bfs/article/329cdeb6a9f3197be91015a832693756f92e8c35.png@1256w_1158h_!web-article-pic.avif)测试结果

![img](https://article.biliimg.com/bfs/article/137a13d78697f6d7d0ceae62507a85142d2468fa.png@1256w_714h_!web-article-pic.avif)
测试结果





当测试结束时，将得到类似于上图的测试结果图片和日志，都保存在 **results** 文件夹中

若以上内容已经完全能够进行，不如开始进阶一下？

## 2.2.2 进阶 - 用命令行窗口进行测试（老手用）

首先打开 **pref.ini** 文件进行参数配置，该配置文件对GUI测试也有配置作用

废话不多说，把参数列在下面

**[common] 常规项配置**

```xml
[common]
;Excluded remarks, nodes with these remarks will be ignored, supports regular expression
;one remark per line, index starts at 0
exclude_remarks0=(剩余流量|到期时间|过期时间|官网地址|产品名称)

;Included remarks, if defined (";" removed), only nodes with these remarks will be tested, supports regular expression
;include_remarks0=香港
```

翻译版

```xml
;[常规配置]

;排除指定节点，有这些备注的节点将被忽略（不进行测试），支持正则表达式
;每行一个备注，索引从0开始
exclude_remarks0=(剩余流量|到期时间|过期时间|官网地址|产品名称)

;测试指定节点，如果定义了（";"去掉,";"为注释符），只有有备注的节点才会被测试，支持正则表达式
;每行一个备注，索引从0开始
;include_remarks0=香港
```

 示例

```xml
[common]
;比如说我不想要测试有"套餐到期，剩余"的节点
exclude_remarks0=(套餐到期|剩余)

;include_remarks0=香港
```

**[advanced] 高级项配置 & [webserver] Web服务端口配置**

```xml
[advanced]
;Test mode, default is all
;recognized value: all, speedonly, pingonly
;测试模式，默认为all
;值：all, speedonly, pingonly
;作用：全部 | 只测速度 | 只测延迟
speedtest_mode=all

;Test site ping (Google Ping)
;测试站点 ping (Google Ping)
test_site_ping=true

;Test upload speed
;测试上传速度
test_upload=false

;Test UDP NAT type
;测试UDP NAT类型
test_nat_type=true

;SS clients used in Speedtest, default is ss-csharp
;recognized value: ss-libev, ss-csharp
;Speedtest 中使用的 SS 客户端，默认是 ss-csharp
;值：ss-libev, ss-csharp
preferred_ss_client=ss-libev

;SSR clients used in Speedtest, default is ssr-csharp
;recognized value: ssr-libev, ssr-csharp
;Speedtest 中使用的 SSR 客户端，默认是 ssr-csharp
;值：ssr-libev, ssr-csharp
preferred_ssr_client=ssr-libev

;Override any port in configurations and use the following one
;!!!DO NOT USE THIS UNLESS YOU ARE VERY SURE OF WHAT YOU ARE DOING!!!
;uncomment to enable this feature
;覆盖配置中的任何端口并使用以下端口
;!!!不要使用这个，除非你非常确定你在做什么！
;取消注释以启用此功能
;override_conf_port=8080

;Multi-thread speedtest thread count
;多线程测速线程数（线程数越大，测试速度越快，占用越高）
thread_count=16

[webserver]
;Web服务地址配置（默认就行）
listen_address=127.0.0.1
listen_port=10870
```

**[export] 导出配置 & [rules] 测试规则配置**

```xml
[export]
;Export result with MaxSpeed
;导出结果包含 MaxSpeed
export_with_maxspeed=true

;Result picture sort method, default is speed
;recognized value: none, speed, rspeed, ping, rping
;结果图片的排序方式，默认为speed （带"r"的为降序）
;值：none, speed, rspeed, ping, rping
export_sort_method=none

;Export all nodes into one image when testing multiple links instead of separating different links into individual pictures
;测试多个链接时将所有节点导出为一张图片，而不是将不同的链接分成单独的图片
multilink_export_as_one_image=true

;Force single links to export an image
;强制单个链接导出图像
single_test_force_export=true

;Export as the newest style (SSRSpeed 2.5+)
;导出为最新样式（SSRSpeed 2.5+）
export_as_new_style=true

;Speed color set used in rendering picture
;recognized value: original, rainbow, custom
;渲染图片时使用的速度颜色集
;值：original, rainbow, custom
;作用：原始 | 彩虹 | 自定义
export_color_style=rainbow

;Custom color define
;Color groups format: R1,G1,B1|R2,G2,B2|...
;Color value is an integer from 0 to 65535
;自定义颜色定义
;颜色组格式：R1,G1,B1|R2,G2,B2|...
;颜色值为0到65535的整数
custom_color_groups=65535,65535,65535|32768,65535,0|65535,65535,0|65535,32768,49152|65535,0,0
;Color boundary format: B1|B2|...
;Boundary metric is Bytes/s
;颜色边界格式：B1|B2|...
;边界度量为字节/秒
custom_color_bounds=0|65536|524288|4194304|16777216

[rules]
;Test files format: URL|TagName
;测试文件格式：URL|TagName
test_file_urls=https://download.microsoft.com/download/2/0/E/20E90413-712F-438C-988E-FDAA79A8AC3D/dotnetfx35.exe|Default
test_file_urls=https://dl.google.com/android/studio/maven-google-com/stable/offline-gmaven-stable.zip|Google
test_file_urls=http://cachefly.cachefly.net/200mb.test|Cachefly
test_file_urls=http://updates-http.cdn-apple.com/2019FallFCS/fullrestores/061-22552/374D62DE-E18B-11E9-A68D-B46496A9EC6E/iPhone12,1_13.1.2_17A860_Restore.ipsw|Apple
;Rule format: matchType|matchItem1|matchItem2|...|matchTag
;规则格式：matchType|matchItem1|matchItem2|...|matchTag
rules=match_isp|Microsoft Corporation|Google
rules=match_isp|Google LLC|Default
```

以上为参数讲解

本人的配置，可抄作业

```xml
[common]
exclude_remarks0=(剩余流量|到期时间|过期时间|官网地址|产品名称|套餐到期|剩余)
[advanced]
speedtest_mode=all
test_site_ping=true
test_upload=false
test_nat_type=true
preferred_ss_client=ss-libev
preferred_ssr_client=ssr-libev
thread_count=16
[webserver]
listen_address=127.0.0.1
listen_port=10870
[export]
export_with_maxspeed=true
export_sort_method=none
multilink_export_as_one_image=true
single_test_force_export=true
export_as_new_style=true
export_color_style=rainbow
custom_color_groups=65535,65535,65535|32768,65535,0|65535,65535,0|65535,32768,49152|65535,0,0
custom_color_bounds=0|65536|524288|4194304|16777216
[rules]
test_file_urls=https://download.microsoft.com/download/2/0/E/20E90413-712F-438C-988E-FDAA79A8AC3D/dotnetfx35.exe|Default
test_file_urls=https://dl.google.com/android/studio/maven-google-com/stable/offline-gmaven-stable.zip|Google
test_file_urls=http://cachefly.cachefly.net/200mb.test|Cachefly
test_file_urls=http://updates-http.cdn-apple.com/2019FallFCS/fullrestores/061-22552/374D62DE-E18B-11E9-A68D-B46496A9EC6E/iPhone12,1_13.1.2_17A860_Restore.ipsw|Apple
rules=match_isp|Microsoft Corporation|Google
rules=match_isp|Google LLC|Default
```

接着我们启动 **stairspeedtest.exe** 

![img](https://article.biliimg.com/bfs/article/64d85b704c9f87be37aa8957b07a70308088b83e.png@1256w_452h_!web-article-pic.avif)

在 **①** 处填入订阅链接， **②** 处随便填，然后回车等待测试完成，当程序自动退出后就可以去 **results** 文件夹里看结果了

![img](https://article.biliimg.com/bfs/article/d55daa0acafacfdf3045011a7d17b4125bb85d1a.png@1256w_350h_!web-article-pic.avif)

## 结束语 

以上就是关于Stair Speedtest 食用教程，如果你资金充足，可以买台国内的大宽带云服务器，挂机测试会更好，如果你是机场主，还可以付费用Maoko测速（不是打广告）还可以测流媒体解锁情况

![img](https://article.biliimg.com/bfs/article/e0bf16367298e39a5fa37c9dd732bbb8b87685f3.png@1256w_488h_!web-article-pic.avif)这个是从某机场扒的，不打广告，把群组名打码了



本文为我原创本文禁止转载或摘编

