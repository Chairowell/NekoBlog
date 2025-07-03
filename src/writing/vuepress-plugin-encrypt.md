---
title: vuepress-plugin-encrypt
date: 2024-10-21 11:35:00
categories: 
 - 项目
tags: 
 - Vuepress
 - Plugin
isOriginal: true
---
# vuepress-plugin-encrypt
一个 VuePress 插件，用于加密你在 VuePress 中的内容。

## 声明
> [!CAUTION]
> 请不要使用该加密功能用于任何敏感、机密的文章与档案，或是使用不当，造成的后果请你自负，本插件作者和贡献者对此不承担任何责任。插件仅供学习交流使用。

## 功能
- [x] 内容加密
- [x] 路由加密
- [x] 自定义密码组
- [x] 自定义记住状态时长
- [x] 自定义验证界面

## 工作模式
- 内容加密模式
  - 普通模式：不改变原始内容，加密渲染内容
  
    （该模式方便修改，但是如果是公开仓库部署，内容还是会暴露）
  - 严格模式：加密原始内容
    
    （该模式不方便修改，每次修改完需要重新加密，但即使是公开仓库，内容不会暴露）
- 路由加密模式（该模式如果是公开仓库部署，内容还是会暴露）

## 安装
pnpm
```bash
pnpm add vuepress-plugin-encrypt
```
npm
```bash
npm install vuepress-plugin-encrypt
```
yarn
```bash
yarn add vuepress-plugin-encrypt
```

<!-- ## 部署建议
- 建议部署到私有仓库，防止内容泄露
- 建议使用gh-pages分支将dist部署到GitHub Pages -->

## 工作原理
### 内容加密模式（普通）
Markdwon文档 -> markdown-it解析渲染成html -> 加密html -> cache缓存加密内容 -> 通过plugin解密html -> 在页面中添加解密后的html
### 内容加密模式（严格）
Markdwon文档 -> build -> 加密原始内容 -> plugin解密原始内容 -> markdown-it解析渲染成html
### 路由加密模式
访问页面 -> 拦截路由 -> 验证密码 -> 释放路由 -> 显示页面


## 使用
### 全局配置 `./vuepress/config.ts`
```ts
import { defineConfig } from 'vuepress'
import { encryptPlugin } from 'vuepress-plugin-encrypt'

export default defineConfig({
  plugins: [
    encryptPlugin({
      options...
    })
  ]
})
```

### 单页面配置 `Frontmatter`
```yaml
---
options:

---
```
### 局部配置 `<encrypt options>...</encrypt>`
```md
<encrypt options>

# Your content here
> Here is encrypted content.

</encrypt>


# Your content here
> Here is decrypted content.
```
#### 注意！Component 和 `<script>` 只会在解密后被加载

```md
<encrpt password="123456">

  // 这里的 component 只会在解密后会被加载
  <your vue component>

  // 这里的 <script> 只会在解密后被加载
  <script src="./your-script.ts" lang="ts"></script>

</encrpt>
```
### 自定义验证界面插槽
- `<encrypt-enter-password>`：密码输入框
- `<encrypt-verify-password>`：密码验证按钮
- `<encrypt-remember>`：记住密码单选框
- `<encrypt-info>`：信息提示

## Options
### password
- Type: `'string'` | `Array` | `Object`
- Required: `true`
- Details: 密码，用于解密内容和验证密码。
- 注意：密码全部会被转换成字符串，不能使用特殊字符

示例：

局部配置
```md 
<encrypt password="123456">

# Your content here
> Here is encrypted content.

</encrypt>

// 密码组
<encrypt password="123456,abcdef,xyz">

# Your content here
> Here is encrypted content.

</encrypt>
```

Frontmatter配置（ 注意缩进问题！）
```yaml
---
encrypt:
  password: 123456
---

// 密码组
---
encrypt:
  password: [123456,'abcdef','xyz']
---

// 或者这样配置密码组
---
encrypt:
  password: 
    - 123456
    - 'abcdef'
    - 'xyz'
---
```

全局配置

