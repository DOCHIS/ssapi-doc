# pollng

## 채팅 내역 파싱

<mark style="color:green;">`GET`</mark> `/chats/polling`

채팅 내역을 파싱합니다.

**Headers**

| Name          | Value             |
| ------------- | ----------------- |
| Authorization | `Bearer` \<API 키> |

**Body**

| Name     | Type   | Description                                                                          |
| -------- | ------ | ------------------------------------------------------------------------------------ |
| `cursor` | string | <p><strong>마지막 데이터의 커서</strong><br>미입력 시 최근 데이터를 반환</p>                              |
| `limit`  | number | <p><strong>한번에 가져올 값</strong><br>기본값 : <code>50</code><br>최대값 : <code>100</code></p> |



**Response**

**반환되는 데이터의 스키마는** [**↓ chat** ](../../socket/api/chat.md)**문서를 확인해주세요.**

{% tabs %}
{% tab title="성공시" %}
model<[polling(REST API)](../../extended-model/polling-rest-api.md)>

```json
{
    "error": 0,
    "currentCursor": "",
    "nextCursor": "661a8d9bfb9e4fcf048c86c3",
    "result": [
        {
            "_id": "661a8d99fb9e4fcf048c509d",
            "type": "chat",
            "platform": "soop",
            "streamer_id": "******",
            "message": "ㄹㅇ",
            "user_id": "******",
            "nickname": "******",
            "extras": {...},
            "createdAt": "2024-04-13T13:50:17.736Z",
            "ttl": "2025-04-13T13:50:17.736Z",
            "__v": 0
        }
    ],
    "length": 100
}
```
{% endtab %}

{% tab title="성공 (추가로 폴링할 데이터 없음)" %}
model<[polling(REST API)](../../extended-model/polling-rest-api.md)>

```json
{
    "error": 0,
    "currentCursor": "65f9a241e7b51a089cd95317",
    "nextCursor": null,
    "result": [],
    "length": 100
}
```
{% endtab %}

{% tab title="실패시" %}
```json
{
    "error": 400,
    "message": "인증정보가 없습니다. (apikey)",
    "data": {}
}
```
{% endtab %}
{% endtabs %}





## 후원내역 파싱

<mark style="color:green;">`GET`</mark> `/donations/polling`

후원내역을 파싱합니다.

**Headers**

| Name          | Value             |
| ------------- | ----------------- |
| Authorization | `Bearer` \<API 키> |

**Body**

| Name     | Type   | Description                                                                          |
| -------- | ------ | ------------------------------------------------------------------------------------ |
| `cursor` | string | <p><strong>마지막 데이터의 커서</strong><br>미입력 시 최근 데이터를 반환</p>                              |
| `limit`  | number | <p><strong>한번에 가져올 값</strong><br>기본값 : <code>50</code><br>최대값 : <code>100</code></p> |



**Response**

**반환되는 데이터의 스키마는** [**↓ donation**](../../socket/api/donation.md) **문서를 확인해주세요.**

{% tabs %}
{% tab title="성공시" %}
model<[polling(REST API)](../../extended-model/polling-rest-api.md)>

```json
{
    "error": 0,
    "currentCursor": "",
    "nextCursor": "661a87e13bf01f419cc1ef54",
    "result": [
        {
            "_id": "661a87c43bf01f419cc0f120",
            "type": "donation",
            "streamer_id": "*****",
            "user_id": "*****",
            "nickname": "*****",
            "platform": "soop",
            "cnt": 1,
            "amount": 100,
            "message": "애드벌룬 1개 선물!",
            "extras": {...},
            "createdAt": "2024-04-13T13:25:24.913Z",
            "ttl": "2025-04-13T13:25:24.913Z",
            "__v": 0
        }
    ],
    "length": 50
}
```
{% endtab %}

{% tab title="성공 (추가로 폴링할 데이터 없음)" %}
model<[polling(REST API)](../../extended-model/polling-rest-api.md)>

```json
{
    "error": 0,
    "currentCursor": "65f9a241e7b51a089cd95317",
    "nextCursor": null,
    "result": [],
    "length": 100
}
```
{% endtab %}

{% tab title="실패시" %}
```json
{
    "error": 400,
    "message": "인증정보가 없습니다. (apikey)",
    "data": {}
}
```
{% endtab %}
{% endtabs %}



