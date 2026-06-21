---
id: context-engineering
title: "第 2 部分——设计上下文"
description: 控制智能体看到什么、何时看到——静态与动态上下文、渐进式披露的技能机制，以及成本感知设计。
sidebar_position: 4
keywords: [context engineering, dynamic context, skills, tokens, prompt design]
image: /img/og-image.png
---

<head>
  <script type="application/ld+json">
    {JSON.stringify({
      '@context': 'https://schema.org/',
      '@type': 'TechArticle',
      headline: '第 2 部分——设计上下文',
      description: '控制智能体看到什么、何时看到——静态与动态上下文、渐进式披露的技能机制，以及成本感知设计。',
      author: { '@type': 'Person', name: 'Oleksandr Derechei' },
      datePublished: '2026-06-18',
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': 'https://odere-pro.github.io/sdlc-factory-guide/docs/context-engineering',
      },
    })}
  </script>
</head>

# 第 2 部分——设计上下文

上下文工程是区分"快速 AI 输出"与"有用 AI 输出"的核心技能。第 1 部分的规则文件只是其中的一部分。本部分讲的是更大的工程规范：决定智能体看到什么，以及何时看到。

思维转变的关键是：从"我该怎么措辞才能诱导模型写出好代码？"转向"一名新队友需要知道什么才能高效贡献，以及我如何高效地把这些传递给他？"

## 两个桶：静态与动态

每一段上下文都属于两个桶之一，而选择哪个桶是一个真实的工程决策，有真实的成本。

**静态上下文**在每一次请求时都会加载：

- 系统指令
- 规则文件（`CLAUDE.md` 等）
- 全局记忆与角色设定

它是可靠的——智能体永远不会忘记——但也是昂贵的，因为无论当前任务是否需要，每次调用都要为其中的每个 Token 付费。

**动态上下文**只在需要时加载：

- 由当前任务触发的技能
- 执行过程中获取的工具调用结果
- 从搜索索引检索的文档
- 近期的对话历史片段

它是高效的——只有当信息真正相关时才付费。

两个极端都有陷阱：静态上下文过多会浪费金钱，并且*会稀释信号*（重要规则被淹没在噪声中）；而过少则意味着智能体会遗忘它需要的内容。把静态/动态的边界当成任何其他架构决策来对待——经过审查和版本管理，而不是随意决定的。

## 成本直觉速算

假设你的规则文件有 2,000 个 Token，一次会话中你发出了 50 个请求。仅规则文件就消耗了 100,000 个 Token，并且被重复支付了 50 次。如果文件的一半是只与某一个任务相关的参考资料，那么其余 49 个请求都在白白烧钱。把那一半移入一个按需加载的技能（skill）中，其他 49 次请求的这部分成本就消失了。

这就是为什么"保持静态上下文简洁且高信噪比"不是一种风格偏好——而是一个实实在在的成本条目。

## 技能：动态上下文的设计模式

管理动态桶最有效的方式是**技能**：一个自包含的程序化知识包，只有当任务与之匹配时才由智能体加载。

技能通过*渐进式披露*工作——三个层级，懒加载：

1. 启动时，智能体只看到轻量的元数据（名称和一行描述）。
2. 当任务匹配时，加载完整的指令。
3. 只有在需要更深层细节时，才拉取繁重的参考资料。

结果是：一个轻量的通用智能体可以承载数十种专业能力，而只为当前正在使用的那一种支付 Token 成本。

一个最简技能如下所示：

```markdown
---
name: stripe-refunds
description: How to issue and reconcile refunds through our billing layer. Use when a task involves refunds, chargebacks, or payment reversals.
---

# Issuing a refund

1. Look up the charge via `billing.get_charge(charge_id)`.
2. Refunds over $500 require an `approved_by` field — never auto-approve.
3. Call `billing.refund(charge_id, amount, approved_by)`.
4. Write a `RefundRecord` to the ledger in the same transaction.
5. Emit a `refund.issued` event.

See `reference/refund-edge-cases.md` for partial refunds and currency conversion.
```

只有当任务实际涉及退款时，智能体才会读取这段内容。其余时间它只花费一行描述的 Token 成本。

## 需要管理的六类上下文

在决定提供什么内容时，要从六个维度思考。大多数工作流在中间四类上投入不足。

- **指令**——智能体的角色、目标和边界（即你的规则文件）。
- **知识**——文档、架构图、领域数据。
- **记忆**——刚刚发生的事（会话级），以及项目是什么（长期级）。
- **示例**——来自*你自己代码库*的参考模式，而不是网上的通用示例。
- **工具**——智能体可调用的 API 和脚本的精确定义。
- **护栏**——硬性约束和安全规则。

"示例"这一项值得单独强调：从你的真实代码中取出一个示例，比三段描述性文字更能让智能体快速理解你的风格。

## 不要粘贴整个代码库

一个常见的失败是把整个 100,000 Token 的代码库塞进提示词，"这样它就什么都有了"。这既昂贵又适得其反——相关信号被埋没。检索与当前任务相关的少数几个文件，让智能体在需要时再索取更多。全代码库感知是工具应该做的事（索引、检索），而不是你每次提示都要手工完成的。

## 搭建你自己的工作流

- [ ] 列出当前静态上下文中的所有内容。对每一项问：*每个*任务都需要这个吗？
- [ ] 将特定任务的内容从规则文件移出，放入技能中。
- [ ] 为某个常见的专业性任务编写你的第一个技能（退款流程、迁移模式、报告格式）。
- [ ] 向规则文件或技能中添加几个来自你代码库的真实示例。
- [ ] 停止粘贴整个文件；让检索机制浮现相关内容。
