---
title: 这是一个测试页
---
虽然这是一个测试页，但你也可以在这里学习Markdown语法。

以下是一些常用的Markdown语法：

## 标题测试 ✕

# H1
## H2
### H3
#### H4
##### H5
###### H6

@[code{10-15} md:no-line-numbers](./helloworld.md)

# Test 这是第二个H1标签
<!-- 即使是第二个H1标签也不会在Blog首页被渲染 -->

> [!warning]
> 第一个H1标签在Blog首页会被Frontmatter.title替换

## 普通格式文本 ✓

这是一个普通的文本，没有任何特殊的格式。

@[code{27} md:no-line-numbers](./helloworld.md)

## 特殊格式文本 ✓

**加粗** __加粗__  
*斜体* _斜体_  
~~删除线~~

@[code{33-35} md:no-line-numbers](./helloworld.md)

## 段落 ✓

第一段

第二段

第三段

@[code{41-45} md:no-line-numbers](./helloworld.md)

## 换行 ✓

这是一句话不过我要在这里  
换行且\
再次换行，还不够那就<br>再来一次换行

@[code{51-53} md:no-line-numbers](./helloworld.md)

> [!tip]
> 上方的代码中 `这里` 后面有两个空格

## 引用 ✓

> 引用也可以连用
>
> > 可以添加额外的大于号制造更深的引用

> 也可以单独使用

@[code{62-66} md:no-line-numbers](./helloworld.md)

## 无序列表 ✓

- 无序列表项
- 无序列表项

  - 列表中的列表项
    - 更多的列表项
    - 更多的列表项这里  
      也可以换行\
      那就再换一次<br>还有？
    - 更多的列表项
  - 列表中的长列表项，这个列表项很长。

    而且由很多个段落构成。

- 这是另一个无序列表项

@[code{72-85} md:no-line-numbers](./helloworld.md)

> [!tip]
> 上方的代码中 `这里` 后面有两个空格

## 有序列表 ✓

1. 有序列表第一项
2. 有序列表第二项这里  
   需要换行\
   再次换行<br>再换一次行
3. 有序列表第三项
   
只有中间被**文字段**或**其他内容段**截断，才会生成新的有序列表。

1. 另一个有序列表第一项
2. 另一个有序列表第二项
3. 另一个有序列表第三项

@[code{94-104} md:no-line-numbers](./helloworld.md)

> [!tip]
> 上方的代码中 `这里` 后面有两个空格

> [!warning]
> 以下写法同样可以被渲染成有序列表，但并不推荐，因为在阅读源文件时会产生歧义。
> 1. 有序列表第一项
> 1. 有序列表第二项
> 1. 有序列表第三项
> 
> ```md:no-line-numbers
> 1. 有序列表第一项
> 1. 有序列表第二项
> 1. 有序列表第三项
> ```

## 分割线 ✓

这下面是四条分割线

---
***
___
<hr>

这上面是四条条分割线

@[code{125-132} md:no-line-numbers](./helloworld.md)

> [!warning]
> 如果一段文字后紧跟着 `---` 类型的分割线，这会和上面的文字一起渲染成一个 `<h2标签>`
>
> 这行文字会被渲染成H2标签
> ---
>
> 这只是一行普通文字，不会被渲染成标签
>
> ---
>
> ```md:no-line-numbers
> 这行文字会被渲染成h2标签
> ---
>
> 这只是一行普通文字，不会被渲染成标签
>
> ---
> ```

> [!tip]
> 和上方注意的写法类似，如果一段文字后紧跟着 `===` ，这会和上方的文字一起渲染成一个 `<h1标签>`
> 
> 这行文字会被渲染成H1标签
> ===
>
> 这只是一行普通文字，不会被渲染成标签
>
> ===
>
> ```md:no-line-numbers
> 这行文字会被渲染成h1标签
> ===
>
> 这只是一行普通文字，不会被渲染成标签
>
> ===
> ```

## 链接 ✓

[相对路径链接](./README.md)

[绝对路径链接](/NyanCat.gif)

[外部链接](https://nekoblog.chairo.cc)

##### 这是一个测试用的锚点

[锚点链接](#你好像跳到这里了)

@[code{176-184} md:no-line-numbers](./helloworld.md)

## 图片 ✓

这是一张内部链接的图片:

![Here is a NyanCat](/NyanCat.gif)
___

这是一张外部链接的图片:

![This is one of my favorite artistic's work](https://img.picgo.net/2024/11/20/-014eab7f7b3e0df2e6.jpg)
___

这站图片会紧跟在这个文字后面
![Here is a NyanCat](/NyanCat.gif)
不会单独成行，而且不会显示图片标题
___

这张图片会单独成行

![This is one of my favorite artistic's work](https://img.picgo.net/2024/11/20/-014eab7f7b3e0df2e6.jpg "图片标题" =200x)

而且会显示图片标题，并且设置图片宽度为200px
___

设置图片高度为250px

![This is one of my favorite artistic's work](https://img.picgo.net/2024/11/20/-014eab7f7b3e0df2e6.jpg "Picture Title" =x250)
___

设置图片宽度为300px，高度为100px

![Here is a NyanCat](/NyanCat.gif =300x100)

@[code{190-219} md:no-line-numbers](./helloworld.md)

> [!tip]
> 为了显示清楚以上图片之间加了 `___` 分割线隔开

## emoji ✓

标准写法：
:wink: :cry: :laughing: :yum:

老式写法：
8-) :)  :( :-) :-( ;)

@[code{226-232} md:no-line-numbers](./helloworld.md)

## 表格 ✓

|     居中      |         右对齐 | 左对齐         |
| :-----------: | -------------: | :------------- |
| 居中使用 `:-:` | 右对齐使用 `-:` | 左对齐使用 `:-` |
|       b       |      aaaaaaaaa | aaaa           |
|       c       |           aaaa | a              |
|![](/NyanCat.gif)|表格里可以使用图片|                |

@[code{238-243} md:no-line-numbers](./helloworld.md)

##### 你好像跳到这里了
[转跳回去](#这是一个测试用的锚点)

@[code{} md:no-line-numbers](./helloworld.md)