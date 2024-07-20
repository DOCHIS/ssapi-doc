# 시작하기

## 1. 이건 어디 쓰는 API인가요?

채팅과 후원 등의 주요 데이터는 SOCKET을 통해 제공되지만, 소켓을 컨트롤 할 때, 소켓으로 들어왔던 데이터를 폴링할 때 REST API를 사용할 수 있습니다



주요한 역할은 소켓룸에 스트리머를 등록/삭제 할 때 사용할 수 있습니다



## **2. API 서버 주소**

{% hint style="info" %}
**API 서버 주소**\
https://api.ssapi.kr
{% endhint %}



## 3. 요청값 형식

Body는 GET 메소드일 경우 Query String으로,\
그 이외의 메소드일 경우 Raw Data (JSON)으로 전송해주시면 됩니다.

