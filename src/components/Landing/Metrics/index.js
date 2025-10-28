// index.js
import React from "react";
import { motion } from "framer-motion";
import { Users, Activity, Zap, Heart } from "lucide-react";
import styles from "./styles.module.scss";

const METRICS = [
  {
    number: "3,500+",
    label: "이용 스트리머",
    description:
      "SSAPI와 함께 콘텐츠를 제작한 스트리머 수입니다. 매일 새로운 스트리머들이 합류하고 있습니다.",
    icon: <Users />,
  },
  {
    number: "400억+",
    label: "API 호출량",
    description:
      "지난 6개월 간의 누적 API 처리량입니다. 안정적인 서버 운영으로 무중단 서비스를 제공합니다.",
    icon: <Activity />,
  },
  {
    number: "1Mbps",
    label: "최적화 대역폭",
    description:
      "스트리머 100명당 1Mbps의 대역폭으로 운영이 가능합니다. 최적화된 설계로 리소스를 절약합니다.",
    icon: <Zap />,
  },
  {
    number: "200+",
    label: "활성 사용자",
    description:
      "SSAPI 커뮤니티의 활성 사용자 수입니다. 개발자들과 함께 서비스를 개선하고 있습니다.",
    icon: <Heart />,
  },
];

export default function Metrics() {
  return (
    <section className={styles.metrics}>
      <div className={styles.container}>
        <motion.h2
          className={styles.title}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          숫자로 보는 SSAPI
        </motion.h2>
        <motion.div
          className={styles.grid}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          {METRICS.map((metric, idx) => (
            <motion.div
              key={idx}
              className={styles.card}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
            >
              <div className={styles.iconWrapper}>{metric.icon}</div>
              <div className={styles.content}>
                <h2 className={styles.number}>{metric.number}</h2>
                <h3 className={styles.label}>{metric.label}</h3>
                <p className={styles.description}>{metric.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
