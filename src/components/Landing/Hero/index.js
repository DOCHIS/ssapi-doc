import React, { useState, useEffect } from "react";
import Link from "@docusaurus/Link";
import { motion } from "framer-motion";
import { Zap, Users, Server, ArrowRight } from "lucide-react";
import styles from "./styles.module.scss";

const FEATURES = [
  {
    title: "최적화된 네트워크",
    description: "100명당 1Mbps",
    icon: <Server className="w-6 h-6" />,
    details: ["압축을 통한 대역 최적화", "매우 가벼운 소켓 시스템"],
  },
  {
    title: "통합 플랫폼",
    description: "하나의 API로 통합",
    icon: <Users className="w-6 h-6" />,
    details: ["동일한 규격의 일관된 데이터", "높은 개발 생산성"],
  },
  {
    title: "높은 성능의 API",
    description: "2,000개/초 까지 대응",
    icon: <Zap className="w-6 h-6" />,
    details: ["실시간 모니터링", "자동 복구 시스템"],
  },
  {
    title: "확장 가능성",
    description: "400+ 동시접속",
    icon: <ArrowRight className="w-6 h-6" />,
    details: ["REST/Socket API", "유연한 구조"],
  },
];

export default function Hero() {
  const [text, setText] = useState("");
  const fullText = "숲(아프리카)과 치지직의 통합 스트리밍 데이터 플랫폼";

  useEffect(() => {
    let i = 0;
    const typing = setInterval(() => {
      setText(fullText.substring(0, i));
      i++;
      if (i > fullText.length) clearInterval(typing);
    }, 100);
    return () => clearInterval(typing);
  }, []);

  return (
    <div className={styles.heroContainer}>
      <div className={styles.backgroundEffects}>
        <div className={styles.grid} />
        <div className={styles.particlesContainer}>
          <div className={styles.particle} />
          <div className={styles.particle} />
          <div className={styles.particle} />
        </div>
        <div className={styles.blobOne} />
        <div className={styles.blobTwo} />
      </div>

      <div className={styles.content}>
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className={styles.title}>SSAPI</h1>
          <div className={styles.subtitle}>{text}</div>
        </motion.div>

        <motion.div
          className={styles.statsGrid}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, staggerChildren: 0.1 }}
        >
          {FEATURES.map((feature, index) => (
            <motion.div
              key={index}
              className={styles.statsCard}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className={styles.statsIcon}>{feature.icon}</div>
              <h3 className={styles.statsTitle}>{feature.title}</h3>
              <div className={styles.statsValue}>{feature.description}</div>
              <ul className={styles.statsList}>
                {feature.details.map((detail, idx) => (
                  <li key={idx}>{detail}</li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className={styles.buttons}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <Link className={styles.primaryButton} to="/docs/intro">
            문서 보기
          </Link>
          <Link className={styles.secondaryButton} to="/docs/quick_start_guide">
            빠른 시작
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
