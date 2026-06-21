---
id: intro
title: 에이전틱 엔지니어링 워크플로
description: 즉흥적인 AI 프롬프팅에서 프로덕션 환경에서 신뢰할 수 있는 체계적인 워크플로로 전환하기 위한 8부작 실전 가이드입니다.
sidebar_position: 1
slug: /
keywords: [agentic engineering, AI workflow, software development, SDLC, vibe coding]
image: /img/og-image.png
---

<head>
  <script type="application/ld+json">
    {JSON.stringify({
      '@context': 'https://schema.org/',
      '@type': 'TechArticle',
      headline: '에이전틱 엔지니어링 워크플로',
      description: '즉흥적인 AI 프롬프팅에서 프로덕션 환경에서 신뢰할 수 있는 체계적인 워크플로로 전환하기 위한 8부작 실전 가이드입니다.',
      author: { '@type': 'Person', name: 'Oleksandr Derechei' },
      datePublished: '2026-06-18',
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': 'https://odere-pro.github.io/sdlc-factory-guide/',
      },
    })}
  </script>
</head>

# 에이전틱 엔지니어링 워크플로

즉흥적인 AI 프롬프팅에서 프로덕션 환경에서 신뢰할 수 있는 체계적인 워크플로로 전환하기 위한 8부작 실전 가이드입니다. 각 파트는 독립적으로 구성되어 있습니다. 읽고, 예제를 복사하여, 자신의 워크플로에 바로 적용할 수 있습니다.

여덟 파트를 관통하는 핵심 원칙은 다음과 같습니다. **실제 결과물은 더 이상 코드가 아니라 코드를 생산하는 시스템 그 자체입니다.** 모델은 해당 시스템의 작은 일부에 불과합니다. 그 주변에 구축하는 모든 것(규칙, 컨텍스트, 테스트, 리뷰, 관찰 가능성)이 결과물의 신뢰성을 결정합니다.

## 시리즈 구성

1. **[규칙 파일 설정](/rule-file)** — 새로운 팀원이 필요로 할 프로젝트 지식을 에이전트에게 제공합니다.
2. **[컨텍스트 엔지니어링](/context-engineering)** — 에이전트가 무엇을, 언제 볼지 제어합니다.
3. **[검증 체계 구축](/verification)** — AI와의 계약으로서 테스트와 평가를 활용합니다.
4. **[작업 실행](/running-the-work)** — 지휘자와 오케스트레이터의 차이, 그리고 에이전트가 일상 업무에서 차지하는 위치.
5. **[리뷰 및 배포](/review-and-ship)** — "올바르게 보이는" 결과물에 숨은 실패를 잡아냅니다.
6. **[비용 제어](/controlling-cost)** — 총 소유 비용과 모델 라우팅.
7. **[프로덕션 에이전트 배포](/production-agents)** — 프로토타입 스크립트에서 기반 인프라를 갖춘 제품으로.
8. **[팀 표준으로 정착](/team-standard)** — 하네스를 버전 관리하고, 평가로 게이팅하며, 판단력을 기준으로 채용합니다.

## 활용 방법

- **개인 개발자라면?** 1~6파트만으로도 일상 워크플로를 크게 개선할 수 있습니다. 1파트부터 시작하세요.
- **AI 제품을 개발 중이라면?** 7파트를 추가하세요.
- **팀을 이끌고 있다면?** 1~8파트 전체를, 특히 3, 5, 8파트에 비중을 두어 활용하세요.

---

출처: *The New SDLC With Vibe Coding* (Google) — https://www.kaggle.com/whitepaper-the-new-SDLC-with-vibe-coding
