export const jsExamples = {
  types: { title: '变量与类型转换', code: `const raw = "12";
console.log(typeof raw, raw + 2);
const days = Number(raw);
console.log(typeof days, days + 2);` },
  conditions: { title: '严格相等与真假值', code: `console.log(0 === "0");
console.log(Boolean("0"));
const days = 2;
console.log(days > 0 ? "可以申请" : "天数无效");` },
  loops: { title: '循环执行顺序', code: `const names = ["田中", "李", "佐藤"];
for (let i = 0; i < names.length; i++) {
  console.log(i, names[i]);
}` },
  arrays: { title: '原数组与新数组', code: `const values = [1, 2, 3];
const sliced = values.slice(1);
console.log("slice 后", values, sliced);
values.splice(1, 1);
console.log("splice 后", values);` },
  scope: { title: '闭包保存状态', code: `function createCounter() {
  let count = 0;
  return () => ++count;
}
const first = createCounter();
const second = createCounter();
console.log(first(), first(), second());` },
  callbacks: { title: 'filter 与 map 的差别', code: `const days = [1, 3, 5, 8];
console.log("筛选", days.filter(day => day >= 3));
console.log("转换", days.map(day => day * 2));
console.log("原数组", days);` },
  references: { title: '两个变量指向同一对象', code: `const first = { name: "田中" };
const second = first;
second.name = "佐藤";
console.log(first.name, first === second);` },
  prototype: { title: '实例查找原型方法', code: `function Employee(name) { this.name = name; }
Employee.prototype.greet = function () { return "你好，" + this.name; };
const person = new Employee("田中");
console.log(person.greet());
console.log(Object.hasOwn(person, "greet"));
console.log(Object.hasOwn(Employee.prototype, "greet"));` },
  copies: { title: '展开语法只复制一层', code: `const original = { applicant: { name: "田中" } };
const copy = { ...original };
copy.applicant.name = "佐藤";
console.log(original.applicant.name);
console.log(original === copy, original.applicant === copy.applicant);` },
  regex: { title: '格式校验', code: `const code = "EMP-123";
const pattern = /^EMP-\\d{3}$/;
console.log(pattern.test(code));
console.log(pattern.test("EMP-12"));` },
  errors: { title: '异常与 finally', code: `try {
  throw new Error("数据格式不正确");
} catch (error) {
  console.log("捕获：", error.message);
} finally {
  console.log("清理结束");
}` },
  async: { title: '同步、微任务与定时器', code: `console.log("1 同步开始");
setTimeout(() => console.log("3 定时器"), 0);
Promise.resolve().then(() => console.log("2 Promise 回调"));
console.log("1 同步结束");` }
} as const

export type JsExampleKey = keyof typeof jsExamples
export function isJsExampleKey(value: string): value is JsExampleKey {
  return Object.prototype.hasOwnProperty.call(jsExamples, value)
}
