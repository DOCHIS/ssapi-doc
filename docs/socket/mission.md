---
sidebar_position: 110
---

# ↓ mission

미션 데이터를 반환하는 리스너입니다 (v2.0+). SOOP 의 도전미션·대결미션과 치지직의 MISSION/MISSION_PARTICIPATION 후원이 통합 스키마로 들어옵니다.

플랫폼 차이는 서버에서 흡수되므로 클라이언트는 `platform` 분기 없이 동일한 페이로드 처리가 가능합니다.

## 활성화

미션 이벤트를 받으려면:

1. [SSAPI 대시보드](https://ssapi.kr/app)의 신청서 → **🎯 미션 설정** 페이지에서 활성화
2. 받을 시점(phase) 선택: `receive` / `settle` / `result`
3. `setReceiver` 에 `mission` 포함하여 emit

```javascript
socket.emit("setReceiver", "login,donation,status,mission");
```

## 시점 (mission_phase)

| phase | 의미 | SOOP 매핑 | Chzzk 매핑 |
|-------|------|-----------|------------|
| `receive` | 미션 후원 한 건 | `CHALLENGE_GIFT`, `GIFT` | `MISSION (PENDING)`, `MISSION_PARTICIPATION (APPROVED)` |
| `settle` | 미션 정산 (총합 + 후원자 명단) | `CHALLENGE_SETTLE`, `SETTLE` | 서버측 합성 (utility-chzzk-settle-synthesizer) |
| `result` | 미션 결과 메타 (성공/실패/무승부) | `CHALLENGE_NOTICE`, `NOTICE` | 서버측 합성 |

기본값은 `["settle"]` 입니다 — 정산 시점만 받기.

## Response

```typescript
{
  type: "mission",
  platform: "soop" | "chzzk",
  streamer_id: string,
  mission_type: string,            // 원본 mission_type
  mission_phase: "receive" | "settle" | "result",
  mission_settings: {              // 게이트에 사용된 설정 동봉
    hook_timings: string[],
    updatedAt: string
  },
  key: string,                     // mission_key (String 통일, v2.0)
  title: string,
  cnt: number,
  amount: number,                  // KRW

  // settle phase 만:
  settle?: {
    total_amount: number,
    total_cnt: number,
    donor_count: number,
    streamers: string[],            // 대결미션이면 양쪽
    donors: Array<{
      user_id: string,
      nickname: string,
      amount: number,
      cnt: number,
      createdAt: string,
      extras: object
    }>,
    donors_truncated: boolean       // 5000 명 초과 시 true
  },

  // result phase 만:
  result?: {
    mission_status: "SUCCESS" | "FAILURE" | "DRAW",
    winner: string,
    loser: string,
    rank: number,
    draw: boolean,
    my_team_name: string
  },

  extras: {
    soop?: { typeName, typeNum, raw, ... },
    chzzk?: { donationType, status, kind, ... }
  }
}
```

## 동시 다중 미션

한 스트리머가 여러 미션을 동시에 진행하면 각 `mission_key` 별로 독립 emit. settle aggregation 도 mission_key 단위로 그룹화 — A 미션 후원이 B 미션 settle 에 섞이지 않습니다.

## 페이로드 크기

`donors[]` 는 환경변수 `MISSION_SETTLE_DONOR_CAP` (기본 5000) 으로 제한. 초과 시 `donors_truncated: true` 플래그.

Snappy 압축 후 일반적으로 1만 후원자 = 약 500KB.

## 클라이언트 게이트 (이중 검증 권장)

서버는 `room.mission.hook_timings` 로 1차 게이트하지만, 클라이언트도 한 번 더 검사 권장 (네트워크 race 보호). [Minecraft 플러그인 v2](https://github.com/dochis/SSAPI-Minecraft) 는 `MissionSettings` 스냅샷으로 atomic 확인합니다.
