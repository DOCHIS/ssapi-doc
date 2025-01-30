---
sidebar_position: 3
---

# ↕ Login

소켓 서버 접속 후 가장 먼저 요청해야 하는 이벤트입니다.
API키를 통해 소켓룸에 로그인할 수 있습니다.

## Request

`TEXT` API 키

## Response

[Room 스키마](/docs/schemas/room)를 참고하세요.

### Response Fields

| 필드        | 타입   | 설명                         |
| ----------- | ------ | ---------------------------- |
| error       | number | 에러 코드                    |
| id          | string | 소켓 ID                      |
| users       | array  | 연결된 스트리머 목록         |
| users_limit | number | 최대 연결 가능한 스트리머 수 |
| createdAt   | string | 생성 시간                    |
| updatedAt   | string | 업데이트 시간                |

### Example Response

```
{
    "error": 0,
    "id": "your socket id",
    "users": [
        {
            "platform": "soop",
            "streamer_id": "streamer_id"
        }
    ],
    "users_limit": 20,
    "createdAt": "2024-02-28T14:09:34.319Z",
    "updatedAt": "2024-02-28T14:09:34.319Z"
}
```
