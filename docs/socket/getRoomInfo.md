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
  "createdAt": "2024-09-20T08:41:53.561Z",
  "updatedAt": "2024-09-20T08:41:53.561Z"
}
```
