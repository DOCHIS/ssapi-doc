# 시작하기



## 1. 소켓 프로토콜

소켓 서비스는 `Socket.IO` 프로토콜 `4.7.4` 버전을 통해 제공됩니다

`Socket.IO`는 다양한 언어와 플랫폼에서 낮은 지연속도 `Scalable`한 소켓 서비스를 구축할 수 있도록 해주는 인기 있는 프로토콜입니다.

일반적인 표준 소켓 프로토콜과는 다르기 때문에 호환되는 클라이언트를 사용하셔야 합니다.

하지만 인기 있는 프로토콜인 만큼 대부분의 언어와 플랫폼에서 클라이언트가 SDK 형태로 제공됩니다.

주의하실 점은 `Socket.IO`이 서버 버전인 `4.x`와 호환되는 클라이언트 버전을 사용하셔야 합니다. 클라이언트 버전을 확인 시 `4.x` 버전이 지원되는지 꼭 확인하시길 바랍니다.

공식 지원되는 클라이언트도 있지만 일부 언어의 경우 서드파티 형태로 제공되는 클라이언트도 있습니다.





## 2. 소켓 사용 절차

* Step. 1 소켓 접속
  * `Socket.IO`클라이언트를 이용하여 소켓에 접근합니다.
* Step 2. 로그인
  * 발행 된 API키를 이용해 소켓에 로그인 합니다.
* 로그인 절차가 완료되면 원하시는 데이터를 `Event Listener`를 통해 수신할 수 있습니다





## 3. 소켓 접속 주소

소켓의 접속방법은 각 언어별 차이가 있으나,일반적으로 아래와 같은 방식으로 접속하게 됩니다

소켓 접속을 위한 클라이언트는 편의에 따라 원하는 클라이언트를 선택해주세요

{% hint style="info" %}
**소켓 서버 주소**\
https://socket.ssapi.kr
{% endhint %}



## 4. 소켓 접속 및 로그인 예제

아래는 각 언어 별 예제입니다.

{% tabs %}
{% tab title="Javascript (HTML)" %}
````html
```html
<!DOCTYPE HTML>
<html>
<head>
  <!-- ... 생략 ... -->
  <script src="https://cdn.socket.io/4.6.0/socket.io.min.js" integrity="sha384-c79GN5VsunZvi+Q/WObgk2in0CbZsHnjEqvFxC5DxHn9lTfNce2WW6h2pH6u/kF+" crossorigin="anonymous"></script>
</head>

<body>
  <script>
  const socket = io("https://socket.ssapi.kr", {
    transports: ["websocket"],
    timeout: 5000,
  });

  // 소켓 연결
  socket.on("connect", () => {
    console.log("소켓 연결 성공");
    socket.emit("login", "<API KEY 입력>");
  });

  // 소켓 연결 끊김
  socket.on("disconnect", (reason) => {
    console.error("소켓 연결 끊김", reason);
  });

  // 메시지 수신
  socket.on("chat", (data) => {
    console.log("메시지 수신", data);
  });
  </script>
</body>
</html>
```
````
{% endtab %}

{% tab title="Note.Js" %}
```javascript
const io = require("socket.io-client");

const socket = io("https://socket.ssapi.kr", {
  transports: ["websocket"],
  timeout: 5000,
});

// Socket connection
socket.on("connect", () => {
  console.log("Socket connection successful");
  socket.emit("login", "<API KEY 입력>");
});

// Socket disconnection
socket.on("disconnect", (reason) => {
  console.error("Socket connection disconnected", reason);
});

// Receive messages
socket.on("chat", (data) => {
  console.log("Received message", data);
});
```
{% endtab %}

{% tab title="JAVA" %}
```java
import io.socket.client.IO;
import io.socket.client.Socket;
import io.socket.emitter.Emitter;
import org.json.JSONObject;

public class SocketExample {
    public static void main(String[] args) {
        try {
            // Setup the socket connection
            IO.Options options = new IO.Options();
            options.transports = new String[]{"websocket"};
            options.timeout = 5000; // 5 seconds

            Socket socket = IO.socket("https://socket.ssapi.kr", options);

            // Handle socket connection
            socket.on(Socket.EVENT_CONNECT, args1 -> {
                System.out.println("Socket connection successful");
                socket.emit("login", "<API KEY 입력>");
            });

            // Handle socket disconnection
            socket.on(Socket.EVENT_DISCONNECT, args12 -> {
                String reason = args12[0].toString();
                System.err.println("Socket connection disconnected: " + reason);
            });

            // Receive messages
            socket.on("chat", args13 -> {
                String data = args13[0].toString();
                System.out.println("Received message: " + data);
            });

            // Connect to the socket
            socket.connect();

        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}

```
{% endtab %}

{% tab title="Python" %}
```python
import socketio

# Socket connection
sio = socketio.Client()
@sio.event
def connect():
  print("Socket connection successful")
  sio.emit("login", "<API KEY 입력>")

# Socket disconnection
@sio.event
def disconnect():
  print("Socket connection disconnected")

# Receive messages
@sio.event
def chat(data):
  print("Received message", data)

sio.connect("https://socket.ssapi.kr", transports=["websocket"], timeout=5)
```
{% endtab %}
{% endtabs %}



## 5. 소켓 응답 데이터 안내

{% hint style="danger" %}
**중요 안내 사항**

소켓의 응답 데이터는 네트워크 대역폭 절약을 위해 압축하여 제공됩니다.
{% endhint %}

* 소켓의 요청 데이터는 자주 발생되지 않기 때문에 압축하지 않고 보내주셔도 됩니다.
* 하지만 응답 데이터는 수시로 발생되기도 하고 응답 데이터 자체의 용량이 크기 때문에 압축하여 제공되고 있습니다.
* 압축 데이터는 구글에서 개발한 압축 라이브러리인 `snappy`를 사용합니다.
* `snappy`는 압축률은 높진 않지만, 압축해제의 속도가 빨라서 체택하게 되었습니다. 초당 최대 2,000개의 채팅 통신이 발생할 수 있는 사양을 가지고 있는 만큼 압축률 보다는 속도를 충점적으로 확인하였습니다.
* 소켓 응답 데이터는 JSON으로 제공되므로 JSON 포켓을 `snappy`로 압축하여 제공되는 점 참고바랍니다.





## 6.  Event 리스너 종류

위 예제에서 보면 "chat"과 같은 부분이 event 리스너 입니다\
이벤트 리스너를 사용한다고 해서 소켓에서 해당 이벤트의 데이터만 들어오는것은 아닙니다.

다만 이벤트 리스너는 소켓으로 들어오는 수 많은 종류의 데이터들을 좀 더 쉽고 빠르게 필터링 할 수 있도록 돕습니다.

현재 수집되고 있는 이벤트의 종류는 더 많지만 아직 지원되고 있는 이벤트의 종류는 일부밖에 되지 않습니다

이벤트 리스너의 종류와 반환되는 데이터에 대해 자세히 알고 싶으시다면 사양문서를 참고해주세요

