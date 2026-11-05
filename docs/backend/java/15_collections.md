# 第15章 Java 集合框架详解

## 一、前言

集合（Collection）是 Java 中用于存储和操作一组对象的容器。  
相比数组，集合的长度可变、类型安全、支持泛型与丰富的操作方法。  
Java 集合框架（Java Collections Framework, JCF）为开发者提供了统一的接口和实现结构。

---

## 二、集合框架体系结构

Java 集合分为两大类：

1. **Collection 接口体系**（单值集合）  
   包含 `List`、`Set`、`Queue` 等接口。
2. **Map 接口体系**（键值对集合）  
   用于存储键值映射，如 `HashMap`、`TreeMap`。

### 集合框架类图概览

```markdown
Collection（接口）
├── List（接口）
│   ├── ArrayList
│   ├── LinkedList
│   └── Vector
│       └── Stack
│
├── Set（接口）
│   ├── HashSet
│   │   └── LinkedHashSet
│   └── TreeSet
│
└── Queue（接口）
    ├── PriorityQueue
    └── Deque（接口）
        ├── ArrayDeque
        └── LinkedList

Map（接口）
├── HashMap
│   └── LinkedHashMap
├── TreeMap
└── Hashtable
    └── Properties
```

---

## 三、Collection 接口总览

`Collection` 是最基础的集合接口，定义了集合的通用操作：

### Collection常用方法说明

- `public boolean add(E e)`：添加元素 `e`；集合因本次调用发生变化时返回 `true`。
- `public boolean addAll(Collection<? extends E> c)`：添加集合 `c` 中的所有元素；当前集合发生变化时返回 `true`。
- `public void clear()`：清空集合中的所有元素。
- `public boolean contains(Object o)`：判断是否包含对象 `o`。
- `public boolean containsAll(Collection<?> c)`：判断是否包含集合 `c` 的全部元素；`c` 为空时返回 `true`。
- `public boolean isEmpty()`：判断集合是否为空。
- `public Iterator<E> iterator()`：返回一个用于遍历集合的迭代器。
- `public boolean remove(Object o)`：删除一个与 `o` 相等的元素；成功删除时返回 `true`。
- `public boolean removeAll(Collection<?> c)`：删除当前集合中也出现在 `c` 里的元素；内容变化时返回 `true`。
- `public boolean retainAll(Collection<?> c)`：只保留当前集合中也出现在 `c` 里的元素；内容变化时返回 `true`。
- `public int size()`：返回集合中元素的数量。
- `public Object[] toArray()`：返回包含所有元素的数组。
- `public <T> T[] toArray(T[] a)`：把元素放入与数组 `a` 相同类型的数组并返回；`a` 足够大时可能直接复用，否则新建数组。

---

## 四、List 接口（有序可重复）

### 特点

- 元素有序（按插入顺序）  
- 允许重复元素
- 支持索引访问（下标）

### List 接口常用方法

- `public E get(int index)`：返回下标 `index` 处的元素，下标从 0 开始。
- `public E set(int index, E element)`：用 `element` 替换下标 `index` 处的元素，返回旧元素。
- `public void add(int index, E element)`：在下标 `index` 处插入 `element`，后面的元素依次后移。
- `public int indexOf(Object o)`：返回 `o` 首次出现的下标，找不到返回 `-1`。
- `public int lastIndexOf(Object o)`：返回 `o` 最后一次出现的下标，找不到返回 `-1`。
- `public List<E> subList(int fromIndex, int toIndex)`：返回从 `fromIndex`（包含）到 `toIndex`（不包含）的子列表；它通常是原列表的视图，修改会相互影响。

### 常用实现类

| 类名 | 底层结构 | 特点 |
|------|-----------|------|
| `ArrayList` | 动态数组 | 查询快、增删慢 |
| `LinkedList` | 双向链表 |  增删快、查询慢 |
| `Vector` | 动态数组（线程安全） | 老项目可能看到，新项目较少主动使用 |
| `Stack` | 继承自 `Vector` | 老式栈结构，新项目通常优先考虑 `Deque` |

### ArrayList 常用方法

