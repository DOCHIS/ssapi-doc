import React from "react";
import { motion } from "framer-motion";
import styles from "./styles.module.scss";
import projectsData from "../../../../schemas/projects.json";

// 참여자 수로 정렬하고 상위 8개 프로젝트 선택
const TOP_PROJECTS = projectsData.minecraft
  .filter((project) => typeof project.participants === 'number' && project.participants > 0)
  .sort((a, b) => b.participants - a.participants)
  .slice(0, 8)
  .map((project) => ({
    icon: (
      <img
        src={project.logo}
        alt={project.contentName}
        className={styles.projectIcon}
      />
    ),
    title: project.contentName,
    metrics: [`참여 인원: 약 ${project.participants}명`],
  }));

export default function FeaturedProjects() {
  return (
    <section className={styles.projects}>
      <div className={styles.container}>
        <h2 className={styles.title}>대표 프로젝트</h2>
        <p className={styles.subtitle}>
          SSAPI의 안정성과 최적화된 성능을 바탕으로
          <br />
          대규모 마인크래프트 서버들이 성공적으로 운영되고 있습니다
        </p>
        <div className={styles.grid}>
          {TOP_PROJECTS.map((project, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              viewport={{ once: true }}
              className={styles.card}
            >
              <div className={styles.iconWrapper}>{project.icon}</div>
              <div className={styles.content}>
                <h3 className={styles.cardTitle}>{project.title}</h3>
                <ul className={styles.metrics}>
                  {project.metrics.map((metric, i) => (
                    <li key={i} className={styles.metric}>
                      {metric}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
