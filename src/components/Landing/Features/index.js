// index.jsx
import React from "react";
import { Server, Zap, GitMerge, MonitorPlay } from "lucide-react";
import styles from "./styles.module.scss";

const FEATURES = [
  {
    title: "REST API를 통한 간편한 데이터 접근",
    description:
      "폴링 방식의 REST API로 채팅과 후원 데이터를 손쉽게 조회할 수 있습니다. 복잡한 소켓 연결 없이도 필요한 데이터를 빠르게 가져올 수 있어 간단한 프로젝트에 적합합니다.",
    icon: <Server />,
    stats: "안정적인 데이터 제공을 원한다면",
    details: [
      "간편한 HTTP 요청으로 데이터 조회",
      "페이지네이션 지원으로 효율적인 데이터 로드",
      "커서 기반 조회로 중복 없는 데이터 수신",
    ],
  },
  {
    title: "실시간 소켓 API",
    description:
      "Socket.IO 기반의 실시간 데이터 스트리밍으로 채팅과 후원 이벤트를 즉시 수신합니다. 데이터 압축과 최적화된 프로토콜로 네트워크 부하를 최소화했습니다.",
    icon: <Zap />,
    stats: "2ms 이내 초 지지연 API",
    details: [
      "자동 재연결 및 에러 복구",
      "선택적 이벤트 수신으로 대역폭 최적화",
      "Snappy 압축으로 데이터 전송량 감소",
    ],
  },
  {
    title: "통합 데이터 모델",
    description:
      "숲(아프리카)와 치지직의 서로 다른 데이터 구조를 일관된 형식으로 제공합니다. 플랫폼에 관계없이 동일한 방식으로 데이터를 처리할 수 있습니다.",
    icon: <GitMerge />,
    stats: "2개 플랫폼 지원",
    details: [
      "플랫폼 독립적인 데이터 구조",
      "확장 가능한 JSON 스키마",
      "상세한 메타데이터 제공",
    ],
  },
  {
    title: "채팅 통계 API (제휴 전용)",
    description:
      "스트리머별 실시간 채팅 통계 데이터를 제공하는 특별한 API입니다. 채팅량, 시청자 참여도 등을 분석하여 방송 운영에 활용할 수 있습니다.",
    icon: <MonitorPlay />,
    stats: "실시간 통계 제공",
    details: [
      "5분 단위 채팅량 집계",
      "스트리머별 참여도 분석",
      "커스텀 기간 설정 지원",
    ],
  },
];

export default function Features() {
  return (
    <section className={styles.features}>
      <div className={styles.container}>
        <h2 className={styles.title}>API 종류</h2>
        {FEATURES.map((feature, idx) => (
          <div key={idx} className={styles.feature}>
            <div className={styles.icon}>{feature.icon}</div>
            <div className={styles.content}>
              <h3>{feature.title}</h3>
              <div className={styles.stats}>{feature.stats}</div>
              <p>{feature.description}</p>
              <ul className={styles.details}>
                {feature.details.map((detail, i) => (
                  <li key={i}>{detail}</li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