- `public boolean add(E e)`：添加元素到列表末尾。
- `public void ensureCapacity(int minCapacity)`：保证内部数组容量至少为 `minCapacity`；不会改变列表元素个数。
- `public void trimToSize()`：缩减底层数组容量以匹配当前元素数量。
- `public E remove(int index)`：删除下标 `index` 处的元素并返回它，后面的元素依次前移。
- `public void clear()`：清空所有元素。
- `public boolean contains(Object o)`：判断是否存在指定元素。
- `public Object clone()`：浅拷贝当前 `ArrayList`；新列表与原列表仍共享元素对象。

### LinkedList 常用方法

- `public void addFirst(E e)`：在链表头部添加元素。
- `public void addLast(E e)`：在链表尾部添加元素。
- `public E getFirst()`：返回第一个元素。
- `public E getLast()`：返回最后一个元素。
- `public E removeFirst()`：删除第一个元素。
- `public E removeLast()`：删除最后一个元素。
- `public E peek()`：查看第一个元素但不删除；链表为空时返回 `null`。
- `public E poll()`：取出并删除第一个元素；链表为空时返回 `null`。

### Vector 常用方法

- `public synchronized void addElement(E obj)`：在向量末尾添加元素。
- `public synchronized E elementAt(int index)`：返回指定索引处的元素。
- `public synchronized void removeElementAt(int index)`：删除指定位置的元素。
- `public synchronized int capacity()`：返回当前容量。
- `public synchronized void setElementAt(E obj, int index)`：用 `obj` 替换下标 `index` 处的元素；参数顺序是元素在前、下标在后。
- `public synchronized Enumeration<E> elements()`：返回枚举器遍历元素。

### 示例

```java
List<String> list = new ArrayList<>();
list.add("Java");
list.add("Python");
System.out.println(list.get(0)); // Java
list.set(1, "C++");
System.out.println(list.contains("C++")); // true
list.remove("Java");
```

---

## 五、Set 接口（无序不重复）

### 特点

- 不允许重复元素  
- 判断唯一性依赖 `hashCode()` 与 `equals()`  
- 无索引，不支持随机访问

### 常用实现类与方法

| 类名 | 底层结构 | 特点 |
|------|-----------|------|
| `HashSet` | 哈希表 |  无序唯一，查找快 |
| `LinkedHashSet` | 哈希表 + 双向链表 | 保留插入顺序,有序唯一 |
| `TreeSet` | 红黑树 | 自动排序，可排序集合 |

### HashSet 常用方法

- `public boolean add(E e)`：添加元素 `e`；已有相等元素时不添加并返回 `false`。
- `public boolean remove(Object o)`：删除对象 `o`；存在且删除成功时返回 `true`。
- `public boolean contains(Object o)`：判断是否包含对象 `o`。
- `public Iterator<E> iterator()`：返回迭代器。
- `public int size()`：返回元素个数。

### TreeSet 常用方法

- `public boolean add(E e)`：按自然顺序或指定比较器的顺序添加 `e`；已有等价元素时返回 `false`。
- `public E first()`：返回第一个（最小）元素。
- `public E last()`：返回最后一个（最大）元素。
- `public SortedSet<E> headSet(E toElement)`：返回小于 `toElement` 的子集，不包含边界值。
- `public SortedSet<E> tailSet(E fromElement)`：返回大于或等于 `fromElement` 的子集，包含边界值。

### 示例

```java
Set<Integer> set = new TreeSet<>();
set.add(3);
set.add(1);
set.add(2);
System.out.println(set); // [1, 2, 3]
```

---

## 六、Queue 接口（队列）

### 1. 特点

- 遵循 FIFO（先进先出）原则  
- 适用于任务调度、消息队列


### Queue 接口常用方法

- `public boolean offer(E e)`：尝试把 `e` 加到队尾，成功返回 `true`；容量受限的队列可能返回 `false`。
- `public E poll()`：取出并删除队首元素；队列为空时返回 `null`。
- `public E peek()`：查看队首元素但不删除；队列为空时返回 `null`。
- `public E remove()`：获取并删除队首元素（为空抛异常）。
- `public E element()`：查看队首元素（为空抛异常）。

### Deque 常用方法

- `public void addFirst(E e)`：把 `e` 加到队列头部。
- `public void addLast(E e)`：把 `e` 加到队列尾部。
- `public E removeFirst()`：删除队列头元素。
- `public E removeLast()`：删除队列尾元素。
- `public E peekFirst()`：查看头部元素。
- `public E peekLast()`：查看尾部元素。

### 示例

