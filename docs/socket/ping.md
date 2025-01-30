---
sidebar_position: 5
---

# ↑ ping

소켓 연결을 유지하기 위한 ping 이벤트입니다. 1분에 한 번씩 전송하는 것을 권장합니다.

## Request

ping 이벤트는 별도의 데이터 전송이 필요하지 않습니다.

## Response

ping 요청에 대한 응답은 `pong` 이벤트로 전달됩니다.
`pong` 이벤트는 서버에서 자동으로 응답하는 이벤트이므로 별도로 구현할 필요가 없습니다.

서버측 시간이 필요한 경우 응답으로 전달되는 timestamp 값을 확인할 수 있습니다.

### Response Fields

| 필드      | 타입   | 설명                   |
| --------- | ------ | ---------------------- |
| timestamp | string | 서버의 현재 타임스탬프 |

### Example Response

```
{
    "timestamp": "2025-01-30 22:32:19.327"
}
```
