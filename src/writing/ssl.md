---
title: SSL证书申请与配置
date: 2022-08-10
categories:
  - 教程
tags:
  - SSL  
---
**本文章为旧备份，还在重新整理中**

# SSL证书申请与配置

# #介绍SSL

\- SSL（Secure Sockets Layer 安全套接字协议）
是为网络通信提供安全及数据完整性的一种安全协议，TLS与SSL在传输层与应用层之间对网络连接进行加密。

直观区别就是http:(无SSL) https:(有SSL)

**SSL工作原理（如图3.56）**

1）客户端向服务器发送一个开始信息“Hello”以便开始一个新的会话连接。
2）服务器根据客户的信息确定是否需要生成新的主密钥，如需要则服务器在响应客户的“Hello”信息时将包含生成主密钥所需的信息。
3）客户根据收到的服务器响应信息，产生一个主密钥，并用服务器的公开密钥加密后传给服务器。
4）服务器回复该主密钥，并返回给客户一个用主密钥认证的信息，以此让客户认证服务器。

![img](https://i0.hdslb.com/bfs/article/b1ea7abb1fa476aed91beea14436c11292de2fb8.png@1256w_780h_!web-article-pic.avif)

# 科普：HTTPS协议

HTTPS（Hypertext Transfer Protocol Secure）安全超文本传输协议
用于对数据进行压缩和解压操作，并返回网络上传送回的结果。
HTTPS使用端口443，而不是像HTTP那样使用端口80来和TCP/IP进行通信。

![img](https://i0.hdslb.com/bfs/article/4adb9255ada5b97061e610b682b8636764fe50ed.png@progressive.webp)

# #SSL证书申请

SSL证书申请并不像申请备案那么麻烦
只需要简单的几步就可以快速上手（全过程最短2分钟，实际时间看自己的主机或服务器访问速度，一般20分钟里能完全解决）

**SSL验证的种类**

1）File文件型 

2）DNS解析型

3）CNAME解析型

# SSL证书的种类

RSA证书 基于RSA算法（国际标准算法），应用较早，最为普及，比ECC算法的适用范围更广，兼容性更好，一般采用 2048 位的加密长度，但是对服务端性能消耗高。

ECC证书 基于ECC算法（椭圆加密算法），新一代算法趋势主流，一般采用 256 位加密长度，加密速度快，效率更高，对服务器资源消耗低，而且最重要的是更安全，抗攻击型更强。

**本文仅讲述File文件型配置方法，DNS型和CNAME型请自行百科，因为教程比较多，如果实在不会可以私信我**

SSL有免费和付费的，当然白嫖党有免费的，何乐而不为呢？

![img](https://i0.hdslb.com/bfs/article/4adb9255ada5b97061e610b682b8636764fe50ed.png@progressive.webp)

FreeSSL：https://freessl.cn/

# 1.进入FreeSSL，注册登陆，然后来到控制台

![img](https://i0.hdslb.com/bfs/article/21fa9df17c97a10ca57fedb2b63d80bbdaee75e3.png@1256w_716h_!web-article-pic.avif)

![img](https://i0.hdslb.com/bfs/article/f4eaab80a4869180f14d4e9f0cf2c2557de4b80b.png@1256w_716h_!web-article-pic.avif)

# 2.填写要申请的域名

**PS：**免费里只有TrustAsia是支持File的

![img](https://i0.hdslb.com/bfs/article/447f5f1f10089c4e6659699a21db32936ba39fec.png@1256w_716h_!web-article-pic.avif)

# 3.勾选SSL类型，验证类型，CSR生成方式，然后点击生成

![img](https://i0.hdslb.com/bfs/article/3cc050af88629eb47bc9d7d2554def57e323f5dc.png@1256w_726h_!web-article-pic.avif)

**！！！此时浏览器会自动下载一个CSR私钥，后面还会用到，不要弄丢！！！**

# 4.点击下载文件，下载一个txt文件，在你域名的根目录下创建 .well-known/pki-validatio路径，在这个路径下上传刚刚下载txt文件

（然后复制验证文件路径，在浏览器中打开，看看是否有显示和验证文件值一样的值）

![img](https://i0.hdslb.com/bfs/article/0eac24d83a4145f27f7d354799ecd75460f010f3.png@1256w_726h_!web-article-pic.avif)

![img](https://i0.hdslb.com/bfs/article/73b2936cf3c355d5039a28ed3b9cc41c4cff1910.png@1256w_726h_!web-article-pic.avif)

![img](https://i0.hdslb.com/bfs/article/7a8628f579a2ffb07ddea585bccd51a89cdefa54.png@1256w_804h_!web-article-pic.avif)

**如果能够访问，那么再进行第三步**



![img](https://i0.hdslb.com/bfs/article/024e9c162e6afa970e85187753a746dd9ceb1cb5.png@1256w_726h_!web-article-pic.avif)

![img](https://i0.hdslb.com/bfs/article/091703ee899136dd81db5cbc32f2e0668f3ea7f7.png@1256w_726h_!web-article-pic.avif)

下载一个zip的压缩包，解压里面两个文件，并用记事本打开

![img](https://i0.hdslb.com/bfs/article/ca6c7559ddb0213acf1a73044e9341236e29782a.png@1256w_716h_!web-article-pic.avif)

![img](https://i0.hdslb.com/bfs/article/cdf03465fa19ee7104638fa376b8d834998c978e.png@1256w_726h_!web-article-pic.avif)

完成后可以打开http强制转https
到此为止SSL就是全部配置完成了

![img](https://i0.hdslb.com/bfs/article/4adb9255ada5b97061e610b682b8636764fe50ed.png@progressive.webp)



**原文由是一只栗子用showdoc编写**

**转载请保留链接**

