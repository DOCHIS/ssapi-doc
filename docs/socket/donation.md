---
sidebar_position: 5
---

# ↓ donation

후원 데이터를 반환하는 리스너입니다. 별풍선 등의 후원정보가 donation 리스너를 통해 제공됩니다.
만약 특정 후원 타입만 사용을 원하실 경우 extras 필드를 통해 제공되는 typeName을 기준으로 필터링 하셔야 합니다.

## 지원되는 후원종류

아래 표시되지 않은 도전미션/대결미션 등은 아직 지원되지 않습니다.

| 플랫폼     | 후원종류            |
| ---------- | ------------------- |
| 아프리카TV | 별풍선              |
| 아프리카TV | VOD 별풍선          |
| 아프리카TV | 애드벌룬            |
| 아프리카TV | VOD애드벌룬         |
| 아프리카TV | 방송국 애드벌룬     |
| 치지직     | 채팅방 내 치즈 후원 |

## Response

[Donation 스키마](/docs/schemas/donation)를 참고하세요.

### Response Fields

| 필드        | 타입   | 설명          |
| ----------- | ------ | ------------- |
| \_id        | string | 후원 고유 ID  |
| platform    | string | 플랫폼        |
| type        | string | 후원 타입     |
| streamer_id | string | 스트리머 ID   |
| user_id     | string | 후원자 ID     |
| nickname    | string | 후원자 닉네임 |
| cnt         | number | 후원 수량     |
| message     | string | 후원 메시지   |
| amount      | number | 후원 금액     |
| extras      | object | 추가 정보     |

### Example Response

```
{
  "_id": "661a997508d233b41860fb90",
  "platform": "soop",
  "type": "donation",
  "streamer_id": "string",
  "user_id": "string",
  "nickname": "string",
  "cnt": 50,
  "message": "",
  "amount": 5000,
  "extras": {...}
}
```
