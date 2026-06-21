---
id: verification
title: "3부: 빌드 검증"
description: 결정론적 계약으로서의 테스트와 비결정론적 동작을 위한 평가 — 복리처럼 쌓이는 품질 플라이휠.
sidebar_position: 5
keywords: [verification, testing, evals, quality, AI evaluation]
image: /img/og-image.png
---

<head>
  <script type="application/ld+json">
    {JSON.stringify({
      '@context': 'https://schema.org/',
      '@type': 'TechArticle',
      headline: '3부: 빌드 검증',
      description: '결정론적 계약으로서의 테스트와 비결정론적 동작을 위한 평가 — 복리처럼 쌓이는 품질 플라이휠.',
      author: { '@type': 'Person', name: 'Oleksandr Derechei' },
      datePublished: '2026-06-18',
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': 'https://odere-pro.github.io/sdlc-factory-guide/verification',
      },
    })}
  </script>
</head>

# 3부: 빌드 검증

진짜 엔지니어링을 하는지, 아니면 단순히 도박을 하는지를 가르는 기준선이 있습니다. **출력 결과를 어떻게 검증하느냐**입니다. "실행해 봤더니 잘 되는 것 같다"가 답이라면, 아무리 정교한 프롬프트를 사용하더라도 그것은 바이브 코딩입니다. 검증은 AI 출력을 프로덕션 수준에서 신뢰할 수 있게 만드는 규율입니다.

두 가지 메커니즘이 함께 작동합니다. 테스트는 결정론적인 부분을 다루고, 평가(evals)는 그렇지 않은 부분을 다룹니다.

## 테스트: 결정론적 계약

테스트는 특정 입력이 반드시 특정 출력을 만들어야 하는 시스템의 부분을 검증합니다. 어차피 작성해야 할 테스트와 동일하지만, AI 워크플로우에서는 두 번째 역할이 추가됩니다. **어떤 프롬프트보다 정확하게 에이전트에게 의도를 전달합니다.**

테스트는 기계가 검사할 수 있는 명세입니다. 에이전트에게 실패하는 테스트와 "이것을 통과시켜라"를 건네면, 명확한 목표와 함께 완료 시점을 스스로 알 수 있는 수단을 준 것입니다. 그러므로 *먼저* 작성하십시오.

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

이제 에이전트는 임계값 규칙과 원장 요구사항을 산문으로 설명받지 않아도 알 수 있습니다. 테스트 자체가 설명입니다.

## 평가: 비결정론적 부분 판단하기

에이전트 동작의 상당 부분은 결정론적이지 않기 때문에 테스트만으로는 모든 것을 다룰 수 없습니다. 에이전트가 답에 이르는 합리적인 경로를 취했습니까? 올바른 도구를 선택했습니까? 최종 출력이 문법적으로 유효한 것을 넘어 실제로 좋은 결과입니까? 이것이 바로 **평가(evals)**가 측정하는 것입니다.

평가는 레이블이 붙은 데이터셋, 채점 루브릭, 그리고 때로는 판정자 역할을 하는 모델을 통해 수행됩니다. 두 가지 유형이 있으며, 둘 다 필요합니다.

- **출력 평가** — 최종 결과물을 판정합니다. 코드가 컴파일됩니까? 테스트가 통과됩니까? 요약이 정확합니까?
- **궤적 평가** — *어떻게 도달했는지*를 판정합니다. 에이전트가 적절한 순서로 올바른 도구를 호출했습니까, 아니면 우연히 통과 결과를 얻었습니까?

궤적은 보이는 것보다 훨씬 중요합니다. 검증 단계를 건너뛰고 나온 유창한 출력은 명백한 오류가 있는 출력보다 *더* 위험합니다. 위험을 숨기기 때문입니다. 테스트 스위트를 무시하면서 우연히 올바른 코드를 만들어낸 에이전트는 결국 같은 방식으로 잘못된 코드를 만들어낼 것입니다.

## 구체적인 평가 루브릭

문서에서 질문에 답변하는 에이전트에 대한 평가 세트는 케이스 목록과 루브릭으로 구성됩니다.

```yaml
- question: "How do I rotate an API key?"
  must_mention: ["settings page", "revoke old key", "24h grace period"]
  must_not: ["email support"]   # we have self-serve rotation now
  tool_path: ["search_docs"]    # should retrieve, not answer from memory

- question: "What's the refund window?"
  must_mention: ["30 days"]
  tool_path: ["search_docs"]
```

각 실행마다 점수를 매깁니다. 필수 사실을 언급했습니까, 금지된 내용을 피했습니까, 예상 도구 경로를 따랐습니까? 모델 판정자는 여러분이 작성한 루브릭을 기준으로 "이 답변이 명확하고 정확한가"라는 더 유연한 차원을 평가할 수 있습니다. 핵심은 "좋음"이 이제 명시적으로 정의되고 자동으로 검사된다는 것입니다. 눈으로 대충 확인하는 것이 아닙니다.

## 품질 플라이휠

테스트와 평가는 복리처럼 쌓이는 루프에 연결될 때 진정한 가치를 발휘합니다.

1. **평가** — 벤치마크 스위트에 대해 평가합니다.
2. **진단** — 개별 실패를 수정하는 것이 아니라 근본 원인으로 클러스터링하여 실패를 진단합니다.
3. **최적화** — 클러스터의 원인이 된 프롬프트, 규칙, 또는 도구를 최적화합니다.
4. **검증** — 수정 사항이 유지되도록 회귀 스위트에 대해 검증합니다.
5. **모니터링** — 새로운 실패 패턴을 찾기 위해 프로덕션 트래픽을 모니터링하고, 이를 1단계로 피드백합니다.

이 루프를 한 번 돌릴 때마다 다음 루프는 더 높은 기준선에서 시작됩니다. 이것이 모델 자체를 변경하지 않고도 에이전트가 시간이 지남에 따라 안정적으로 개선되는 방법입니다.

## 자신만의 워크플로우 구성하기

- [ ] 다음 기능 개발 시, 에이전트가 코드를 생성하기 전에 먼저 테스트를 작성하십시오.
- [ ] 관심 있는 에이전트 동작 하나에 대해 소규모 평가 세트를 구축하십시오. 열 개의 케이스만으로도 충분합니다.
- [ ] 각 평가 케이스에 대해 출력이 반드시 포함해야 할 내용과 예상 도구 경로를 모두 정의하십시오.
- [ ] 모든 수정 사항을 재실행하는 회귀 스위트를 추가하십시오.
- [ ] 이번 주 프로덕션 실패 하나를 골라 근본 원인 클러스터를 찾고, 증상이 아닌 원인을 수정하십시오.
