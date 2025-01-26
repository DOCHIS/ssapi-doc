---
sidebar_position: 2
---

# 🚄 빠른 시작 가이드

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import Admonition from '@theme/Admonition';

<Admonition type="caution">
 가급적 문서 전체를 살펴보시는 것을 권장하지만, SSAPI를 빠르게 훑어보고 싶으신 분들을 위해 준비했습니다.
 
 빠르게 훑기 위해 음슴체를 사용합니다!
</Admonition>

## SSAPI 먼저 이해 시켜줘

### 🤔 SSAPI 뭐임?

숲/치지직의 후원과 채팅 데이터를 활용해 더 다양한 방송 콘텐츠를 제작하고, 스트리머들이 제작비를 충당할 수 있도록 돕는 API 서비스임.

### 🛠 SSAPI는 어떻게 동작함?

SSAPI의 API를 통해 스트리머를 등록하면 SSAPI 서버가 알아서 채팅을 따서 소켓과 REST API로 제공함. 이를 위해 서비스를 분산해두었음.

### 🤷 근데 이거 왜 써야함?

1~10명 정도 규모의 후원과 채팅 API를 사용하는건 사실 어렵진 않음. 하지만 SSAPI는 이런 장점이 있음:

- 다수의 스트리머가 참여하는 컨텐츠에서 빛을 냄. 100명당 겨우 2Mbps 정도의 인터넷 대역만을 사용할 정도로 최적화되어 있음
- 숲과 치지직을 하나의 API로 제공하고 문서화가 잘되어있어서 개발 시간을 줄일 수 있음

### 👥 이거 누가 씀?

게임/컨텐츠/대규모 마크섭 같은데서 많이 씀. 뷰어십, 포켓꾸, 힐링월드 같은 대형 서비스들이 이미 사용중임.

### 💰 유료임?

다수에게 재미있거나 유익한 서비스(예: 대형 마크섭, 다수가 즐기는 컨텐츠)는 무료로 제공함. 그 외에는 유료 정책으로 운영됨.

## API 키 발급받고 시작하기

### 🔑 API 키 발급

컨텐츠 개발자나 운영자만 신청 가능함. [문의하기 페이지](/docs/contact)를 통해 신청하면 됨.

### 📝 스트리머 등록하기

API를 사용하기 전에 먼저 소켓룸에 스트리머를 등록해야 함. REST API로 등록할 수 있음.

### 📊 데이터 받아보기

두 가지 방법으로 데이터를 받을 수 있음:

- Socket: 다수 스트리머 데이터를 효율적으로 받을 수 있음
- REST API: 간단하게 구현 가능하지만 트래픽이 더 많이 발생함

### 🎮 마인크래프트 서버용 플러그인

마인크래프트 서버에서 사용하실 분들은 미리 만들어둔 오픈소스 플러그인을 사용하실 수 있음:
[DOCHIS / ssapi-minecraft](https://github.com/DOCHIS/ssapi-minecraft)

## 자세히 알아보기

- [SSAPI의 원리와 구성](/docs/intro/api)
- [SSAPI를 사용해야 하는 이유](/docs/intro/why-use)
- [SSAPI와 함께하는 프로젝트](/docs/intro/projects)
- [가격 정책과 이용 정책](/docs/intro/policy)
- [REST API 시작하기](/docs/rest-api/start)
- [Socket API 시작하기](/docs/socket/start)

### 💬 문의하기

더 궁금한 점이 있다면 [문의하기](/docs/contact)로 연락주세요!
