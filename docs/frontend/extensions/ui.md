# Bootstrap 与 Vuetify：两条 UI 路线

两者都能帮助页面保持一致，但使用方式不同。**Bootstrap 5.3** 可直接服务于普通 HTML 或已有模板页面；**Vuetify 3** 是 Vue 3 的组件库，需要接入 Vue 应用。先学 [CSS 布局](../CSS/index.md) 和 [Vue 组件](../Vue/index.md)，再选项目正在使用的一条路线。组件库不负责业务权限、后端校验和接口设计。

| 任务 | Bootstrap 5.3 | Vuetify 3 |
| --- | --- | --- |
| 页面布局 | `container`、`row`、`col` 与工具类 | `v-container`、`v-row`、`v-col` 与布局组件 |
| 表单与反馈 | HTML 表单加 Bootstrap 样式、Modal、Toast 等 | `v-text-field`、`v-dialog`、`v-snackbar` 等 Vue 组件 |
| 状态更新 | 由你的 JavaScript 或框架控制 | Vue 响应式状态和组件 Props / 事件 |
| 适用起点 | 已有 HTML 页或服务端模板 | 已有 Vue 3 项目 |

## 路线 A：Bootstrap 页面

在独立练习页先引入 Bootstrap 5.3 的 CSS；只有 Modal、Toast 等交互组件需要对应的 JS Bundle。版本应跟项目锁定版本一致，下面的地址只是示例，正式项目还要按照[官方接入说明](https://getbootstrap.com/docs/5.3/getting-started/introduction/)加入适用的完整性校验或使用本地依赖。

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/css/bootstrap.min.css">
<main class="container py-4">
  <h1 class="h3">申请一览</h1>
  <div class="row g-3">
    <section class="col-12 col-md-8">
      <div class="card"><div class="card-body">申请记录</div></div>
    </section>
    <aside class="col-12 col-md-4">
      <div class="card"><div class="card-body">筛选条件</div></div>
    </aside>
  </div>
</main>
```

`col-12` 表示窄屏占满一行；`col-md-8` / `col-md-4` 表示较宽屏幕按 8:4 分列。先确认容器、行、列的关系，再用工具类调整间距。表单要保留真实 `<label>` 和错误信息；弹窗要检查键盘、焦点和关闭后的状态。参见 [官方栅格说明](https://getbootstrap.com/docs/5.3/layout/grid/)。

需要一个确认弹窗时，Bootstrap 用数据属性连接按钮与 Modal；还要在页面底部加载与 CSS **同版本**的 `bootstrap.bundle.min.js`。下面片段仅演示打开与关闭，**没有执行删除**：

```html
<button type="button" class="btn btn-outline-danger"
        data-bs-toggle="modal" data-bs-target="#deleteConfirm">
  删除申请
</button>
<div class="modal fade" id="deleteConfirm" tabindex="-1"
     aria-labelledby="deleteTitle" aria-hidden="true">
  <div class="modal-dialog"><div class="modal-content">
    <div class="modal-header">
      <h2 class="modal-title fs-5" id="deleteTitle">确认删除？</h2>
      <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="关闭"></button>
    </div>
    <div class="modal-body">删除后可能无法恢复，请先核对申请编号。</div>
    <div class="modal-footer">
      <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">取消</button>
    </div>
  </div></div>
</div>
```

真正的确认按钮还要在点击后调用业务逻辑，处理加载、失败与重复提交。深浅主题可先使用 Bootstrap 5.3 的 `data-bs-theme`，再按项目设计系统调整变量；不要只改背景色而忽略文字和边框对比。[Modal 官方文档](https://getbootstrap.com/docs/5.3/components/modal/)说明了键盘与关闭行为。

## 路线 B：Vuetify 3 页面

在已有 Vue 3 项目中，先按**该项目锁定的 Vuetify 3 文档**安装并注册插件。插件必须在 `mount` 前通过 `app.use(vuetify)` 接入，应用内容通常位于 `v-app` 内。不要把 Vuetify 2、3 或更新主版本的组件写法混用。

```vue
<script setup>
import { ref } from 'vue'

const keyword = ref('')
const submitted = ref(false)

function search() {
  submitted.value = true
  // 真正项目在这里调用已有 API 层；此示例只展示界面状态。
}
</script>

<template>
  <v-app>
    <v-main>
      <v-container>
        <v-row>
          <v-col cols="12" md="8">
            <v-text-field v-model="keyword" label="关键词" />
          </v-col>
          <v-col cols="12" md="4">
            <v-btn color="primary" @click="search">查询</v-btn>
          </v-col>
        </v-row>
        <p v-if="submitted">已提交关键词：{{ keyword || '未输入' }}</p>
      </v-container>
    </v-main>
  </v-app>
</template>
```

`v-model` 只管理输入值；查询结果、失败提示和权限仍要由业务代码处理。Dialog 的开关、Snackbar 的消息和表格的加载状态也一样。接入步骤与组件 API 请按项目版本查 [Vuetify 3 文档](https://v3.vuetifyjs.com/en/)。

在同一组件的 `<script setup>` 中声明 `const confirmOpen = ref(false)`，就可以用 Vue 状态控制确认框：

```vue
<template>
  <v-btn @click="confirmOpen = true">删除申请</v-btn>
  <v-dialog v-model="confirmOpen" max-width="420">
    <v-card title="确认删除？" text="请先核对申请编号。">
      <v-card-actions>
        <v-btn @click="confirmOpen = false">取消</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
```

这个片段同样只展示确认界面，不执行删除。Vuetify 的主题需要在插件配置或应用状态中统一管理；布局可从 `v-container`、`v-row`、`v-col` 开始，避免每个页面各写一套断点。数据表格要分清前端分页与后端分页，不能在仅加载第一页数据时假装已对全部记录排序。

## 验收一条路线

用同一个申请一览页检查：窄屏与桌面布局、空数据、加载与失败状态、键盘操作、表单错误提示，以及主题切换后文字是否可读。只需要完成项目实际使用的路线；另一条用于识读即可。
