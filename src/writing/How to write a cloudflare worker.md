---
title: 如何编写一个 Cloudflare Worker
cover: assets/images/cloudflare.png
date: 2024-12-10 15:00:00
categories:
  - 教程
tags:
  - cloudflare
  - vscode
  - 部署
isOriginal: true
---

# 如何编写一个 Cloudflare Worker

使用 Wrangler CLI 工具来编写和部署 Cloudflare Worker 是非常轻松的一件事。

当然这里有更详细的官方文档，如果你想了解更多，可以访问 [Cloudflare Worker 文档](https://developers.cloudflare.com/workers/)

## 大致流程

1. [安装 Wrangler CLI]()
2. [创建一个 Worker]()
3. [编写你的 worker 代码]()
4. [测试你的 worker 代码]()
5. [推送和部署你的 worker 代码]()

## 安装 Wrangler CLI

::: code-tabs

@tab npm
```bash:no-line-numbers
npm install -g @cloudflare/wrangler
```

@tab yarn
```bash:no-line-numbers
yarn global add @cloudflare/wrangler
```

@tab pnpm
```bash:no-line-numbers
pnpm add -g @cloudflare/wrangler
```

:::

## 创建一个 Worker

```bash:no-line-numbers
wrangler generate [(必)你的项目名称] [(选)模板仓库地址]
```

例如：
```bash:no-line-numbers
wrangler generate my-worker https://github.com/cloudflare/worker-template
cd my-worker
```
::: warning

:::

::: details 示例输出

当你看到以下类似的示例输出时，说明你已经成功创建了一个 Worker 项目

```bash:no-line-numbers
> wrangler generate my-worker

 ⛅️ wrangler 3.94.0
-------------------

Using npm as package manager.
✨ Created my-worker\wrangler.toml

# 你想使用git来管理这个worker吗？(Y/n)
? Would you like to use git to manage this Worker? » (Y/n)
✨ Initialized git repository at my-worker

# 没有找到package.json文件，你想创建一个吗？(Y/n)
? No package.json found. Would you like to create one? » (Y/n)
✨ Created my-worker\package.json

# 你想使用TypeScript吗？(Y/n)
? Would you like to use TypeScript? » (Y/n)

# 你想让我们创建一个示例文件吗？(Y/n)
? Would you like to create a Worker at my-worker\src\index.ts? » - Use arrow-keys. Return to submit.
    None
>   Fetch handler
    Scheduled handler
✨ Created my-worker\src\index.js

# 你想让我们创建第一个测试文件吗？(Y/n)
? Would you like us to write your first test? » (Y/n)
# 你想使用哪个测试框架？(Choose one)
? Which test runner would you like to use? » - Use arrow-keys. Return to submit.
    Vitest
>   Jest
✨ Installed jest into devDependencies

To start developing your Worker, run `cd my-worker && npm start`
To start testing your Worker, run `npm test`
To publish your Worker to the Internet, run `npm run deploy`
```

:::

## Write your worker code

Open `src/index.js` and start writing your worker code.

```javascript
addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
  const url = new URL(request.url)
  const path = url.pathname

  if (path === '/') {
    return new Response('Hello, world!', {