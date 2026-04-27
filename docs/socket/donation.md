---
sidebar_position: 100
---

# ↓ donation

후원 데이터를 반환하는 리스너입니다. 별풍선 등의 후원정보가 donation 리스너를 통해 제공됩니다.
만약 특정 후원 타입만 사용을 원하실 경우 extras 필드를 통해 제공되는 typeName을 기준으로 필터링 하셔야 합니다.

## 지원되는 후원종류

> 도전미션·대결미션은 v2.0 부터 [`mission` 리스너](./mission) 로 분리되어 들어옵니다.

| 플랫폼 | 후원종류 | typeName / donationType | 비고 |
| ------ | -------- | ----------------------- | ---- |
| 숲     | 별풍선                  | `SVC_SENDBALLOON` (18) | |
| 숲     | 영상 풍선               | `SVC_VIDEOBALLOON` (105) | v2.0 신규 |
| 숲     | 애드벌룬                | `SVC_ADCON_EFFECT` (87) | |
| 치지직 | 채팅방 내 치즈 후원     | `donationType: CHAT` | |
| 치지직 | 영상 후원               | `donationType: VIDEO` | `extras.chzzk.donationType` 로 구분 |
| 치지직 | 파티 후원               | `donationType: PARTY` | `extras.chzzk.donationType` 로 구분 |

> v2.0 범위 밖 SOOP 타입 (구독자 별풍선/슈퍼챗/영상 풍선 링크/스티커/구독/OGQ 등) 은 `LOG_RAW_UNHANDLED=true` env 캡처만 가능하며, 정식 지원은 추후 버전.

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
