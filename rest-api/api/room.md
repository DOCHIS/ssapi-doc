# room

## 룸 정보 조회

<mark style="color:green;">`GET`</mark> `/room`

소켓룸에 대한 정보를 반환합니다.

**Headers**

| Name          | Value              |
| ------------- | ------------------ |
| Authorization | `Bearer` \<API 키> |

**Body**

Body 스키마 없음

**Response**

{% tabs %}
{% tab title="성공시" %}
model<[room(REST API)](../../extended-model/room-rest-api.md)>

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

## 룸에 스트리머 등록

<mark style="color:orange;">`PUT`</mark> `/room/user`

소켓룸에 스트리머를 추가합니다.

**Headers**

| Name          | Value              |
| ------------- | ------------------ |
| Authorization | `Bearer` \<API 키> |

**Body**

| Name       | Type   | Description                                                                                                   |
| ---------- | ------ | ------------------------------------------------------------------------------------------------------------- |
| `platform` | string | <p>방송 플랫폼</p><p>지원되는 값 : <code>soop</code>, <code>chzzk</code></p>                                  |
| `user`     | string | <p>등록할 스트리머 아이디<br>- 치지직의 경우 채널 ID (<a href="../../extra-document/channel_id.md">?</a>)</p> |

**Response**

{% tabs %}
{% tab title="성공시" %}
model<[room(REST API)](../../extended-model/room-rest-api.md)>

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
  "createdAt": "2024-02-28T14:25:07.307Z",
  "updatedAt": "2024-02-28T14:25:07.307Z"
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

## 룸에서 스트리머 삭제

<mark style="color:red;">`DELETE`</mark> `/room/user`

소켓룸에 스트리머를 추가합니다.

**Headers**

| Name          | Value              |
| ------------- | ------------------ |
| Authorization | `Bearer` \<API 키> |

**Body**

| Name       | Type   | Description                                                                                                      |
| ---------- | ------ | ---------------------------------------------------------------------------------------------------------------- |
| `platform` | string | <p>방송 플랫폼</p><p>지원되는 값 : <code>soop</code></p>                                                         |
| `user`     | string | <p>등록할 스트리머 아이디</p><p>- 치지직의 경우 채널 ID (<a href="../../extra-document/channel_id.md">?</a>)</p> |

**Response**

{% tabs %}
{% tab title="성공시" %}
model<[room(REST API)](../../extended-model/room-rest-api.md)>

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
  "createdAt": "2024-02-28T14:25:07.307Z",
  "updatedAt": "2024-02-28T14:25:07.307Z"
}
```

{% endtab %}

{% tab title="실패시" %}

<pre class="language-json"><code class="lang-json"><strong>{
</strong>    "error": 400,
    "message": "인증정보가 없습니다. (apikey)",
    "data": {}
}
</code></pre>

{% endtab %}
{% endtabs %}
