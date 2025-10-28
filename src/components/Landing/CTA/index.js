import React from "react";
import { motion } from "framer-motion";
import Link from "@docusaurus/Link";
import { ArrowRight, BookOpen } from "lucide-react";
import styles from "./styles.module.scss";

export default function CTA() {
  return (
    <section className={styles.cta}>
      <div className={styles.container}>
        <motion.div
          className={styles.ctaCard}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className={styles.ctaContent}>
            <motion.h2
              className={styles.ctaTitle}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              지금 바로 시작하세요
            </motion.h2>
            <motion.p
              className={styles.ctaDescription}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              API 키 발급부터 기술 지원까지, 모든 과정을 함께합니다.
              <br />
              SSAPI와 함께 더 나은 스트리밍 서비스를 만들어보세요.
            </motion.p>
            <motion.div
              className={styles.ctaButtons}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Link to="/docs/intro" className={styles.primaryButton}>
                <BookOpen size={20} />
                문서 시작하기
                <ArrowRight size={20} />
              </Link>
              <Link to="/docs/contact" className={styles.secondaryButton}>
                문의하기
              </Link>
            </motion.div>
          </div>
          <div className={styles.ctaBackground}>
            <div className={styles.gradientOrb1} />
            <div className={styles.gradientOrb2} />
            <div className={styles.gradientOrb3} />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
