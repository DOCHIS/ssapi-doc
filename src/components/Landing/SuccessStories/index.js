import React from "react";
import { motion } from "framer-motion";
import styles from "./styles.module.scss";

const SUCCESS_CASES = [
  {
    quote:
      "기존에는 API 누락이 너무 잦아서 서버 운영하는데 애를 많이 먹었는데, SSAPI로 바꾸고 나서는 안정적으로 운영할 수 있게 되었습니다.",
    author: "개발자 A",
    icon: "🔧",
    benefit:
      "모든 소켓 연결을 <mark>서버측에서 제어</mark>하고 <mark>안정적인 소켓 연결을 위한 최적화 로직</mark>이 구성되어 있어 클라이언트의 영향 없이 안정적인 서비스를 제공합니다.",
  },
  {
    quote:
      "API 서버 부하 때문에 전용 서버를 따로 두고 있었는데, SSAPI 도입하고 나서는 그럴 필요가 없어져서 비용이 많이 절감되었습니다.",
    author: "개발자 B",
    icon: "💻",
    benefit:
      "<mark>소켓 연결과 방송 상태 감지</mark> 등 부하가 큰 작업을 모두 처리하기 때문에 별도의 API 서버 없이도 안정적인 운영이 가능합니다.",
  },
  {
    quote:
      "네트워크 사용량이 많아서 전용 회선을 써야만 했었는데, SSAPI 사용하면서 일반 회선으로도 충분해졌어요. 비용도 줄이고 관리도 편해졌죠.",
    author: "개발자 C",
    icon: "🌐",
    benefit:
      "<mark>스트리머 100명당 2Mbps</mark>의 최적화된 대역폭으로, 일반 회선만으로도 충분한 성능을 제공합니다.",
  },
];

export default function SuccessStories() {
  return (
    <section className={styles.stories}>
      <div className={styles.container}>
        <h2 className={styles.title}>고객 성공 사례</h2>
        <div className={styles.successCases}>
          {SUCCESS_CASES.map((successCase, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              viewport={{ once: true }}
              className={styles.successCard}
            >
              <div className={styles.successIcon}>{successCase.icon}</div>
              <blockquote className={styles.quote}>
                "{successCase.quote}"
              </blockquote>
              <div className={styles.author}>{successCase.author}</div>
              <div className={styles.detail}>
                <h4 className={styles.detailTitle}>SSAPI의 장점</h4>
                <p
                  dangerouslySetInnerHTML={{ __html: successCase.benefit }}
                ></p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
