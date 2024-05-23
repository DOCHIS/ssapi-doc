# chats

{% hint style="danger" %}
**이 API는 별도 제휴를 통해서만 제공되는 제휴 전용 API입니다.**\
일반 API에 비해 심사 요건이 매우 까다롭습니다.\
제휴를 하지 않은 경우 API 키가 있더라도 사용할 수 없습니다.
{% endhint %}



## 채팅 수 통계 데이터

<mark style="color:green;">`GET`</mark> /chats/summaries/streamers

스트리머 별 채팅수 데이터를 반환합니다.\
\
데이터는 reference\_time 시간을 기준으로 duration 만큼 이전 데이터 \~ reference\_time 까지의 채팅 수의 합계를 스트리머 별로 반환합니다.

예를 들면 reference\_time 를 오후 2시 00으로 지정 후 duration 를 5분을 지정하면 오후 1시 55분\~오후 2시까지의 채팅수 합계를 반환하게 됩니다.\


**Headers**

| Name          | Value             |
| ------------- | ----------------- |
| Authorization | `Bearer` \<API 키> |

**Body**

<table><thead><tr><th>Name</th><th width="153">Type</th><th>Description</th></tr></thead><tbody><tr><td><code>reference_time</code></td><td>string<br>( ISO 8601 형식)</td><td><p>데이터를 불러올 기준 시간입니다.</p><p></p><p><code>예시) 2024-06-01T12:00:00Z</code></p><p></p><p>주의) <a href="../../more/policy_data.md">데이터보관주기</a>가 경과된 데이터는 삭제하므로 제공되지 않습니다.</p></td></tr><tr><td><code>duration</code></td><td>number</td><td>데이터를 불러올 기간입니다.<br>(단위 : 초)<br><code>최소 : 30초</code><br><code>최대 : 3600초 (1시간)</code></td></tr></tbody></table>



**Response**

{% tabs %}
{% tab title="성공시" %}
```json
{
    "error": 0,
    "summaries": {
        "soop": {
            "bj_a": 0,
            "bj_a": 500,
            "bj_a": 1240
        ],
        "chzzk": {
            "streamer_a": 0,
            "streamer_a": 500,
            "streamer_a": 1240
        }
    },
    "reference": {
       "IOS8601": {
            "start": "2024-05-22T15:37:00.000Z",
            "end": "2024-05-22T15:42:00.000Z"
        },
        "KST": {
            "start": "2024. 5. 23. 오전 12:37:00",
            "end": "2024. 5. 23. 오전 12:42:00"
        }
    },
    "duration": 300,
    "total": {
        "streamer": 2346,
        "chat": 86904
    }
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



