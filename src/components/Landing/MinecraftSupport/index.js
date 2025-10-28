import React from "react";
import Link from "@docusaurus/Link";
import { motion } from "framer-motion";
import { Server, Clock, Github, Code, Key, Zap, Users } from "lucide-react";
import styles from "./styles.module.scss";

export default function MinecraftSupport() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6 },
    },
  };

  const features = [
    {
      icon: <Clock className={styles.featureIcon} />,
      title: "빠른 구축",
      description:
        "SSAPI를 통한 마인크래프트 API 시스템 구축은 하루면 충분합니다.",
    },
    {
      icon: <Zap className={styles.featureIcon} />,
      title: "무상 지원",
      description: "API와 플러그인을 무상으로 지원하고 있습니다.",
    },
    {
      icon: <Users className={styles.featureIcon} />,
      title: "검증된 시스템",
      description:
        "마병대, 클로베 서버 등 다수의 마인크래프트 서버에서 사용했습니다.",
    },
  ];

  return (
    <section className={styles.minecraftSection}>
      <div className={styles.backgroundEffects}>
        <div className={styles.cubes}>
          {[...Array(8)].map((_, i) => (
            <div key={i} className={styles.cube} />
          ))}
        </div>
        <div className={styles.grid} />
        <div className={styles.glow} />
      </div>

      <motion.div
        className={styles.container}
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <motion.div className={styles.header} variants={itemVariants}>
          <Server className={styles.icon} />
          <h2 className={styles.title}>마인크래프트 서버 지원</h2>
          <p className={styles.description}>
            SSAPI는 마인크래프트 서버를 적극 지원합니다.
            <br />
            마인크래프트는 다수의 스트리머들이 참여하여 기회를 부여하고 재미있는
            콘텐츠와 방송을 만들어 주기 때문에, SSAPI 비전에 가장 부합하는
            콘텐츠 중 하나입니다.
          </p>
        </motion.div>

        <motion.div className={styles.features} variants={itemVariants}>
          {features.map((feature, index) => (
            <div key={index} className={styles.feature}>
              {feature.icon}
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </div>
          ))}
        </motion.div>

        <motion.div className={styles.showcase} variants={itemVariants}>
          <div className={styles.showcaseContent}>
            <h3>빠른 시작</h3>
            <p>
              오픈소스로 제공되는 마인크래프트 플러그인을 통해 API 시스템을 매우
              빠르게 연동하실 수 있습니다. 실제로 마병대의 경우, 개발부터
              적용까지 12시간이 채 걸리지 않았으며, 클로베 서버의 경우에도 기존
              API 시스템에서 SSAPI로 이전하는 데 6시간이 채 걸리지 않았습니다!
            </p>
          </div>
        </motion.div>

        <motion.div className={styles.actions} variants={itemVariants}>
          <Link
            className={styles.primaryButton}
            to="https://github.com/DOCHIS/SSAPI-Minecraft"
          >
            <Github className={styles.buttonIcon} />
            플러그인 다운로드
          </Link>
          <Link
            className={styles.secondaryButton}
            to="http://dashboard.ssapi.kr/"
          >
            <Key className={styles.buttonIcon} />
            API 키 신청
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}
