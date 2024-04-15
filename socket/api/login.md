# ↑↓ login

## <mark style="color:green;">EVENT</mark>  login

소켓 서버 접속 후 가장 먼저 요청해야 하는 이벤트입니다.\
API키를 통해 소켓룸에 로그인할 수 있습니다.

**Request**

`TEXT` API 키



**Response**

{% tabs %}
{% tab title="예시" %}
model<[room](../../models/room.md)>

```json
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
{% endtab %}
{% endtabs %}
