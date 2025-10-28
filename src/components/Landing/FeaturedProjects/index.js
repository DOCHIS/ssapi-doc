import React from "react";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import styles from "./styles.module.scss";
import projectsData from "../../../../schemas/projects.json";

// 참여자 수로 정렬하고 상위 8개 프로젝트 선택
const TOP_PROJECTS = projectsData.minecraft
  .filter(
    (project) =>
      typeof project.participants === "number" && project.participants > 0
  )
  .sort((a, b) => b.participants - a.participants)
  .slice(0, 8);

export default function FeaturedProjects() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.4, ease: "easeOut" },
    },
  };

  return (
    <section className={styles.projects}>
      <div className={styles.bgEffects}>
        <div className={styles.gradientBlob1} />
        <div className={styles.gradientBlob2} />
      </div>

      <div className={styles.container}>
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className={styles.badge}>
            <Sparkles size={16} />
            <span>대표 프로젝트</span>
          </div>
          <h2 className={styles.title}>검증된 대규모 서비스</h2>
          <p className={styles.subtitle}>
            SSAPI의 안정성과 최적화된 성능으로 운영되는
            <br />
            대규모 마인크래프트 프로젝트들입니다
          </p>
        </motion.div>

        <motion.div
          className={styles.grid}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {TOP_PROJECTS.map((project, idx) => (
            <motion.div
              key={idx}
              variants={itemVariants}
              className={styles.card}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
            >
              <div className={styles.cardInner}>
                <div className={styles.imageWrapper}>
                  <img
                    src={project.logo}
                    alt={project.contentName}
                    className={styles.projectImage}
                  />
                  <div className={styles.imageOverlay} />
                </div>
                <div className={styles.cardContent}>
                  <h3 className={styles.projectTitle}>{project.contentName}</h3>
                  <div className={styles.participants}>
                    약 {project.participants.toLocaleString()}명 참여
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
