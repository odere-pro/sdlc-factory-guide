---
id: verification
title: "第 3 部分——构建验证机制"
description: 测试作为确定性契约，评估覆盖非确定性行为——复利增长的质量飞轮。
sidebar_position: 5
keywords: [verification, testing, evals, quality, AI evaluation]
image: /img/og-image.png
---

<head>
  <script type="application/ld+json">
    {JSON.stringify({
      '@context': 'https://schema.org/',
      '@type': 'TechArticle',
      headline: '第 3 部分——构建验证机制',
      description: '测试作为确定性契约，评估覆盖非确定性行为——复利增长的质量飞轮。',
      author: { '@type': 'Person', name: 'Oleksandr Derechei' },
      datePublished: '2026-06-18',
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': 'https://odere-pro.github.io/sdlc-factory-guide/docs/verification',
      },
    })}
  </script>
</head>

# 第 3 部分——构建验证机制

这是决定你是在做真正的工程还是仅仅在碰运气的那条线：**你的输出是如何被验证的？** 如果答案是"我运行一下，感觉可以"，那无论你的提示词多么精巧，你都在做氛围编程（vibe coding）。验证机制是让 AI 输出在生产环境中值得信任的工程纪律。

两种机制协同工作。测试覆盖确定性的部分。评估覆盖非确定性的部分。

## 测试：确定性契约

测试验证系统中给定输入必须产生给定输出的那些部分。这些和你平时会写的测试是一样的——但在 AI 工作流中，它们多了一项职责：**以比任何提示词都更精确的方式向智能体传达意图。**

测试是机器可验证的规格说明。把一个失败的测试交给智能体并说"让它通过"，你就给了它一个明确的目标，以及一个知道什么时候完成的自动化方式。所以先写测试：

```python
def test_refund_over_threshold_requires_approval():
    charge = make_charge(amount=600_00)
    with pytest.raises(ApprovalRequired):
        refund_service.issue(charge.id, amount=600_00, approved_by=None)

def test_refund_writes_ledger_entry():
    charge = make_charge(amount=50_00)
    refund_service.issue(charge.id, amount=50_00, approved_by="alice")
    assert ledger.last_entry().type == "refund"
```

现在智能体无需你用散文解释，就已经知道了金额阈值规则和账本要求。测试*本身就是*解释。

## 评估：判断非确定性部分

测试无法覆盖一切，因为大量智能体行为是非确定性的。智能体是否走了合理的路径？它是否选择了正确的工具？最终输出是否真的好，而不仅仅是语法上有效？这就是**评估（eval）**所衡量的。

评估使用带标签的数据集、评分标准，有时还会用一个模型充当裁判。评估分为两种，都是必需的：

- **输出评估**——判断最终产物。代码能编译吗？测试通过了吗？摘要准确吗？
- **轨迹评估**——判断*它是如何做到的*。智能体是否以合理的顺序调用了正确的工具，还是胡乱尝试后碰巧得到了通过的结果？

轨迹比表面看起来更重要。一个跳过了验证步骤的流畅输出，比一个有明显错误的输出*更危险*，因为它隐藏了风险。一个在忽略测试套件的情况下碰巧产生了正确代码的智能体，终将以同样的方式产生错误代码。

## 一个具体的评估标准

对于一个从你的文档中回答问题的智能体，评估集是一组案例加上一套标准：

```yaml
- question: "How do I rotate an API key?"
  must_mention: ["settings page", "revoke old key", "24h grace period"]
  must_not: ["email support"]   # we have self-serve rotation now
  tool_path: ["search_docs"]    # should retrieve, not answer from memory

- question: "What's the refund window?"
  must_mention: ["30 days"]
  tool_path: ["search_docs"]
```

每次运行都会评分：它是否提到了必要的事实，避免了禁止的内容，并遵循了预期的工具路径？一个模型裁判可以根据你编写的评分标准，对"这个答案是否清晰准确"这一更柔性的维度进行评分。关键在于："好"的定义现在是明确的，并且是自动检验的——而不是靠肉眼判断。

## 质量飞轮

当测试和评估被接入一个复利增长的循环时，它们才能发挥最大价值：

1. **评估**——对基准测试套件运行。
2. **诊断**——将失败归类为根本原因（而不是逐个修补）。
3. **优化**——改进导致该类失败的提示词、规则或工具。
4. **验证**——对回归测试套件运行修复，确保问题被持续修复。
5. **监控**——持续关注生产流量中的新失败模式，并将其反馈到第 1 步。

每轮循环都让下一轮从更高的基线起步。这就是一个智能体在不更换底层模型的情况下持续可靠地变得更好的方法。

## 搭建你自己的工作流

- [ ] 下次开发新功能时，在让智能体生成代码之前先写好测试。
- [ ] 为你关心的某个智能体行为构建一个小型评估集——哪怕只有十个案例。
- [ ] 对每个评估案例，既定义输出必须包含的内容，也定义你期望的工具路径。
- [ ] 添加一个回归测试套件，对每次修复重新运行验证。
- [ ] 本周选一个生产故障，找到其根本原因类别，修复原因而非症状。
