
# 第十章：CloudWatch 日志、监控与故障排查（生产必备）

> 本章目标：
>
> - 理解 CloudWatch 在 AWS 中的真实作用
> - 掌握监控（Metrics）与日志（Logs）的区别
> - 学会为 EC2 / ALB / RDS 配置基础监控
> - 能在系统异常时，通过 CloudWatch 快速定位问题

---

## 10.1 为什么必须有监控与日志？

在前面的章节中，我们已经成功：

- 部署了 EC2 + Spring Boot
- 使用 ALB 做统一入口
- 配置了 Auto Scaling
- 启用了 HTTPS

但问题是：

> **一旦系统出问题，你怎么知道？**

没有监控和日志，系统会变成：

- 用户说“打不开了”，你只能猜
- 服务慢了，但你不知道慢在哪里
- 服务器挂了，没人通知你

📌 **结论：**
> 生产系统 ≠ 能跑
> 生产系统 = 能监控 + 能排错

---

## 10.2 CloudWatch 是什么？

CloudWatch 是 AWS 提供的 **统一监控与日志平台**。

它主要解决三件事：

1. **监控资源状态（Metrics）**
2. **集中管理日志（Logs）**
3. **基于条件告警（Alarms）**

可以把 CloudWatch 理解为：

> **AWS 系统的“体检仪表盘 + 黑匣子”**

---

## 10.3 Metrics 与 Logs 的区别（新手必懂）

| 对比项 | Metrics（指标） | Logs（日志） |
| ------ | --------------- | ------------- |
| 关注点 | 状态、趋势 | 细节、原因 |
| 数据形式 | 数值（CPU、内存） | 文本 |
| 使用场景 | 是否异常 | 为什么异常 |
| 示例 | CPU 使用率 90% | NullPointerException |

📌 **口诀：**
> Metrics 看“有没有问题”，Logs 查“为什么有问题”

---

## 10.4 EC2 的 CloudWatch 监控

### 10.4.1 EC2 默认监控项

EC2 创建后，AWS 会自动提供基础监控：

- CPUUtilization（CPU 使用率）
- NetworkIn / NetworkOut（网络流量）
- DiskReadOps / DiskWriteOps

这些指标：

- 默认每 5 分钟采集一次
- 不需要额外配置

---

### 10.4.2 监控 CPU 的意义

CPU 长期过高，通常意味着：

- 实例规格太小
- 请求量超出承载能力
- 程序存在死循环或性能问题

📌 **经验值：**
> CPU 长期 > 70%，需要关注
> CPU 长期 > 85%，必须处理

---

## 10.5 为 EC2 创建告警（Alarm）

### 10.5.1 告警能做什么？

当指标超过阈值时：

- 发送邮件 / SNS 通知
- 触发 Auto Scaling 扩容（进阶）

---

### 10.5.2 创建 CPU 告警（实战）

步骤：

1. CloudWatch → Alarms → Create alarm
2. 选择 EC2 → CPUUtilization
3. 设置条件：
   - Average
   - > 80%
   - 持续 5 分钟
4. 绑定 SNS 通知（邮箱）
5. 命名并创建

这样你就能：

> **在服务器还没“彻底挂掉”前收到预警**

---

## 10.6 CloudWatch Logs 是什么？

CloudWatch Logs 用于：

- 集中存储应用日志
- 跨实例统一查看
- 支持搜索与时间定位

在 Auto Scaling 场景中尤为重要：

> **实例会不断变化，日志不能只存在本地。**

---

## 10.7 Spring Boot 日志接入 CloudWatch

### 10.7.1 为什么不能只看 EC2 本地日志？

- 实例可能被销毁
- 登录每台机器查看不现实
- 无法统一搜索

📌 **生产环境原则：**
> 日志必须集中化

---

### 10.7.2 接入方式概览

常见做法：

```text
Spring Boot
 → 本地日志文件
 → CloudWatch Agent
 → CloudWatch Logs
```

---

### 10.7.3 安装 CloudWatch Agent（EC2）

```bash
sudo yum install -y amazon-cloudwatch-agent
```

---

### 10.7.4 配置日志采集（示例）

示例路径：

```text
/var/log/springboot/app.log
```

CloudWatch 配置文件中指定该路径即可。

---

## 10.8 ALB 的 CloudWatch 监控

ALB 自带重要指标：

- RequestCount（请求数）
- TargetResponseTime（响应时间）
- HTTPCode_Target_5XX_Count

重点关注：

- **5XX 错误**
- **响应时间突增**

📌 这些指标常用于：
> 判断后端是否健康

---

## 10.9 RDS 的基础监控

RDS 常见监控项：

- CPUUtilization
- FreeableMemory
- DatabaseConnections

如果你看到：

- CPU 高
- 内存低
- 连接数满

说明数据库已经成为瓶颈。

---

## 10.10 常见故障排查思路（非常重要）

### 场景一：页面打不开

排查顺序：

1. ALB 是否健康
2. Target Group 是否有 Healthy 实例
3. EC2 是否存活
4. 应用日志是否报错

---

### 场景二：接口很慢

排查顺序：

1. ALB 响应时间
2. EC2 CPU / 内存
3. 应用日志
4. RDS 连接与性能

---

## 10.11 本章小结

- CloudWatch 是 AWS 监控与日志中枢
- Metrics 用于“发现问题”
- Logs 用于“定位问题”
- 告警让你在事故前收到通知
- 日志集中化是生产系统必备能力

---

> 到这里，你已经具备：
>
> - 可观测的系统架构
> - 基础 SRE / 运维能力
> - 真实生产环境的问题定位能力
>
> 下一章可自然进入：
> **Lambda / Serverless 架构** 或 **完整项目架构复盘**
