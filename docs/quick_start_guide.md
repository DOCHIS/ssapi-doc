---
sidebar_position: 2
sidebar_label: 🚀 빠른 시작
---

# 🚀 빠른 시작

SSAPI를 5분 안에 시작하는 방법을 안내합니다.

## 1. API 키 발급

[SSAPI 대시보드 ↗](http://dashboard.ssapi.kr/)에서 회원가입 후 API 키를 신청합니다.

:::tip
마인크래프트 서버나 대규모 콘텐츠의 경우 무료로 제공될 수 있습니다. [이용 정책](/docs/additional-info/policy)을 확인하세요.
:::

## 2. 스트리머 등록

소켓룸에 스트리머를 등록하는 방법은 두 가지입니다.

### 대시보드 사용 (추천)

[관리자 대시보드 ↗](http://dashboard.ssapi.kr/)에서 간편하게 스트리머를 등록하고 관리할 수 있습니다.

- GUI 기반 직관적인 관리
- 스트리머 목록 확인
- 실시간 통계 확인

### REST API 사용

프로그래밍 방식으로 스트리머를 등록할 수 있습니다.

```bash
POST https://api.ssapi.kr/room/streamer
Content-Type: application/json
Authorization: Bearer YOUR_API_KEY

{
  "streamerId": "streamer_id",
  "platform": "afreeca"  # 또는 "chzzk"
}
```

[스트리머 등록 API 문서 →](/docs/rest-api/소켓룸에-스트리머-등록)

## 3. 데이터 수신

### Socket API (권장)

실시간 데이터 스트리밍으로 다수 스트리머의 데이터를 효율적으로 처리합니다.

```javascript
const io = require('socket.io-client');
const socket = io('https://socket.ssapi.kr');

// 로그인
socket.emit('login', { apiKey: 'YOUR_API_KEY' });

// 채팅 수신
socket.on('chat', (data) => {
  console.log(data);
});

// 후원 수신
socket.on('donation', (data) => {
  console.log(data);
});
```

[Socket API 상세 문서 →](/docs/socket/start)

### REST API

간단한 HTTP 요청으로 데이터를 조회합니다.

```bash
GET https://api.ssapi.kr/room/info
Authorization: Bearer YOUR_API_KEY
```

[REST API 상세 문서 →](/docs/rest-api/start)

## 마인크래프트 연동

마인크래프트 서버를 위한 전용 플러그인을 제공합니다.

1. [GitHub에서 플러그인 다운로드 ↗](https://github.com/DOCHIS/ssapi-minecraft/releases)
2. `plugins/` 폴더에 복사 후 서버 재시작
3. `config.yml`에 API 키 입력

[마인크래프트 플러그인 문서 ↗](https://github.com/DOCHIS/SSAPI-Minecraft/)

## 다음 단계

- [데이터 스키마](/docs/schemas) - API 응답 구조 확인
- [코드 예제](/docs/socket/examples) - 실제 구현 예제
- [참고 자료](/docs/additional) - 코드표 및 세부 정보
