<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { withBase } from 'vitepress'
import DemoContainer from './DemoContainer.vue'
import type initSqlJs from 'sql.js'
type SqlJsModule = Awaited<ReturnType<typeof initSqlJs>>
const initial = 'SELECT id, name, score FROM students ORDER BY score DESC;'
const sql = ref(initial)
const error = ref('')
const columns = ref<string[]>([])
const rows = ref<unknown[][]>([])
const message = ref('正在加载 SQLite…')
let module: SqlJsModule | undefined
let database: InstanceType<SqlJsModule['Database']> | undefined
function reset() { error.value = ''; sql.value = initial; columns.value = []; rows.value = []; database?.close(); if (!module) return; database = new module.Database(); database.run("CREATE TABLE students (id INTEGER PRIMARY KEY, name TEXT, score INTEGER); INSERT INTO students VALUES (1, '小林', 86), (2, '小王', 93), (3, '小陈', 78);"); message.value = '示例数据已重置。' }
function run() { error.value = ''; columns.value = []; rows.value = []; if (!database) { error.value = 'SQLite 尚未加载完成。'; return } try { const results = database.exec(sql.value); const last = results.at(-1); if (last) { columns.value = last.columns; rows.value = last.values; message.value = `返回 ${rows.value.length} 行。` } else message.value = '执行成功，没有结果行。' } catch (e) { error.value = String(e) } }
onMounted(async () => { try { const { default: init } = await import('sql.js'); module = await init({ locateFile: () => withBase('/vendor/sql/sql-wasm.wasm') }); reset(); run() } catch (e) { error.value = `SQLite 加载失败：${String(e)}` } })
</script>
<template><DemoContainer title="SQL 在线练习" description="浏览器中的 SQLite WASM 真实执行 SQL；数据只保存在当前页面内存，不会上传。" :source="sql" :error="error" @reset="reset"><label for="sql-code">编辑 SQLite SQL</label><textarea id="sql-code" v-model="sql" class="playground-code" spellcheck="false" /><div class="actions"><button type="button" @click="run">运行 SQL</button><span aria-live="polite">{{ message }}</span></div><div v-if="columns.length" class="table-wrap"><table><thead><tr><th v-for="column in columns" :key="column">{{ column }}</th></tr></thead><tbody><tr v-for="(row, i) in rows" :key="i"><td v-for="(value, j) in row" :key="j">{{ value }}</td></tr></tbody></table></div></DemoContainer></template>
