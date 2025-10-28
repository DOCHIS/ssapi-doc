import React, { useMemo } from "react";
import { motion } from "framer-motion";
import { Star, Sparkles } from "lucide-react";
import styles from "./styles.module.scss";
import projectsData from "../../../../schemas/projects.json";

// Fisher-Yates 셔플 알고리즘
function shuffleArray(array) {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

// 프로젝트 데이터 (마인크래프트 + 좀보이드)
const ALL_PROJECTS = [
  ...(projectsData.minecraft || []),
  ...(projectsData.zomboid || [])
].filter(project => project.logo && project.contentName);

export default function Partners() {
  // 제휴사와 파트너를 랜덤 순서로 표시
  const ALL_PARTNERS = useMemo(() => {
    const combined = [
      ...(projectsData.affiliates || []),
      ...(projectsData.partners || [])
    ];
    return shuffleArray(combined);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 },
    },
  };

  return (
    <section className={styles.partners}>
      <div className={styles.container}>
        {/* 파트너/제휴사 섹션 */}
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className={styles.badge}>
            <Star size={16} />
            <span>파트너 & 제휴사</span>
          </div>
          <h2 className={styles.title}>함께하는 파트너들</h2>
          <p className={styles.subtitle}>
            SSAPI와 협력하여 더 나은 서비스를 만들어가는
            <br />
            신뢰할 수 있는 파트너와 제휴사들입니다
          </p>
        </motion.div>

        <motion.div
          className={styles.grid}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {ALL_PARTNERS.map((partner, idx) => (
            <motion.div
              key={idx}
              variants={itemVariants}
              className={styles.card}
            >
              <div className={styles.cardInner}>
                <div className={styles.imageWrapper}>
                  <img
                    src={partner.logo}
                    alt={partner.name}
                    className={styles.partnerImage}
                  />
                </div>
                <div className={styles.cardContent}>
                  <h3 className={styles.partnerName}>{partner.name}</h3>
                  {partner.subtitle && (
                    <p className={styles.partnerSubtitle}>{partner.subtitle}</p>
                  )}
                  {partner.description && (
                    <p className={styles.description}>{partner.description}</p>
                  )}
                  {partner.link && partner.link[0] && (
                    <a
                      href={partner.link[0]}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.link}
                    >
                      바로가기 →
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* 함께한 프로젝트 롤링 섹션 - 풀 사이즈 */}
      <motion.div
        className={styles.projectsSection}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        <div className={styles.projectsHeader}>
          <div className={styles.projectsBadge}>
            <Sparkles size={14} />
            <span>함께한 프로젝트</span>
          </div>
          <h3 className={styles.projectsTitle}>
            {ALL_PROJECTS.length}개 이상의 프로젝트와 함께했습니다
          </h3>
        </div>

        <div className={styles.scrollContainer}>
          <div className={styles.scrollTrack}>
            {/* 첫 번째 세트 */}
            {ALL_PROJECTS.map((project, idx) => (
              <div key={`project-1-${idx}`} className={styles.projectCard}>
                <img
                  src={project.logo}
                  alt={project.contentName}
                  className={styles.projectImage}
                />
                <div className={styles.projectInfo}>
                  <div className={styles.projectName}>{project.contentName}</div>
                  <div className={styles.projectOrganizer}>{project.organizer}</div>
                </div>
              </div>
            ))}
            {/* 두 번째 세트 (무한 루프) */}
            {ALL_PROJECTS.map((project, idx) => (
              <div key={`project-2-${idx}`} className={styles.projectCard}>
                <img
                  src={project.logo}
                  alt={project.contentName}
                  className={styles.projectImage}
                />
                <div className={styles.projectInfo}>
                  <div className={styles.projectName}>{project.contentName}</div>
                  <div className={styles.projectOrganizer}>{project.organizer}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
