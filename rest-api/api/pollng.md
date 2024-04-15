# pollng

## 소개

{% hint style="warning" %}
**요약**\
몇 가지 이유로 이 API가 아닌 Socket API를 통해 데이터를 파싱 하시는 것을 권장합니다
{% endhint %}

폴링 API는 소켓을 통해 데이터 통신을 원하지 않으시는 개발자분을 위해 제작되었습니다.\
\
폴링 API는  DB를  통해 제공됩니다.

하지만 서버 과부하 상황에서는 DB에 기록하는 작업보단 소켓으로 데이터를 뿌리는  것을 우선하는 시스템의 로직 상 과부하 상황에서는 폴링 API에 누락이 발생할 가능성이 높다는 점을 유의해야 합니다.



또 폴링 API는 소켓에 비해 더 많은 네트워크 대역을 사용하기 때문에 대규모 서버에는 적합하지 않을 수 있습니다.



## 채팅 내역 파싱

<mark style="color:green;">`GET`</mark> `/polling/chat`

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

<mark style="color:green;">`GET`</mark> `/polling/donation`

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