```java
Queue<Integer> q = new LinkedList<>();
q.offer(1);
q.offer(2);
q.offer(3);
System.out.println(q.peek()); // 1
System.out.println(q.poll()); // 1
System.out.println(q);        // [2, 3]
```

---

## 七、Map 接口（键值对集合）

### Map特点

- 键（key）唯一，值（value）可重复  
- 不继承 `Collection` 接口

### Map 接口常用方法

- `public V put(K key, V value)`：把键 `key` 对应的值设为 `value`，返回旧值；原先没有映射时通常返回 `null`。
- `public V get(Object key)`：返回键 `key` 对应的值；无映射时返回 `null`。
- `public V remove(Object key)`：删除键 `key` 对应的映射并返回旧值；无映射时返回 `null`。
- `public boolean containsKey(Object key)`：判断是否存在键 `key`。
- `public boolean containsValue(Object value)`：判断是否存在值 `value`。
- `public Set<K> keySet()`：返回键集合。
- `public Collection<V> values()`：返回值集合。
- `public Set<Map.Entry<K,V>> entrySet()`：返回键值对集合。
- `public int size()`：返回键值对数量。
- `public void clear()`：清空所有键值对。

### 3. 常用实现类

| 类名 | 特点 |
|------|------|
| `HashMap` | 无序、允许 null 键与值 |
| `LinkedHashMap` | 按插入顺序存储 |
| `TreeMap` | 按 key 排序 |
| `Hashtable` | 线程安全，不允许 null |

### HashMap 常用方法

- `public V putIfAbsent(K key, V value)`：键 `key` 无映射或当前值为 `null` 时设置 `value`，返回设置前的值。
- `public V replace(K key, V value)`：仅当键 `key` 已存在时替换为 `value`，返回旧值；否则返回 `null`。
- `public V getOrDefault(Object key, V defaultValue)`：键 `key` 无映射时返回 `defaultValue`；若键存在且值为 `null`，仍返回 `null`。
- `public void forEach(BiConsumer<? super K, ? super V> action)`：对每组键值调用 `action`，它接收键和值两个参数。

### TreeMap 常用方法

- `public K firstKey()`：返回第一个键。
- `public K lastKey()`：返回最后一个键。
- `public SortedMap<K,V> headMap(K toKey)`：返回键小于 `toKey` 的部分映射，不包含边界键。
- `public SortedMap<K,V> tailMap(K fromKey)`：返回键大于或等于 `fromKey` 的部分映射，包含边界键。
- `public Comparator<? super K> comparator()`：返回用于排序的比较器。

### 示例

```java
Map<String, Integer> map = new HashMap<>();
map.put("Java", 1);
map.put("Python", 2);
System.out.println(map.get("Java"));
map.remove("Python");
for (Map.Entry<String, Integer> e : map.entrySet()) {
    System.out.println(e.getKey() + " => " + e.getValue());
}
```

---

## 八、Collections 工具类

### 常用静态方法

- `public static <T extends Comparable<? super T>> void sort(List<T> list)`：按元素的自然顺序排列 `list`，会直接修改传入的列表。
- `public static void reverse(List<?> list)`：原地反转 `list` 的元素顺序。
- `public static void shuffle(List<?> list)`：原地随机打乱 `list` 的元素顺序，每次结果可能不同。
- `public static <T extends Comparable<? super T>> T max(Collection<? extends T> coll)`：按自然顺序返回集合 `coll` 中的最大元素；空集合会抛出异常。
- `public static <T extends Comparable<? super T>> T min(Collection<? extends T> coll)`：按自然顺序返回集合 `coll` 中的最小元素；空集合会抛出异常。
- `public static int frequency(Collection<?> c, Object o)`：统计对象 `o` 在集合 `c` 中出现的次数。
- `public static <T> void copy(List<? super T> dest, List<? extends T> src)`：把 `src` 的元素按下标覆盖到 `dest`；`dest` 必须已有至少同样数量的元素。
- `public static <T> List<T> synchronizedList(List<T> list)`：把 `list` 包装为同步列表并返回；遍历时仍需自行同步。

### 示例

```java
List<Integer> list = Arrays.asList(3, 1, 2, 5, 4);
Collections.sort(list);
Collections.reverse(list);
System.out.println(list);
```

---

## 九、集合遍历与泛型

### 1. 增强 for 循环

```java
for (String item : list) {
    System.out.println(item);
}
```

