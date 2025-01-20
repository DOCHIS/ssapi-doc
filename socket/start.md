# 시작하기

## 1. 소켓 프로토콜

소켓 서비스는 `Socket.IO` 프로토콜 `4.7.4` 버전을 통해 제공됩니다

`Socket.IO`는 다양한 언어와 플랫폼에서 낮은 지연속도 `Scalable`한 소켓 서비스를 구축할 수 있도록 해주는 인기 있는 프로토콜입니다.

일반적인 표준 소켓 프로토콜과는 다르기 때문에 호환되는 클라이언트를 사용하셔야 합니다.

하지만 인기 있는 프로토콜인 만큼 대부분의 언어와 플랫폼에서 클라이언트가 SDK 형태로 제공됩니다.

주의하실 점은 `Socket.IO`이 서버 버전인 `4.x`와 호환되는 클라이언트 버전을 사용하셔야 합니다. 클라이언트 버전을 확인 시 `4.x` 버전이 지원되는지 꼭 확인하시길 바랍니다.

공식 지원되는 클라이언트도 있지만 일부 언어의 경우 서드파티 형태로 제공되는 클라이언트도 있습니다.

## 2. 소켓 사용 절차

- Step. 1 소켓 접속
  - `Socket.IO`클라이언트를 이용하여 소켓에 접근합니다.
- Step 2. 로그인
  - 발행 된 API키를 이용해 소켓에 로그인 합니다.
- 로그인 절차가 완료되면 원하시는 데이터를 `Event Listener`를 통해 수신할 수 있습니다

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

```html
<!DOCTYPE html>
<html>
  <head>
    <!-- 소켓 통신 라이브러리 -->
    <script
      src="https://cdn.socket.io/4.6.0/socket.io.min.js"
      integrity="sha384-c79GN5VsunZvi+Q/WObgk2in0CbZsHnjEqvFxC5DxHn9lTfNce2WW6h2pH6u/kF+"
      crossorigin="anonymous"
    ></script>

    <!-- Snappy 압축 해제 라이브러리 -->
    <script src="https://cdn.ssapi.kr/service/snappyjs.min.js"></script>
  </head>

  <body>
    <script>
      // Snappy 초기화
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

      // 메시지 수신 및 압축 해제
      socket.on("chat", (compressedData) => {
        try {
          // 수신된 데이터 압축 해제
          const decompressedData = SnappyJS.uncompress(compressedData);

          // 압축 해제된 데이터 JSON으로 파싱
          const data = JSON.parse(new TextDecoder().decode(decompressedData));

          console.log("수신된 압축 해제 메시지", data);
        } catch (error) {
          console.error("메시지 압축 해제 중 오류:", error);
        }
      });

      // 후원 데이터 수신 및 압축 해제
      socket.on("donation", (compressedData) => {
        try {
          // 수신된 데이터 압축 해제
          const decompressedData = SnappyJS.uncompress(compressedData);

          // 압축 해제된 데이터 JSON으로 파싱
          const data = JSON.parse(new TextDecoder().decode(decompressedData));

          console.log("수신된 압축 해제 후원 데이터", data);
        } catch (error) {
          console.error("후원 데이터 압축 해제 중 오류:", error);
        }
      });
    </script>
  </body>
</html>
```

{% endtab %}

{% tab title="Note.Js" %}

```javascript
const io = require("socket.io-client");
const { uncompressSync } = require("snappy");

// 소켓 연결 설정
const socket = io("https://socket.ssapi.kr", {
  transports: ["websocket"],
  timeout: 5000,
});

// 소켓 연결 성공 시 이벤트
socket.on("connect", () => {
  console.log("소켓 연결 성공");
  socket.emit("login", "<API KEY 입력>");
});

// 소켓 연결 해제 시 이벤트
socket.on("disconnect", (reason) => {
  console.error("소켓 연결 끊김", reason);
});

// 채팅 메시지 수신 및 압축 해제
socket.on("chat", (compressedData) => {
  try {
    // 수신된 데이터 압축 해제
    const decompressedData = uncompressSync(compressedData);

    // 압축 해제된 데이터 JSON으로 파싱
    const data = JSON.parse(decompressedData.toString());

    console.log("수신된 압축 해제 메시지", data);
  } catch (error) {
    console.error("메시지 압축 해제 중 오류:", error);
  }
});

// 후원 데이터 수신 및 압축 해제
socket.on("donation", (compressedData) => {
  try {
    // 수신된 데이터 압축 해제
    const decompressedData = uncompressSync(compressedData);

    // 압축 해제된 데이터 JSON으로 파싱
    const data = JSON.parse(decompressedData.toString());

    console.log("수신된 압축 해제 후원 데이터", data);
  } catch (error) {
    console.error("후원 데이터 압축 해제 중 오류:", error);
  }
});
```

{% endtab %}

{% tab title="JAVA" %}

