---
sidebar_position: 4
---

# ↕ setReceiver

:::danger
login 후 사용해야 하는 이벤트입니다.
:::

:::caution
**이 이벤트는 필수로 사용해야하는 API가 아닙니다**

다만, 소켓룸에 연결 된 스트리머가 너무 많아서 채팅으로 인한 대역을 절약하고 싶으신 사용자분을 위해 제작 된 이벤트입니다.

소켓에 연결 된 스트리머가 너무 많아 채팅 소켓을 받지 않음으로써 네트워크 대역을 절약해야 하거나 클라이언트 환경이 네트워크 대역이 작아 절약이 필요한 경우 사용할 수 있습니다.
:::

어떤 소켓 데이터를 수신할 지 유무를 결정할 때 사용할 수 있습니다.

## Request

`TEXT` donation

`TEXT` login,setReceiver,donation,etc

:::info
수신을 원하시는 Event 리스너의 이름을 콤마로 구분하여 입력하세요.
셋팅을 하지 않으실 경우 기본값은 전체를 모두 보내는 설정이 기본값 입니다.
:::

## Response

setReceiver 요청에 대한 응답은 `receiver` 이벤트로 전달됩니다.

### Response Fields

| 필드     | 타입  | 설명                                        |
| -------- | ----- | ------------------------------------------- |
| receiver | array | **수신 할 리시버 종류**<br/>전체: `["ALL"]` |

### Example Response

```json
{
  "receiver": ["ALL"]
}
```