### 2. 迭代器

```java
Iterator<String> it = list.iterator();
while (it.hasNext()) {
    System.out.println(it.next());
}
```

### 3. Lambda 表达式

```java
list.forEach(item -> System.out.println(item));
```

---

## 十、项目常见集合方法补充

### 10.1 List.of()

`List.of()` 用于快速创建不可修改列表。

```java
import java.util.List;

public class ListOfDemo {

    public static void main(String[] args) {
        List<String> statuses = List.of("ACTIVE", "RETIRED");

        System.out.println(statuses); // 输出：[ACTIVE, RETIRED]
        // statuses.add("SUSPENDED"); // 运行时异常：不可修改列表不能新增元素
    }
}
```

`List.of()` 适合保存固定选项。需要增删元素时，使用 `new ArrayList<>()`。

### 10.2 Map.of()

`Map.of()` 用于快速创建不可修改 Map。

```java
import java.util.Map;

public class MapOfDemo {

    public static void main(String[] args) {
        Map<String, String> labels = Map.of(
                "ACTIVE", "在职",
                "RETIRED", "退职"
        );

        System.out.println(labels.get("ACTIVE")); // 输出：在职
    }
}
```

`Map.of()` 适合少量固定键值对。需要动态增删时，使用 `HashMap`。

### 10.3 removeIf()

`removeIf()` 用于按条件删除集合元素。

```java
import java.util.ArrayList;
import java.util.List;

public class RemoveIfDemo {

    public static void main(String[] args) {
        List<String> names = new ArrayList<>();
        names.add("Tanaka");
        names.add("");
        names.add("Suzuki");

        names.removeIf(name -> name == null || name.isBlank());

        System.out.println(names); // 输出：[Tanaka, Suzuki]
    }
}
```

`removeIf()` 比手动在循环中删除元素更清晰，也能避免部分遍历删除错误。

### 10.4 stream()

`stream()` 用于把集合转换成流式处理对象，可以进行过滤、转换、统计等操作。

```java
import java.util.List;

public class StreamIntroDemo {

    public static void main(String[] args) {
        List<String> names = List.of("Tanaka", "Suzuki", "Yamada");

        long count = names.stream()
                .filter(name -> name.startsWith("T"))
                .count();

        System.out.println(count); // 输出：1
    }
}
```

本章只要求能看懂简单 `stream()`。复杂 Stream 用法可以后续单独学习。

### 10.5 Comparator.comparing()

`Comparator.comparing()` 常用于按照对象属性排序。

```java
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;

public class ComparatorDemo {

    public static void main(String[] args) {
        List<Employee> employees = new ArrayList<>();
        employees.add(new Employee("Tanaka", 320000));
        employees.add(new Employee("Suzuki", 280000));

        employees.sort(Comparator.comparing(Employee::getSalary));

        System.out.println(employees.get(0).getName()); // 输出：Suzuki
    }
}
```

`Comparator.comparing(Employee::getSalary)` 表示按员工工资排序。

## 十一、性能与适用场景对比

| 类型 | 实现类 | 查询效率 | 增删效率 | 线程安全 | 特点 |
|------|---------|------------|------------|-------------|------|
| List | ArrayList | 高 | 低 | 否 | 顺序存储，访问快 |
| List | LinkedList | 低 | 高 | 否 | 链表结构 |
| Set | HashSet | 高 | 高 | 否 | 无序唯一 |
| Set | TreeSet | 中 | 中 | 否 | 自动排序 |
| Map | HashMap | 高 | 高 | 否 | 常用键值存储 |
| Map | TreeMap | 中 | 中 | 否 | 按 key 排序 |
| Map | Hashtable | 中 | 中 | 是 | 老项目可能看到，新项目较少主动使用 |

---

## 十二、总结

- 集合是 Java 最核心的容器框架之一，是数据存储与处理的基础。  
- `List`：有序可重复；`Set`：无序不可重复；`Map`：键值对存储。  
- 选择集合实现类时，应根据 **访问频率、线程安全、排序要求** 来确定。  
- `Collections` 工具类提供了常用的集合操作与辅助方法。
- `List.of()`、`Map.of()` 适合固定数据，返回结果不可修改。
- `removeIf()`、`stream()`、`Comparator.comparing()` 是项目中经常看到的集合处理写法。

> 熟练掌握集合框架，是继续学习 Java 的重要基础。
