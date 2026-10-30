# HTML 标签与属性速查表

本章用于查阅，不要求按顺序背诵。先按用途找到标签，再查看它的专有属性。**下文的“无”表示没有专有 HTML 属性，仍可使用适用的全局属性。** 属性和标签以 [HTML Living Standard 元素索引](https://html.spec.whatwg.org/multipage/indices.html#elements-3)为主要依据；浏览器支持情况和细节以 [MDN 元素参考](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements)为辅。

## 速查说明

- `布尔属性`：写出属性就表示开启，例如 `disabled`；不要用 `disabled="false"` 表示关闭，关闭应删除属性。
- `URL`：可写相对或绝对地址；`整数`、`小数`、`日期时间`应按相应格式填写。“任意文本”表示没有固定枚举值。
- `aria-*`、`data-*` 是一组属性，不能直接写成 `aria-*="..."`；应写具体名称，例如 `aria-label="关闭"`、`data-id="12"`。
- 有些属性仅在指定的 `type`、父子关系或加载方式下生效；表内会标明。事件处理属性（如 `onclick`）虽然存在，但教学项目优先使用 JavaScript 的事件监听方式。
- 本表列出**现代 HTML 标准元素**及常用、标准的专有属性。CSS 样式属性、JavaScript DOM 属性、SVG/MathML 元素不属于 HTML 标签属性表。

## 一、项目中常用的全局属性

这些属性可写在所有 HTML 标签上，但并非处处都有实际效果。这里只保留本课程项目常用的项目；完整清单见 [标准全局属性列表](https://html.spec.whatwg.org/multipage/dom.html#global-attributes)和 [MDN 全局属性参考](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Global_attributes)。

| 属性 | 作用 | 可选值或格式 |
| --- | --- | --- |
| `id` | 文档内唯一标识，用于锚点、标签关联、脚本定位 | 不含空格的非空字符串；同一页面应唯一 |
| `class` | 给元素分组，供 CSS、脚本使用 | 空格分隔的类名列表 |
| `style` | 写行内 CSS | CSS 声明列表，如 `color: red;` |
| `title` | 补充说明，可能显示为悬停提示 | 任意文本；不能代替表单标签或图片替代文本 |
| `lang` | 标记内容语言 | BCP 47 语言标签，如 `zh-CN`、`en`、`ja` |
| `hidden` | 隐藏不应显示的内容 | 布尔形式或 `until-found`；后者允许页内查找发现内容 |
| `tabindex` | 控制键盘焦点顺序 | 整数；常用 `0`（可按自然顺序聚焦）、`-1`（可由脚本聚焦） |
| `data-*` | 存放页面自定义数据 | 例如 `data-user-id="42"`；值为文本 |
| `aria-*` | 补充无障碍名称、状态、关系 | 取值由具体属性决定，如 `aria-label="菜单"`、`aria-expanded="false"` |
| `autofocus` | 页面加载或对话框打开时请求聚焦 | 布尔属性；同一作用域通常只给一个目标 |

`on...` 事件处理属性（如 `onclick`、`oninput`、`onchange`）也可出现在 HTML 中，但值是 JavaScript 代码。为了让结构和行为分开，本课程不把它们作为推荐写法。

## 二、文档根节点与元数据

### `<html>`

**用途：**文档根元素

- 无专有属性；常用全局 `lang="zh-CN"`

### `<head>`

**用途：**放标题、编码、样式、脚本等元数据

- 无专有属性

### `<body>`

**用途：**页面可见内容的根容器

- 无专有属性；另有页面级 `on...` 事件处理属性，不建议内联使用

### `<title>`

**用途：**浏览器标签标题

- 无专有属性；文本写在标签内容中

### `<base>`

**用途：**设置相对 URL 的基准

- `href`：基准 URL
- `target`：默认打开位置，常见 `_self`、`_blank`、`_parent`、`_top` 或窗口名；文档中最多一个有效基准 URL

### `<meta>`

**用途：**声明编码、视口等元数据

- `charset`：字符编码，现代页面写 `UTF-8`
- `name`：元数据名，如 `viewport`、`description`
- `content`：对应内容，格式由 `name` 或 `http-equiv` 决定
- `http-equiv`：指令名，如 `content-type`、`refresh`、`content-security-policy`
- `media`：适用媒体查询，如 `screen`、`(max-width: 600px)`

### `<link>`

**用途：**关联外部资源

- `href`：资源 URL
- `rel`：关系，如 `stylesheet`、`icon`、`preload`、`modulepreload`
- `as`：预加载资源类别，如 `style`、`script`、`font`、`image`
- `type`：MIME 类型
- `media`：媒体查询
- `hreflang`：关联资源的语言标签
- `sizes`：图标尺寸，如 `32x32`、`any`
- `imagesrcset`：预加载响应式图片的候选 URL 列表，写法同 `srcset`
- `imagesizes`：预加载响应式图片的显示尺寸列表，写法同 `sizes`
- `crossorigin`：`anonymous`、`use-credentials`
- `integrity`：资源哈希
- `referrerpolicy`：引用来源策略
- `fetchpriority`：`high`、`low`、`auto`
- `blocking`：`render`
- `color`：图标的建议颜色
- `disabled`：布尔值，主要用于样式表

### `<style>`

**用途：**在文档内写 CSS

- `media`：媒体查询
- `blocking`：`render`，控制渲染阻塞


## 三、页面分区与标题

### `<header>`

**用途：**页面或区域的页眉

- 无专有属性

### `<nav>`

**用途：**导航区域

- 无专有属性

### `<main>`

**用途：**页面主体内容

- 无专有属性；通常每页只放一个当前可见主体

### `<section>`

**用途：**有主题的一节

- 无专有属性；通常配合标题

### `<article>`

**用途：**可独立分发的内容

- 无专有属性

### `<aside>`

**用途：**与主体间接相关的侧栏内容

- 无专有属性

### `<footer>`

**用途：**页面或区域页脚

- 无专有属性

### `<search>`

**用途：**搜索或过滤控件的语义区域

- 无专有属性

### `<address>`

**用途：**页面或文章的联系信息

- 无专有属性

### `<h1>`

**用途：**一级标题

- 无专有属性

### `<h2>`

**用途：**二级标题

- 无专有属性

### `<h3>`

**用途：**三级标题

- 无专有属性

### `<h4>`

**用途：**四级标题

- 无专有属性

### `<h5>`

**用途：**五级标题

- 无专有属性

### `<h6>`

**用途：**六级标题

- 无专有属性

### `<hgroup>`

**用途：**将标题与副标题归组

- 无专有属性


## 四、块级文本、列表与内容分组

### `<p>`

**用途：**段落

- 无专有属性

### `<div>`

**用途：**无额外语义的通用容器

- 无专有属性

### `<hr>`

**用途：**主题转换线

- 无专有属性；外观交给 CSS

### `<pre>`

**用途：**保留空白和换行的预格式文本

- 无专有属性

### `<blockquote>`

**用途：**块级引用

- `cite`：引用来源 URL

### `<ol>`

**用途：**有序列表

- `start`：起始编号，整数
- `reversed`：倒序，布尔属性
- `type`：编号样式 `1`、`a`、`A`、`i`、`I`

### `<ul>`

**用途：**无序列表

- 无专有属性；项目符号用 CSS 调整

### `<menu>`

**用途：**命令或项目列表

- 无专有属性；实际常作为列表使用

### `<li>`

**用途：**列表项

- `value`：在 `<ol>` 内指定该项编号，整数

### `<dl>`

**用途：**名称与描述组成的列表

- 无专有属性

### `<dt>`

**用途：**描述列表中的名称

- 无专有属性

### `<dd>`

**用途：**描述列表中的说明

- 无专有属性

### `<figure>`

**用途：**可独立引用的图片、代码等内容

- 无专有属性

### `<figcaption>`

**用途：**`<figure>` 的说明文字

- 无专有属性


## 五、行内文本与语义

### `<a>`

**用途：**链接或页面锚点

- `href`：目标 URL/片段
- `target`：`_self`、`_blank`、`_parent`、`_top` 或窗口名
- `download`：布尔形式或建议文件名
- `rel`：关系词，如 `noopener`、`noreferrer`、`external`
- `hreflang`：目标语言标签
- `type`：目标 MIME 类型
- `ping`：空格分隔的通知 URL
- `referrerpolicy`：如 `no-referrer`、`origin`、`strict-origin-when-cross-origin`

### `<span>`

**用途：**无额外语义的行内容器

- 无专有属性

### `<br>`

**用途：**换行

- 无专有属性；不要用多个 `<br>` 充当段落间距

### `<wbr>`

**用途：**可换行位置

- 无专有属性

### `<em>`

**用途：**强调语气

- 无专有属性

### `<strong>`

**用途：**重要、紧急或严重内容

- 无专有属性

### `<b>`

**用途：**吸引注意但不表示重要性

- 无专有属性

### `<i>`

**用途：**术语、不同语气等

- 无专有属性

### `<u>`

**用途：**非文本本身的标注

- 无专有属性

### `<s>`

**用途：**不再准确或相关的内容

- 无专有属性

### `<small>`

**用途：**附注、版权等旁注

- 无专有属性

### `<mark>`

**用途：**标记与上下文相关的内容

- 无专有属性

### `<sub>`

**用途：**下标

- 无专有属性

### `<sup>`

**用途：**上标

- 无专有属性

### `<code>`

**用途：**代码片段

- 无专有属性

### `<kbd>`

**用途：**用户输入

- 无专有属性

### `<samp>`

**用途：**程序输出

- 无专有属性

### `<var>`

**用途：**变量名

- 无专有属性

### `<abbr>`

**用途：**缩写

- 无专有属性；全局 `title` 可补全称

### `<dfn>`

**用途：**正在定义的术语

- 无专有属性

### `<cite>`

**用途：**作品标题

- 无专有属性；不要把它当成普通人名标签

### `<q>`

**用途：**行内引用

- `cite`：引用来源 URL

### `<data>`

**用途：**将可见文本与机器可读值关联

- `value`：机器可读值，任意文本

### `<time>`

**用途：**时间或日期

- `datetime`：机器可读日期、时间或时长，如 `2026-10-30`、`14:30`、`PT2H`

### `<bdi>`

**用途：**隔离未知方向文本

- 无专有属性

### `<bdo>`

**用途：**强制指定文字方向

- 无专有属性；需配合全局 `dir="ltr"` 或 `dir="rtl"`

### `<ruby>`

**用途：**东亚文字注音容器

- 无专有属性

### `<rt>`

**用途：**注音文字

- 无专有属性

### `<rp>`

**用途：**不支持注音时的括号回退

- 无专有属性

### `<del>`

**用途：**标记删除内容

- `cite`：变更说明 URL
- `datetime`：符合 HTML 日期时间格式的变更时间

### `<ins>`

**用途：**标记插入内容

- `cite`：变更说明 URL
- `datetime`：符合 HTML 日期时间格式的变更时间


## 六、图片、媒体与嵌入内容

### `<img>`

**用途：**显示图片

- `src`：图片 URL
- `alt`：替代文本，装饰图可用空字符串
- `width`：固有尺寸，非负整数
- `height`：固有尺寸，非负整数
- `srcset`：图片候选列表
- `sizes`：响应式显示尺寸
- `loading`：`eager`、`lazy`
- `decoding`：`sync`、`async`、`auto`
- `fetchpriority`：`high`、`low`、`auto`
- `crossorigin`：`anonymous`、`use-credentials`
- `referrerpolicy`：引用来源策略
- `usemap`：图片映射的 `#名称`
- `ismap`：布尔属性，用于链接中的服务端图片映射
- `controls`：布尔属性，允许浏览器显示图片操作界面，需提供非空 `alt`，具体界面由浏览器决定

### `<picture>`

**用途：**响应式图片候选容器

- 无专有属性；内部通常放 `<source>` 和最后的 `<img>`

### `<source>`

**用途：**给 `<picture>`、`<audio>`、`<video>` 提供候选资源

- `src`：音视频 URL
- `srcset`：图片候选和尺寸
- `sizes`：图片候选和尺寸
- `type`：MIME 类型
- `media`：媒体查询
- `width`：图片源固有尺寸，非负整数
- `height`：图片源固有尺寸，非负整数

### `<map>`

**用途：**定义图片热点区域

- `name`：映射名称，供 `<img usemap="#名称">` 引用

### `<area>`

**用途：**图片映射中的可点击区域

- `shape`：`rect`、`circle`、`poly`、`default`
- `coords`：按形状填写逗号分隔坐标
- `alt`：替代文本
- `href`：目标 URL
- `target`：目标打开位置，`_self`、`_blank`、`_parent`、`_top` 或窗口名
- `download`：下载提示，布尔形式或建议文件名
- `rel`：与目标的关系词，如 `noopener`、`noreferrer`
- `ping`：空格分隔的通知 URL
- `referrerpolicy`：引用来源策略，如 `no-referrer`、`origin`

### `<audio>`

**用途：**音频播放器

- `src`：音频 URL
- `controls`：布尔属性
- `autoplay`：布尔属性
- `loop`：布尔属性
- `muted`：布尔属性
- `preload`：`none`、`metadata`、`auto`
- `crossorigin`：`anonymous`、`use-credentials`
- `loading`：`eager`、`lazy`

### `<video>`

**用途：**视频播放器

- `src`：视频 URL
- `poster`：封面图 URL
- `width`：尺寸，非负整数
- `height`：尺寸，非负整数
- `controls`：布尔属性
- `autoplay`：布尔属性
- `loop`：布尔属性
- `muted`：布尔属性
- `playsinline`：布尔属性
- `preload`：`none`、`metadata`、`auto`
- `crossorigin`：跨源模式
- `loading`：`eager`、`lazy`

### `<track>`

**用途：**音视频字幕或文字轨

- `src`：轨道文件 URL
- `kind`：`subtitles`、`captions`、`descriptions`、`chapters`、`metadata`
- `srclang`：语言标签
- `label`：显示名称
- `default`：默认启用，布尔属性

### `<iframe>`

**用途：**嵌入另一个网页

- `src`：页面 URL
- `srcdoc`：直接写嵌入文档 HTML
- `name`：浏览上下文名
- `width`：尺寸，非负整数
- `height`：尺寸，非负整数
- `loading`：`eager`、`lazy`
- `sandbox`：空值表示启用全部限制，或空格分隔的放行令牌，如 `allow-scripts`、`allow-forms`
- `allow`：功能权限策略
- `allowfullscreen`：允许全屏，布尔属性
- `referrerpolicy`：引用来源策略

### `<embed>`

**用途：**嵌入外部内容

- `src`：资源 URL
- `type`：MIME 类型
- `width`：尺寸，非负整数；优先考虑更明确的 `<img>`、`<video>`、`<iframe>`
- `height`：尺寸，非负整数；优先考虑更明确的 `<img>`、`<video>`、`<iframe>`

### `<object>`

**用途：**嵌入外部资源

- `data`：资源 URL
- `type`：MIME 类型
- `name`：名称
- `width`：尺寸，非负整数
- `height`：尺寸，非负整数
- `form`：关联表单的 `id`

### `<canvas>`

**用途：**脚本绘图画布

- `width`：画布像素尺寸，非负整数；内容区写回退说明
- `height`：画布像素尺寸，非负整数；内容区写回退说明


`autoplay` 是否真的自动播放受浏览器策略限制；通常静音媒体更容易获准。`preload` 是提示，不保证浏览器一定预加载。

## 七、表格

### `<table>`

**用途：**表格整体

- 无专有属性

### `<caption>`

**用途：**表格标题

- 无专有属性

### `<colgroup>`

**用途：**定义一组列

- `span`：覆盖列数，正整数；有 `<col>` 子元素时不使用 `span`

### `<col>`

**用途：**定义列的属性范围

- `span`：覆盖列数，正整数

### `<thead>`

**用途：**表头行组

- 无专有属性

### `<tbody>`

**用途：**主体行组

- 无专有属性

### `<tfoot>`

**用途：**表尾行组

- 无专有属性

### `<tr>`

**用途：**表格行

- 无专有属性

### `<th>`

**用途：**表头单元格

- `colspan`：跨列数，正整数
- `rowspan`：跨行数，`0` 表示到当前行组末尾
- `scope`：`row`、`col`、`rowgroup`、`colgroup`、`auto`
- `headers`：关联表头的空格分隔 `id`
- `abbr`：表头简写

### `<td>`

**用途：**数据单元格

- `colspan`：跨列数，正整数
- `rowspan`：跨行数，`0` 表示到当前行组末尾
- `headers`：关联表头的空格分隔 `id`


## 八、表单与输入控件

### `<form>`

**用途：**收集并提交控件数据

- `action`：提交 URL
- `method`：`get`、`post`、`dialog`
- `enctype`：`application/x-www-form-urlencoded`、`multipart/form-data`、`text/plain`，上传文件通常用第二种
- `target`：提交结果位置
- `name`：表单名称
- `autocomplete`：`on`、`off`
- `novalidate`：跳过原生验证，布尔属性
- `accept-charset`：`UTF-8`
- `rel`：表单与目标的链接关系

### `<label>`

**用途：**控件的可见标签

- `for`：目标控件的 `id`；也可将控件直接放在 `<label>` 内

### `<input>`

**用途：**单行输入或特殊控件

- `type`：见下表
- `name`：提交字段名
- `value`：初始值
- `placeholder`：输入提示
- `required`：布尔属性，适用类型见下表
- `disabled`：布尔属性，适用类型见下表
- `readonly`：布尔属性，适用类型见下表
- `multiple`：布尔属性，适用类型见下表
- `checked`：布尔属性，适用类型见下表
- `minlength`：字符长度整数
- `maxlength`：字符长度整数
- `min`：允许的最小数值或日期
- `max`：允许的最大数值或日期
- `step`：允许的数值或日期增量，数字或 `any`
- `pattern`：正则表达式
- `size`：显示字符宽度，正整数
- `list`：`<datalist>` 的 `id`
- `accept`：文件类型列表
- `alpha`：颜色输入是否支持透明度，布尔属性
- `colorspace`：颜色输入色彩空间 `limited-srgb`、`display-p3`
- `alt`：`type="image"` 的替代文字，任意文本
- `src`：`type="image"` 的图片 URL
- `width`：`type="image"` 的宽度，非负整数
- `height`：`type="image"` 的高度，非负整数
- `autocomplete`：自动填充令牌
- `dirname`：提交文字方向的字段名
- `form`：所属表单 `id`
- `formaction`：提交到的 URL，覆盖表单的 `action`
- `formmethod`：`get`、`post`、`dialog`，覆盖表单的 `method`
- `formenctype`：`application/x-www-form-urlencoded`、`multipart/form-data`、`text/plain`，覆盖表单的编码方式
- `formtarget`：`_self`、`_blank`、`_parent`、`_top` 或窗口名
- `formnovalidate`：跳过表单原生验证，布尔属性
- `popovertarget`：弹出层元素的 `id`
- `popovertargetaction`：`show`、`hide`、`toggle`

### `<button>`

**用途：**可点击按钮

- `type`：`submit`、`reset`、`button`
- `disabled`：布尔属性
- `name`：提交时的字段名，任意非空文本
- `value`：提交时的字段值，任意文本
- `form`：所属表单 `id`
- `formaction`：提交 URL，覆盖表单的 `action`
- `formmethod`：`get`、`post`、`dialog`
- `formenctype`：`application/x-www-form-urlencoded`、`multipart/form-data`、`text/plain`
- `formtarget`：`_self`、`_blank`、`_parent`、`_top` 或窗口名
- `formnovalidate`：跳过原生验证，布尔属性
- `popovertarget`：弹出层 `id`
- `popovertargetaction`：`show`、`hide`、`toggle`
- `command`：如 `show-modal`、`close`、`request-close`、`show-popover`、`hide-popover`、`toggle-popover` 或自定义 `--名称`
- `commandfor`：目标元素 `id`

### `<select>`

**用途：**下拉或列表选择

- `name`：提交字段名
- `multiple`：布尔属性
- `required`：布尔属性
- `disabled`：布尔属性
- `size`：可见选项数量，正整数
- `autocomplete`：自动填充令牌
- `form`：所属表单 `id`

### `<option>`

**用途：**选择项

- `value`：提交值，省略时取文本
- `label`：显示标签
- `selected`：布尔属性
- `disabled`：布尔属性

### `<optgroup>`

**用途：**选项分组

- `label`：分组名称
- `disabled`：整组禁用，布尔属性

### `<datalist>`

**用途：**输入建议列表

- 无专有属性；通过 `<input list="其 id">` 关联

### `<selectedcontent>`

**用途：**自定义选择器中显示当前选项内容

- 无专有属性；需放在允许的 `<select>` 结构内，兼容性应按目标浏览器确认

### `<textarea>`

**用途：**多行文本输入

- `name`：提交字段名
- `rows`：可见行列数，正整数
- `cols`：可见行列数，正整数
- `minlength`：字符数整数
- `maxlength`：字符数整数
- `placeholder`：提示
- `required`：布尔属性
- `disabled`：布尔属性
- `readonly`：布尔属性
- `wrap`：`soft`、`hard`
- `autocomplete`：自动填充令牌
- `dirname`：文字方向字段名
- `form`：所属表单 `id`；初始文本写在标签内容中，不写 `value` 属性

### `<fieldset>`

**用途：**将相关控件分组

- `disabled`：禁用组内控件，布尔属性
- `name`：分组名
- `form`：所属表单 `id`

### `<legend>`

**用途：**`<fieldset>` 的标题

- 无专有属性

### `<output>`

**用途：**显示计算或操作结果

- `name`：提交名称
- `for`：关联控件 `id` 列表
- `form`：所属表单 `id`

### `<progress>`

**用途：**任务完成进度

- `value`：当前值，0 到 `max`
- `max`：最大值，正数；省略 `value` 表示进度未知

### `<meter>`

**用途：**已知范围内的测量值

- `value`：当前数值
- `min`：上下界
- `max`：上下界
- `low`：低/高区间界限
- `high`：低/高区间界限
- `optimum`：最佳值；这些值均为数字且应满足区间关系


### `<input type>` 速查

| 类型 | 用途 | 主要适用属性与取值提示 |
| --- | --- | --- |
| `text`、`search`、`url`、`tel`、`email`、`password` | 单行文字 | `required`、`minlength`、`maxlength`、`pattern`、`placeholder`；`email` 可配合 `multiple`；`tel` 不自动校验电话号码格式 |
| `number`、`range` | 数字输入、滑块 | `min`、`max`、`step`；`range` 的值限制在范围内，`number` 可直接输入 |
| `date`、`month`、`week`、`time`、`datetime-local` | 日期和时间 | `min`、`max`、`step`；例如 `date` 的值为 `YYYY-MM-DD`，`datetime-local` 为本地日期时间 |
| `color` | 选颜色 | `value` 为颜色值，如 `#ff0000`；支持情况与颜色格式依浏览器而定 |
| `checkbox`、`radio` | 多选、单选 | `checked`：默认选中；同组单选按钮使用相同 `name`；提交值来自 `value` |
| `file` | 上传文件 | `accept`：MIME 类型、扩展名等逗号列表；`multiple`：允许多文件；`capture`：如 `user`、`environment`，仅提示采集设备 |
| `hidden` | 提交不可见值 | `name`、`value`；不应用于保存秘密数据 |
| `submit`、`reset`、`button` | 提交、重置、普通按钮 | `value`：按钮文字；提交按钮可用 `formaction` 等覆盖表单配置 |
| `image` | 图片提交按钮 | `src`：图片 URL；`alt`：替代文本；`width`、`height`：尺寸；支持提交覆盖属性 |

`required`、`readonly`、`checked` 等并非对所有 `type` 都生效。例如 `checked` 只适合复选框和单选框；`readonly` 适合可编辑文本类输入，不能代替 `disabled`。完整适用矩阵见 [HTML 标准的 input 属性表](https://html.spec.whatwg.org/multipage/input.html#input-type-attr-summary)。

## 九、交互、脚本与 Web Components

### `<details>`

**用途：**可展开的详情容器

- `open`：默认展开，布尔属性
- `name`：同名详情组中通常只允许一个展开

### `<summary>`

**用途：**`<details>` 的可点击摘要

- 无专有属性

### `<dialog>`

**用途：**对话框

- `open`：显示状态，布尔属性；模态对话框通常由脚本调用 `showModal()` 打开
- `closedby`：`none`、`closerequest`、`any`，指定允许哪些用户操作关闭对话框

### `<script>`

**用途：**内联或外部脚本

- `src`：脚本 URL
- `type`：经典脚本可省略，模块用 `module`，数据块可用非 JS MIME 类型
- `async`：布尔属性，控制加载/执行
- `defer`：布尔属性，控制加载/执行
- `nomodule`：布尔属性，控制加载/执行
- `crossorigin`：跨源模式
- `integrity`：资源哈希
- `referrerpolicy`：引用来源策略
- `fetchpriority`：`high`、`low`、`auto`
- `blocking`：`render`

### `<noscript>`

**用途：**脚本不可用时的回退内容

- 无专有属性

### `<template>`

**用途：**暂不渲染的 HTML 模板

- `for`：目标元素 `id`，用于相关模板功能
- `shadowrootmode`：`open`、`closed`
- `shadowrootslotassignment`：`named`、`manual`
- `shadowrootdelegatesfocus`：声明式 Shadow DOM 的布尔选项；需与宿主元素配合
- `shadowrootclonable`：声明式 Shadow DOM 的布尔选项；需与宿主元素配合
- `shadowrootserializable`：声明式 Shadow DOM 的布尔选项；需与宿主元素配合
- `shadowrootcustomelementregistry`：声明式 Shadow DOM 的布尔选项；需与宿主元素配合

### `<slot>`

**用途：**Web Component 插槽

- `name`：插槽名称；空值表示默认插槽


## 十、容易混淆的规则

| 情况 | 正确理解 |
| --- | --- |
| 标签有全局属性但表中写“无” | 表示没有该标签专有属性；`id`、`class` 等仍可使用 |
| `disabled` 与 `readonly` | `disabled` 通常不参与提交且不能聚焦；`readonly` 的可编辑文本通常仍参与提交 |
| `placeholder` 与 `<label>` | 占位文字不能替代可见标签 |
| `alt` 与 `title` | `alt` 是图片不可用时的替代内容；`title` 是补充提示，不能代替 `alt` |
| `width`、`height` 与 CSS | HTML 属性给资源固有尺寸或画布尺寸；复杂布局用 CSS |
| `target="_blank"` | 打开新浏览上下文；需要考虑新窗口提示和链接安全，常配合 `rel="noopener"` |
| 布尔属性的值 | `required="false"` 仍表示启用；要关闭就移除 `required` |
| 非标准或过时属性 | 能在浏览器显示不代表应继续使用；外观样式优先用 CSS |

## 十一、旧代码中常见的过时标签

下面这些标签**不建议用于新页面**。遇到旧教材或旧系统时知道它们的用途即可；属性取值不再作为新代码速查范围。完整清单见 [MDN 过时元素](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements#obsolete_and_deprecated_elements)。

| 旧标签 | 旧用途 | 现在的做法 |
| --- | --- | --- |
| `<center>`、`<font>`、`<big>`、`<strike>`、`<tt>` | 居中、字体、大小、删除线、等宽字体 | 用有语义的元素和 CSS |
| `<marquee>`、`<blink>` | 滚动或闪烁文字 | 避免干扰阅读；必要时用 CSS 动画并考虑减少动态效果 |
| `<frame>`、`<frameset>`、`<noframes>` | 旧式分帧页面 | 用现代布局；确需嵌入外页时用 `<iframe>` |
| `<acronym>`、`<dir>`、`<menuitem>` | 缩写、目录、菜单项 | 用 `<abbr>`、`<ul>` / `<menu>`、`<li>` |
| `<applet>`、`<bgsound>`、`<keygen>`、`<param>` | 旧插件、背景音、密钥控件、插件参数 | 用现代 Web API、`<audio>` 或适合的表单控件 |

## 来源与更新

本页按 2026 年 10 月的 [HTML Living Standard 索引](https://html.spec.whatwg.org/multipage/indices.html)整理。HTML 标准会持续更新；浏览器对新属性的支持可能不同。拿不准某个属性时，点开 [MDN HTML 属性索引](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Attributes)核对适用元素和兼容性。