```java
import io.socket.client.IO;
import io.socket.client.Socket;
import io.socket.emitter.Emitter;
import org.json.JSONObject;
import org.xerial.snappy.Snappy;

import java.nio.charset.StandardCharsets;

public class SocketExample {
    public static void main(String[] args) {
        try {
            // 소켓 연결 옵션 설정
            IO.Options options = new IO.Options();
            options.transports = new String[]{"websocket"};
            options.timeout = 5000; // 5초

            Socket socket = IO.socket("https://socket.ssapi.kr", options);

            // 소켓 연결 시 이벤트 핸들러
            socket.on(Socket.EVENT_CONNECT, args1 -> {
                System.out.println("소켓 연결 성공");
                socket.emit("login", "<API KEY 입력>");
            });

            // 소켓 연결 해제 시 이벤트 핸들러
            socket.on(Socket.EVENT_DISCONNECT, args12 -> {
                String reason = args12[0].toString();
                System.err.println("소켓 연결 끊김: " + reason);
            });

            // 채팅 메시지 수신 및 압축 해제
            socket.on("chat", args13 -> {
                try {
                    // 압축된 데이터 문자열로 압축 해제
                    byte[] compressed = (byte[]) args13[0];
                    String parsed = Snappy.uncompressString(compressed);

                    // JSON 파싱
                    JSONObject jsonData = new JSONObject(parsed);

                    System.out.println("수신된 압축 해제 메시지: " + jsonData);
                } catch (Exception e) {
                    System.err.println("메시지 압축 해제 중 오류: " + e.getMessage());
                }
            });

            // 후원 데이터 수신 및 압축 해제
            socket.on("donation", args14 -> {
                try {
                    // 압축된 데이터 문자열로 압축 해제
                    byte[] compressed = (byte[]) args14[0];
                    String parsed = Snappy.uncompressString(compressed);

                    // JSON 파싱
                    JSONObject jsonData = new JSONObject(parsed);

                    System.out.println("수신된 압축 해제 후원 데이터: " + jsonData);
                } catch (Exception e) {
                    System.err.println("후원 데이터 압축 해제 중 오류: " + e.getMessage());
                }
            });

            // 소켓 연결
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
import snappy
import json

# 소켓 연결 클라이언트 생성
sio = socketio.Client()

# 소켓 연결 이벤트
@sio.event
def connect():
    print("소켓 연결 성공")
    sio.emit("login", "<API KEY 입력>")

# 소켓 연결 해제 이벤트
@sio.event
def disconnect():
    print("소켓 연결 끊김")

# 채팅 메시지 수신 및 압축 해제
@sio.event
def chat(compressed_data):
    try:
        # Snappy로 압축 해제
        decompressed_data = snappy.decompress(compressed_data)

        # 압축 해제된 데이터를 JSON으로 파싱
        data = json.loads(decompressed_data.decode('utf-8'))

        print("수신된 압축 해제 메시지:", data)
    except Exception as e:
        print("메시지 압축 해제 중 오류:", e)

# 후원 데이터 수신 및 압축 해제
@sio.event
def donation(compressed_data):
    try:
        # Snappy로 압축 해제
        decompressed_data = snappy.decompress(compressed_data)

        # 압축 해제된 데이터를 JSON으로 파싱
        data = json.loads(decompressed_data.decode('utf-8'))

        print("수신된 압축 해제 후원 데이터:", data)
    except Exception as e:
        print("후원 데이터 압축 해제 중 오류:", e)

# 소켓 연결
sio.connect("https://socket.ssapi.kr", transports=["websocket"], timeout=5)
```

{% endtab %}
{% endtabs %}

## 5. 소켓 응답 데이터 안내

{% hint style="danger" %}
**중요 안내 사항**

소켓의 응답 데이터는 네트워크 대역폭 절약을 위해 압축하여 제공됩니다.
{% endhint %}

- 소켓의 요청 데이터는 자주 발생되지 않기 때문에 압축하지 않고 보내주셔도 됩니다.
- 하지만 응답 데이터는 수시로 발생되기도 하고 응답 데이터 자체의 용량이 크기 때문에 압축하여 제공되고 있습니다.
- 압축 데이터는 구글에서 개발한 압축 라이브러리인 `snappy`를 사용합니다.
- `snappy`는 압축률은 높진 않지만, 압축해제의 속도가 빨라서 체택하게 되었습니다. 초당 최대 2,000개의 채팅 통신이 발생할 수 있는 사양을 가지고 있는 만큼 압축률 보다는 속도를 충점적으로 확인하였습니다.
- 소켓 응답 데이터는 JSON으로 제공되므로 JSON 포켓을 `snappy`로 압축하여 제공되는 점 참고바랍니다.

## 6. Event 리스너 종류

위 예제에서 보면 "chat"과 같은 부분이 event 리스너 입니다\
이벤트 리스너를 사용한다고 해서 소켓에서 해당 이벤트의 데이터만 들어오는것은 아닙니다.

다만 이벤트 리스너는 소켓으로 들어오는 수 많은 종류의 데이터들을 좀 더 쉽고 빠르게 필터링 할 수 있도록 돕습니다.

현재 수집되고 있는 이벤트의 종류는 더 많지만 아직 지원되고 있는 이벤트의 종류는 일부밖에 되지 않습니다

이벤트 리스너의 종류와 반환되는 데이터에 대해 자세히 알고 싶으시다면 사양문서를 참고해주세요
