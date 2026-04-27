---
sidebar_position: 50
---

# ⚠️ 에러 코드 카탈로그

모든 SSAPI REST 응답은 **HTTP 200** 으로 반환되며, body 의 `error` 숫자와 `error_code` enum 으로 결과를 구분합니다.

```json
// 성공
{ "error": 0, ...data }

// 실패 (v2.0+)
{
  "error": 400,
  "error_code": "STREAMER_LIMIT_EXCEEDED",
  "message": "허용된 스트리머 수 초과",
  "data": {}
}
```

`error_code` 는 v2.0 에서 도입된 안정적 enum 입니다. 클라이언트는 사람이 읽는 `message` 가 아닌 **`error_code` 로 분기**하는 것을 권장합니다 (메시지 문구는 변경될 수 있음).

## 카탈로그

| HTTP | error_code | 발생 상황 | 클라이언트 권장 처리 |
|------|------------|----------|------------------|
| 400 | `INVALID_INPUT` | 필수 파라미터 누락 / 형식 오류 | 입력값 재확인 안내 |
| 400 | `STREAMER_LIMIT_EXCEEDED` | 등록 가능 스트리머 수 초과 | 슬롯 정리 안내 |
| 400 | `STREAMER_ALREADY_REGISTERED` | 이미 다른 사용자에 연동된 채널 | 기존 연동 해제 안내 |
| 400 | `STREAMER_UPPERCASE_FORBIDDEN` | 스트리머 ID 에 대문자 사용 | 소문자 입력 안내 |
| 400 | `STREAMER_SPECIAL_CHARS` | 스트리머 ID 에 특수문자 사용 | 영숫자·`_`·`-` 만 허용 안내 |
| 400 | `STREAMER_NOT_FOUND` | 외부 플랫폼에서 스트리머 정보 조회 실패 | ID 오타 확인 |
| 400 | `STREAMER_NOT_REGISTERED` | 등록되지 않은 스트리머 (제거 시) | 무시 또는 재등록 |
| 400 | `PLATFORM_INVALID` | 지원하지 않는 platform 값 | `soop` 또는 `chzzk` 만 허용 |
| 400 | `CURSOR_INVALID` | polling cursor 형식 오류 | cursor 재발급 |
| 400 | `DURATION_OUT_OF_RANGE` | summary duration 범위 초과 | 1초~1개월 범위 안내 |
| 400 | `REFERENCE_TIME_INVALID` | reference_time ISO8601 형식 오류 | ISO8601 형식 안내 |
| 400 | `RANGE_EXCEEDS_LIMIT` | 조회 기간 1개월 초과 | 기간 단축 안내 |
| 401 | `UNAUTHORIZED` | API 키 누락/유효하지 않음 | 키 재확인 / 재발급 |
| 403 | `FORBIDDEN` | 권한 부족 (예: alliance 권한 필요) | 권한 요청 안내 |
| 404 | `NOT_FOUND` | 리소스 없음 | 무시 또는 404 처리 |
| 500 | `INTERNAL` | 서버 내부 오류 | 재시도 + 운영팀 문의 |
| 503 | `DB_UNAVAILABLE` | DB 연결 실패 | 재시도 (지수 backoff) |

## 호환성

서버는 모든 에러 응답에 `error_code` 를 명시합니다. 매핑되지 않은 코드를 받았다면 클라이언트는 `message` 필드를 그대로 표시하는 fallback 으로 동작해야 합니다 (서버 v2.x → v2.x+1 사이의 신규 코드 호환).
