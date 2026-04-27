---
sidebar_position: 100
---

# ↕ getRoomInfo

현재 연결된 소켓 룸의 정보를 요청하는 이벤트입니다.

## Request

getRoomInfo 이벤트는 별도의 데이터 전송이 필요하지 않습니다.

## Response

getRoomInfo 요청에 대한 응답은 `roomInfo` 이벤트로 전달됩니다.

### Response Fields

응답 스키마는 [Room 스키마](/docs/schemas/room)를 참고하세요.

### Example Response

```json
{
  "id": "test",
  "users": [
    {
      "platform": "soop",
      "streamer_id": "*****",
      "created_at": "2024-09-20T21:47:32.449Z"
    },
    {
      "platform": "soop",
      "streamer_id": "*****",
      "created_at": "2024-10-31T02:54:06.466Z"
    }
  ],
  "users_limit": 500,
  "category": "minecraft",
  "mission": {
    "hook_timings": ["receive", "settle", "result"],
    "updatedAt": "2026-04-27T07:41:33.000Z"
  },
  "createdAt": "2024-09-20T08:41:53.561Z",
  "updatedAt": "2024-09-20T08:41:53.561Z"
}
```

:::tip mission 서브도큐먼트 (v2.0+)
대시보드 → 신청서 → **🎯 미션 설정** 에서 변경한 값이 동봉됩니다.
- `hook_timings`: 받을 phase 배열 (`receive` / `settle` / `result`)

미션 자체는 항상 활성이며, 사용자는 받을 phase 만 선택합니다. 서버는 이 값으로 [`mission`](./mission) 이벤트의 phase 게이트를 수행합니다. 클라이언트도 받은 페이로드의 `mission_settings` 필드로 한 번 더 검사하면 race-free.
:::
