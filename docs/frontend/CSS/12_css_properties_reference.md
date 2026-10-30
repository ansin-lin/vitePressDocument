# CSS 属性速查表

本章按课程和综合练习会用到的写法整理。先看[值与单位](#一-先看懂-css-值)，再按用途查找属性。每项给出作用、常用值、初始值与最小示例；这里的“常用值”不是完整语法。需要查所有允许值和浏览器兼容性时，请打开 [MDN CSS 属性索引](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties)。

## 本章目录

- [一、先看懂 CSS 值](#一-先看懂-css-值)
- [二、文字与字体](#二-文字与字体)
- [三、颜色、背景与装饰](#三-颜色-背景与装饰)
- [四、尺寸、盒模型与边框](#四-尺寸-盒模型与边框)
- [五、显示、定位与溢出](#五-显示-定位与溢出)
- [六、Flex 布局](#六-flex-布局)
- [七、Grid 布局](#七-grid-布局)
- [八、交互、过渡与动画](#八-交互-过渡与动画)
- [九、选择器、变量与媒体查询](#九-选择器-变量与媒体查询)
- [十、易混淆对照](#十-易混淆对照)

> **初始值与浏览器默认样式**：初始值是 CSS 规范给属性定义的值，不等于每个 HTML 标签在页面上看到的默认外观。例如 `display` 的初始值是 `inline`，但浏览器默认样式会把 `<div>` 显示为块级元素。简写属性可能同时设置多个子属性，下文写“各子属性的初始值”时，应继续查看对应子属性。

## 一、先看懂 CSS 值

| 写法 | 代表什么 | 例子 |
| --- | --- | --- |
| `px` | CSS 像素 | `padding: 16px` |
| `rem` | 相对于根元素的字号 | `font-size: 1.25rem` |
| `em` | 通常相对于当前元素字号；用于 `font-size` 时相对于父元素字号 | `padding: 1em` |
| `%` | 相对比例，参照物由具体属性决定 | `width: 80%` |
| `vw`、`vh` | 视口宽、高的百分之一 | `width: 100vw` |
| `fr` | Grid 容器中可分配空间的份额 | `grid-template-columns: 1fr 2fr` |
| `#十六进制`、`rgb()` | 颜色值 | `color: #1d4ed8` |
| `auto` | 由布局规则自动计算；含义依属性而异 | `margin-inline: auto` |
| `var()` | 读取自定义属性 | `color: var(--main-color)` |
| `calc()`、`min()`、`max()`、`clamp()` | 组合或限制计算值 | `width: min(100%, 960px)` |

长度值通常需要单位，零值可以直接写 `0`。百分比的参照物并不总是父元素的同一尺寸；遇到意外结果应查看该属性说明。所有属性还接受 `inherit`、`initial`、`unset`、`revert` 等 CSS 通用关键字，但日常布局通常不必主动写它们。[CSS 值与单位说明](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Values_and_units)。

简写属性的值经常按顺时针读取：`margin: 上 右 下 左`；两个值表示“上下、左右”；三个值表示“上、左右、下”。`padding`、`border-width` 等四边简写同理。

## 二、文字与字体

### `color`

- **作用**：设置文字及部分装饰的颜色。
- **常用值**：颜色名、`#RRGGBB`、`rgb()`、`currentColor`。
- **初始值**：由浏览器默认文本色决定；可从父元素继承。
- **示例**：`color: #1f2937;`

### `font-family`

- **作用**：指定字体及后备字体。
- **常用值**：字体名称列表，末尾可用 `sans-serif`、`serif`、`monospace`。
- **初始值**：依浏览器和系统而定；可继承。
- **示例**：`font-family: Arial, "Noto Sans", sans-serif;`

### `font-size`

- **作用**：设置字号。
- **常用值**：`16px`、`1rem`、`1.2em`、`larger`、`smaller`。
- **初始值**：`medium`，由浏览器解释为默认字号；可继承。
- **示例**：`font-size: 1rem;`

### `font-weight`

- **作用**：设置字重。
- **常用值**：`normal`、`bold`、`100`～`900`。
- **初始值**：`normal`；可继承。
- **示例**：`font-weight: 600;`

### `font-style`

- **作用**：设置常规或斜体字形。
- **常用值**：`normal`、`italic`、`oblique`。
- **初始值**：`normal`；可继承。
- **示例**：`font-style: italic;`

### `font`

- **作用**：一次设置字形、字重、字号、行高和字体族。
- **常用值**：至少提供 `font-size` 与 `font-family`，例如 `600 16px/1.5 Arial`。
- **初始值**：未写出的字体子属性会重置为各自初始值。
- **示例**：`font: 600 16px/1.5 Arial, sans-serif;`

### `line-height`

- **作用**：设置一行文字占用的高度。
- **常用值**：`normal`、无单位数字（如 `1.5`）、长度或百分比。
- **初始值**：`normal`；可继承。
- **示例**：`line-height: 1.6;`

### `text-align`

- **作用**：设置行内内容的水平对齐。
- **常用值**：`start`、`end`、`left`、`right`、`center`、`justify`。
- **初始值**：`start`；可继承。
- **示例**：`text-align: center;`

### `text-indent`

- **作用**：设置块内第一行的缩进。
- **常用值**：长度、百分比；可用负值。
- **初始值**：`0`；可继承。
- **示例**：`text-indent: 2em;`

### `text-decoration`

- **作用**：设置下划线、删除线等文字装饰。
- **常用值**：`none`、`underline`、`line-through`，可再组合颜色与线型。
- **初始值**：由各 `text-decoration-*` 子属性决定；线型初始为 `none`。
- **示例**：`text-decoration: underline;`

### `white-space`

- **作用**：决定空格、换行与自动折行如何处理。
- **常用值**：`normal`、`nowrap`、`pre`、`pre-wrap`、`pre-line`。
- **初始值**：`normal`。
- **示例**：`white-space: nowrap;`

### `text-overflow`

- **作用**：决定被裁切的行内文本如何提示。
- **常用值**：`clip`、`ellipsis`。
- **初始值**：`clip`。
- **示例**：`text-overflow: ellipsis;`；通常还需 `overflow: hidden; white-space: nowrap;`。

### `word-break`

- **作用**：控制单词或字符的断行方式。
- **常用值**：`normal`、`break-all`、`keep-all`。
- **初始值**：`normal`。
- **示例**：`word-break: break-all;`；只在确实需要打断长串文字时使用。

### `vertical-align`

- **作用**：对齐行内级元素或表格单元格内的内容。
- **常用值**：`baseline`、`middle`、`top`、`bottom`、长度或百分比。
- **初始值**：`baseline`。
- **示例**：`vertical-align: middle;`；不能用于普通块元素的垂直居中。

### `list-style`

- **作用**：设置列表项目符号的样式、位置或图片。
- **常用值**：`none`、`disc`、`decimal`、`inside`、`outside`。
- **初始值**：由各 `list-style-*` 子属性决定；浏览器也会给列表设置默认样式。
- **示例**：`list-style: none;`

## 三、颜色、背景与装饰

### `background-color`

- **作用**：设置元素背景色。
- **常用值**：颜色名、十六进制颜色、`rgb()`、`transparent`。
- **初始值**：`transparent`。
- **示例**：`background-color: #f3f4f6;`

### `background-image`

- **作用**：设置背景图或渐变。
- **常用值**：`none`、`url("...")`、`linear-gradient(...)`。
- **初始值**：`none`。
- **示例**：`background-image: url("../images/bg.jpg");`

### `background-repeat`

- **作用**：决定背景图是否平铺。
- **常用值**：`repeat`、`no-repeat`、`repeat-x`、`repeat-y`、`space`、`round`。
- **初始值**：`repeat`。
- **示例**：`background-repeat: no-repeat;`

### `background-position`

- **作用**：设置背景图在背景区域中的位置。
- **常用值**：`center`、`top right`、`20px 10px`、`50% 50%`。
- **初始值**：`0% 0%`。
- **示例**：`background-position: center;`

### `background-attachment`

- **作用**：决定背景相对页面还是内容滚动。
- **常用值**：`scroll`、`fixed`、`local`。
- **初始值**：`scroll`。
- **示例**：`background-attachment: fixed;`

### `background`

- **作用**：一次设置背景色、背景图、位置、重复方式等。
- **常用值**：颜色、`url()`、`no-repeat`、`center` 等组合。
- **初始值**：未写出的背景子属性会重置为各自初始值。
- **示例**：`background: #eef2ff url("../images/bg.jpg") center / cover no-repeat;`

### `opacity`

- **作用**：设置整个元素及其内容的透明程度。
- **常用值**：`0`（全透明）到 `1`（不透明）的数字。
- **初始值**：`1`。
- **示例**：`opacity: 0.6;`；子元素也会一起变淡。

### `box-shadow`

- **作用**：给盒子添加阴影。
- **常用值**：水平偏移、垂直偏移、模糊半径、颜色；也可加 `inset`。
- **初始值**：`none`。
- **示例**：`box-shadow: 0 4px 12px rgb(0 0 0 / 12%);`

### `outline` 与 `outline-offset`

- **作用**：设置元素轮廓及轮廓到边框的距离，常用于键盘焦点。
- **常用值**：`outline` 用宽度、线型、颜色组合；`outline-offset` 用长度。
- **初始值**：`outline-style: none`、`outline-offset: 0`；浏览器可能给焦点元素额外设置默认轮廓。
- **示例**：`outline: 2px solid #2563eb; outline-offset: 2px;`；不要无替代方案地删除焦点轮廓。

## 四、尺寸、盒模型与边框

### `width` 与 `height`

- **作用**：设置内容盒的宽高；受 `box-sizing` 影响。
- **常用值**：长度、百分比、`auto`、`min-content`、`max-content`。
- **初始值**：均为 `auto`。
- **示例**：`width: 320px; height: 180px;`

### `min-width`、`min-height`、`max-width`

- **作用**：限制盒子的最小宽高或最大宽度。
- **常用值**：长度、百分比；`max-width` 也可用 `none`。
- **初始值**：`min-width` / `min-height` 为 `auto`，`max-width` 为 `none`。
- **示例**：`width: 100%; max-width: 960px; min-height: 240px;`

### `box-sizing`

- **作用**：决定 `width`、`height` 是否包含内边距和边框。
- **常用值**：`content-box`、`border-box`。
- **初始值**：`content-box`；部分表单控件有浏览器默认覆盖样式。
- **示例**：`box-sizing: border-box;`

### `margin` 与 `margin-top/right/bottom/left`

- **作用**：设置盒子外侧间距。
- **常用值**：长度、百分比、`auto`；简写可填 1～4 个值。
- **初始值**：四个方向均为 `0`。
- **示例**：`margin: 16px auto;`；常用于已定宽的块级盒子水平居中。

### `padding` 与 `padding-top/right/bottom/left`

- **作用**：设置内容到边框之间的内侧间距。
- **常用值**：非负长度或百分比；简写可填 1～4 个值。
- **初始值**：四个方向均为 `0`。
- **示例**：`padding: 12px 20px;`

### `border` 与 `border-top/bottom`

- **作用**：设置四边或单边的边框宽度、线型、颜色。
- **常用值**：宽度、`solid` / `dashed` 等线型、颜色；可单独写 `border-bottom`。
- **初始值**：各边线型为 `none`，故默认看不见边框。
- **示例**：`border: 1px solid #d1d5db;`

### `border-color`

- **作用**：单独设置边框颜色。
- **常用值**：颜色；可按上、右、下、左写 1～4 个值。
- **初始值**：各边通常取当前文字颜色 `currentColor`。
- **示例**：`border-color: #d1d5db;`

### `border-radius`

- **作用**：设置圆角。
- **常用值**：长度或百分比；可写 1～4 个角的值。
- **初始值**：`0`。
- **示例**：`border-radius: 8px;`

### `border-collapse`

- **作用**：决定表格相邻单元格的边框是否合并。
- **常用值**：`separate`、`collapse`。
- **初始值**：`separate`。
- **示例**：`table { border-collapse: collapse; }`

## 五、显示、定位与溢出

### `display`

- **作用**：决定元素参与什么布局及其内部布局方式。
- **常用值**：`block`、`inline`、`inline-block`、`flex`、`grid`、`none`。
- **初始值**：`inline`；HTML 标签常被浏览器默认样式覆盖。
- **示例**：`display: flex;`

### `overflow` 与 `overflow-x`

- **作用**：控制内容超出盒子时的处理；`overflow-x` 只管水平方向。
- **常用值**：`visible`、`hidden`、`clip`、`auto`、`scroll`。
- **初始值**：`visible`。
- **示例**：`overflow-x: auto;`；适合宽表格容器。

### `position`

- **作用**：决定元素定位方式。
- **常用值**：`static`、`relative`、`absolute`、`fixed`、`sticky`。
- **初始值**：`static`。
- **示例**：`position: relative;`

### `top`、`right`、`bottom`、`left`

- **作用**：为非 `static` 定位元素设置偏移或定位边界。
- **常用值**：长度、百分比、`auto`。
- **初始值**：均为 `auto`。
- **示例**：`position: absolute; top: 8px; right: 8px;`

### `z-index`

- **作用**：控制定位元素等在层叠上下文中的顺序。
- **常用值**：`auto` 或整数，如 `1`、`10`、`-1`。
- **初始值**：`auto`。
- **示例**：`z-index: 10;`；不同层叠上下文之间不能只比较数字大小。

### `visibility`

- **作用**：控制元素是否可见，同时通常保留布局空间。
- **常用值**：`visible`、`hidden`、`collapse`。
- **初始值**：`visible`。
- **示例**：`visibility: hidden;`

### `float` 与 `clear`

- **作用**：旧页面常用的浮动及清除浮动影响；新布局通常使用 Flex/Grid。
- **常用值**：`float: left/right/none`；`clear: left/right/both/none`。
- **初始值**：二者均为 `none`。
- **示例**：`float: left; clear: both;`

## 六、Flex 布局

以下属性需要分清“容器”与“子项”。容器上先写 `display: flex`；`flex` 写在直接子项上。

### `flex-direction`

- **作用**：决定主轴方向，写在 Flex 容器上。
- **常用值**：`row`、`row-reverse`、`column`、`column-reverse`。
- **初始值**：`row`。
- **示例**：`flex-direction: column;`

### `justify-content`

- **作用**：沿主轴分配空余空间，写在容器上。
- **常用值**：`flex-start`、`center`、`flex-end`、`space-between`、`space-around`、`space-evenly`。
- **初始值**：`normal`；在常见 Flex 情况下表现接近起点对齐。
- **示例**：`justify-content: space-between;`

### `align-items`

- **作用**：设置同一行内子项在交叉轴上的对齐，写在容器上。
- **常用值**：`stretch`、`flex-start`、`center`、`flex-end`、`baseline`。
- **初始值**：`normal`；在常见 Flex 情况下表现接近拉伸。
- **示例**：`align-items: center;`

### `flex-wrap`

- **作用**：控制子项是否换行，写在容器上。
- **常用值**：`nowrap`、`wrap`、`wrap-reverse`。
- **初始值**：`nowrap`。
- **示例**：`flex-wrap: wrap;`

### `gap`、`row-gap`、`column-gap`

- **作用**：设置 Flex 或 Grid 子项间距，写在容器上。
- **常用值**：非负长度或百分比；`gap` 可写“行间距 列间距”。
- **初始值**：子属性均为 `normal`，在常见 Flex/Grid 布局中通常表现为 `0`。
- **示例**：`gap: 16px 24px;`

### `flex`

- **作用**：控制 Flex 子项的伸展、收缩和基础尺寸。
- **常用值**：`1`、`0 0 auto`、`1 1 200px`。
- **初始值**：等价于 `0 1 auto`。
- **示例**：`.card { flex: 1 1 240px; }`

## 七、Grid 布局

容器上先写 `display: grid`。列和行的轨道设置在容器上；子项跨列、跨行的属性写在子项上。

### `grid-template-columns` 与 `grid-template-rows`

- **作用**：定义网格列、行的轨道尺寸。
- **常用值**：`1fr 2fr`、`repeat(3, 1fr)`、`minmax(180px, 1fr)`。
- **初始值**：二者均为 `none`，由自动布局生成隐式轨道。
- **示例**：`grid-template-columns: repeat(3, minmax(0, 1fr));`

### `grid-template-areas`

- **作用**：给网格区域命名并排列。
- **常用值**：每行一个引号字符串；`.` 表示空单元格。
- **初始值**：`none`。
- **示例**：`grid-template-areas: "header header" "side main";`

### `grid-column` 与 `grid-row`

- **作用**：让网格子项跨列或跨行。
- **常用值**：网格线序号、区域名、`span 2`。
- **初始值**：起止位置均为 `auto`。
- **示例**：`grid-column: 1 / span 2;`

### `grid-area`

- **作用**：用区域名放置网格子项，或同时指定四条边界。
- **常用值**：区域名，或“行起点 / 列起点 / 行终点 / 列终点”。
- **初始值**：四个方向均为 `auto`。
- **示例**：`grid-area: main;`

## 八、交互、过渡与动画

### `cursor`

- **作用**：设置鼠标指针形状。
- **常用值**：`auto`、`pointer`、`text`、`not-allowed`、`grab`。
- **初始值**：`auto`。
- **示例**：`cursor: pointer;`；可点击元素仍应使用正确的 HTML 语义。

### `resize`

- **作用**：允许用户拖动调整元素尺寸，常见于 `<textarea>`。
- **常用值**：`none`、`both`、`horizontal`、`vertical`。
- **初始值**：`none`；浏览器可能给文本域设置默认可调整样式。
- **示例**：`resize: vertical;`

### `transform`

- **作用**：移动、旋转或缩放元素的视觉外观。
- **常用值**：`none`、`translate()`、`scale()`、`rotate()`。
- **初始值**：`none`。
- **示例**：`transform: translateY(-4px);`

### `transform-origin`

- **作用**：设置变换的参考点。
- **常用值**：`center`、`top left`、`50% 50%`。
- **初始值**：通常为 `50% 50% 0`。
- **示例**：`transform-origin: center;`

### `transition`

- **作用**：让属性值变化在一段时间内平滑过渡。
- **常用值**：属性名、持续时间、缓动函数、延迟时间的组合。
- **初始值**：各子属性分别为 `all`、`0s`、`ease`、`0s`。
- **示例**：`transition: background-color 200ms ease;`

### `animation` 与常用子属性

- **作用**：应用 `@keyframes` 定义的动画。
- **常用值**：`animation-name` 为动画名；`animation-duration` 为 `200ms`、`1s`；`animation-timing-function` 为 `ease`、`linear`、`ease-in-out`；`animation-iteration-count` 为数字或 `infinite`；`animation-direction` 为 `normal`、`reverse`、`alternate`。
- **初始值**：名称 `none`、时长 `0s`、节奏 `ease`、次数 `1`、方向 `normal`。
- **示例**：`animation: fade-in 400ms ease 1;`

### `content`

- **作用**：给 `::before`、`::after` 等生成内容。
- **常用值**：引号字符串、`attr(...)`、`none`、`normal`。
- **初始值**：`normal`。
- **示例**：`.required::after { content: " *"; }`；重要信息仍应在 HTML 中出现。

## 九、选择器、变量与媒体查询

以下几项不是普通 CSS 属性，但在本课程中经常与属性一起出现。

### 选择器

- **作用**：选中需要应用样式的元素。
- **常用写法**：`p`（标签）、`.card`（类）、`#header`（ID）、`.card p`（后代）、`.card > p`（直接子元素）、`:hover`（状态）、`::before`（伪元素）。
- **示例**：`.nav a:hover { color: #2563eb; }`

### 自定义属性与 `var()`

- **作用**：保存可复用的值，再在属性中读取。
- **常用写法**：`--main-color: #2563eb;` 定义；`var(--main-color)` 读取；`var(--main-color, blue)` 提供回退值。
- **初始值**：普通未注册自定义属性没有预设初始值；会继承。若未定义且没有可用回退，使用它的声明可能无效。
- **示例**：`:root { --main-color: #2563eb; } .button { color: var(--main-color); }`

### `@media` 与 `prefers-reduced-motion`

- **作用**：根据视口或用户偏好有条件地应用规则。
- **常用写法**：`@media (max-width: 768px)`；`@media (prefers-reduced-motion: reduce)`。
- **示例**：`@media (max-width: 768px) { .grid { grid-template-columns: 1fr; } }`
- **注意**：`prefers-reduced-motion` 是媒体特征，不是写在选择器里的 CSS 属性。

### `@keyframes`

- **作用**：定义动画在不同进度的样式。
- **常用写法**：`from`、`to` 或 `0%`～`100%`。
- **示例**：`@keyframes fade-in { from { opacity: 0; } to { opacity: 1; } }`

## 十、易混淆对照

| 易混淆项 | 区别与使用提示 |
| --- | --- |
| `display: none` / `visibility: hidden` / `opacity: 0` | `display: none` 不占布局空间；`visibility: hidden` 通常仍占空间；`opacity: 0` 仍占空间且可能继续接收交互。 |
| `margin` / `padding` | `margin` 在边框外，`padding` 在边框内；背景色通常延伸到内边距区域。 |
| `width: 100%` / `max-width: 100%` | 前者请求宽度等于包含块的百分比；后者只设置上限，常用于避免图片超出容器。 |
| `height: 100%` / `min-height: 100vh` | 百分比高度依赖包含块高度计算条件；视口高度单位以视口为参照。 |
| `position: absolute` / `fixed` / `sticky` | `absolute` 相对定位包含块；`fixed` 通常相对视口；`sticky` 在滚动容器内达到阈值时粘住。 |
| Flex 主轴 / 交叉轴 | `flex-direction` 决定主轴；`justify-content` 管主轴空间；`align-items` 管交叉轴对齐。 |
| `gap` / 子项 `margin` | `gap` 控制轨道或项目之间的间距，不会直接给容器外沿增加空白。 |
| `color` / `background-color` / `opacity` | `color` 控制文字；`background-color` 控制背景；`opacity` 影响整个元素及其后代。 |
| `font-size` / `line-height` | 前者决定字号，后者决定行盒高度；行高可用无单位倍数。 |

## 来源与查阅方法

本页以当前课程中的属性为范围，依据 [CSS 属性参考](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties)与 [CSS 值与单位](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Values_and_units)整理。CSS 规范与浏览器支持会继续变化；遇到陌生属性或需要完整语法时，点开对应参考页查看“Formal definition”和兼容性表。完成查阅后可到[网页编辑室](/frontend/playground)修改示例并观察效果。