注意：
- 只有全局可以可以按路由配置密码组，相当于多个Frontmatter配置
- Frontmatter配置的优先级高于全局配置的优先级
  
  当你在单页面的Frontmatter配置了密码组，在访问该页面时，则只会使用单页面配置的密码组，不会使用全局配置的密码组

```ts
import { defineConfig } from 'vuepress'
import { encryptPlugin } from 'vuepress-plugin-encrypt'

export default defineConfig({
  plugins: [
    encryptPlugin({
      password: {
        // <path> 同 vue-router 的路由匹配规则，可以匹配多级目录
        '<path>': ['password1', 'password2'],

        // 对所有路由加密
        '/*': '123456',

        // 只会对 /home/index.html 路由加密, 不会对 /aaa/home/index.html 路由加密
        '/home/index.html': '123456', 

        //只会对 /about.html 路由加密，不会对 /aaa/about.html 路由加密
        '/about.html': ['123456', 'abcdef', 'xyz'],

        // 会对根目录 /aaa/ 下的所有路由加密，但不会对 /bbb/aaa/ 目录下的路由加密
        '/aaa/*': [123456, 'abcdef', 'xyz'],

        // 会对含有 /bbb/ 路径的路由加密，如：/bbb/index.html 或者 /aaa/bbb/ccc/about.html
        '*/bbb/*': 123456,
      }
    })
  ]
})
```
### caseSensitive
- Type: `boolean`
- Required: `false`
- Default: `true`
- Values: `true` | `false`
- Details: 是否区分大小写，默认区分。

示例：

局部配置
```md
// 不区分大小写
<encrypt password="123456" caseSensitive="true">

# Your content here
> Here is encrypted content.

</encrypt>
```

Frontmatter配置
```yaml
// 不区分大小写
---
encrypt:
  password: 123456
  caseSensitive: false
---
```

全局配置
```ts
import { defineConfig } from 'vuepress'
import { encryptPlugin } from 'vuepress-plugin-encrypt'

export default defineConfig({
  plugins: [
    encryptPlugin({
      password: '123456',
      caseSensitive: true // 不区分大小写
    })
  ]
})
```

### rememberTime
- Type: number
- Required: `false`
- Default: `-1`
- Values: `-1` | `0` | `+ ∞`
- Details: 在勾选记住密码时，设置记住密码的时长，单位为秒。`-1` 禁止记住密码（且不显示记住密码单选框），`0` 永久记住密码，`+ ∞` 为记住设定时长

示例：

局部配置
```md
// 记住密码时长为 24 小时
<encrypt password="123456" rememberTime="86400">

# Your content here
> Here is encrypted content.

</encrypt>
```

Frontmatter配置
```yaml
// 禁止记住密码
---
encrypt:
  password: 123456
  rememberTime: -1
---
```

全局配置
```ts
import { defineConfig } from 'vuepress'
import { encryptPlugin } from 'vuepress-plugin-encrypt'

export default defineConfig({
  plugins: [
    encryptPlugin({
      password: '123456',
      rememberTime: 0 // 永久记住密码
    })
  ]
})
```

### mode
- Type: `string`
- Required: `false`
- Default: `'normal'`
- Values: `'normal'` | `'strict'`
- Details: 工作模式，普通模式加密渲染内容，严格模式加密原始内容

示例：
```md
// 普通模式
<encrypt mode="normal" password="123">

# Your content here
> Here is encrypted content.
![image](./image.png)

</encrypt>


// 严格模式
<encrypt mode="strict" password="123456">

# Your content here
> Here is encrypted content.
<p>Here is plaintext content.</p>

</encrypt>


# Your content here
> Here is decrypted content.  
```

### API
你可以通过encrypt.state来获取当前插件的状态，包括：
- `isEncrypted`：当前页面是否加密：`true` 加密，`false` 未加密
- `isDecrypted`：当前页面是否解密：`true` 解密，`false` 未解密
- `remember`：当前页面是否记住密码：`有效数值` 记住密码，`-1` 禁止记住密码，`0` 永久记住密码
- `verify`：当前页面的密码验证是否通过：`true` 通过，`false` 未通过
- `mode`：当前页面的工作模式：`normal` 普通模式，`strict` 严格模式