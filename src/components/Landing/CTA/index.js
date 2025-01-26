// src/components/CTA/index.jsx
import React from "react";
import Link from "@docusaurus/Link";
import { motion } from "framer-motion";
import { Rocket, ExternalLink, Code } from "lucide-react";
import styles from "./styles.module.scss";

export default function CTA() {
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

  return (
    <section className={styles.ctaSection}>
      <div className={styles.backgroundEffects}>
        <div className={styles.grid} />
        <div className={styles.glow} />
        <div className={styles.blobContainer}>
          <div className={styles.blob} />
          <div className={styles.blob} />
          <div className={styles.blob} />
        </div>
        <div className={styles.particles}>
          <div className={styles.particle} />
          <div className={styles.particle} />
          <div className={styles.particle} />
        </div>
      </div>

      <motion.div
        className={styles.ctaContainer}
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <motion.div className={styles.content} variants={itemVariants}>
          <Rocket className={styles.icon} />
          <h2 className={styles.title}>시작할 준비가 되셨나요?</h2>
          <p className={styles.description}>
            API 키 발급부터 기술 지원까지 모든 과정을 도와드립니다
          </p>
        </motion.div>

        <motion.div className={styles.buttons} variants={itemVariants}>
          <Link className={styles.primaryButton} to="/docs/intro">
            <Code className={styles.buttonIcon} />
            문서 보기
          </Link>
          <Link
            className={styles.secondaryButton}
            to="https://discord.gg/cNVpzCkEvM"
          >
            <ExternalLink className={styles.buttonIcon} />
            Discord
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}
