---
sidebar_position: 100
---

# ↓ chat

채팅 데이터를 반환하는 리스너입니다.

## Response

[Chat 스키마](/docs/schemas/chat)를 참고하세요.

### Response Fields

| 필드        | 타입   | 설명           |
| ----------- | ------ | -------------- |
| \_id        | string | 메시지 고유 ID |
| platform    | string | 플랫폼         |
| type        | string | 메시지 타입    |
| user_id     | string | 사용자 ID      |
| nickname    | string | 닉네임         |
| streamer_id | string | 스트리머 ID    |
| message     | string | 채팅 메시지    |
| extras      | object | 추가 정보      |

### Example Response

```
{
    "_id":"661a964ffb9e4fcf04b83d8b"
    "platform":"soop",
    "type":"chat",
    "user_id":"*****",
    "nickname":"*****",
    "streamer_id":"*****",
    "message":"*****",
    "extras":{...}
}
```
