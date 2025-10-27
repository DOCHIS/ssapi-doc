import React, { useRef, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import projectsData from "@site/schemas/projects.json";
import styles from "./styles.module.scss";

const ProjectsList = () => {
  const scrollRef = useRef();

  // 중복 제거 및 셔플된 유니크 프로젝트 생성 (메모이제이션)
  const uniqueProjects = useMemo(() => {
    const projectsMap = new Map();

    // partners 추가
    projectsData.partners.forEach((p) => {
      const key = `${p.logo}-${p.name}`;
      if (!projectsMap.has(key)) {
        projectsMap.set(key, {
          ...p,
          type: "affiliate",
          displayName: p.name,
          supportInfo: p.subtitle,
        });
      }
    });

    // minecraft 추가
    projectsData.minecraft.forEach((p) => {
      const key = `${p.logo}-${p.contentName}`;
      if (!projectsMap.has(key)) {
        projectsMap.set(key, {
          ...p,
          type: "minecraft",
          displayName: p.contentName,
          supportInfo: p.participants ? `약 ${p.participants}명` : '',
        });
      }
    });

    // zomboid 추가
    projectsData.zomboid.forEach((p) => {
      const key = `${p.logo}-${p.contentName}`;
      if (!projectsMap.has(key)) {
        projectsMap.set(key, {
          ...p,
          type: "zomboid",
          displayName: p.contentName,
          supportInfo: p.participants ? `약 ${p.participants}명` : '',
        });
      }
    });

    // Fisher-Yates 셔플 알고리즘
    const array = Array.from(projectsMap.values());
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }

    return array;
  }, []);

  // 스크롤 속도 (px/s)
  const SCROLL_SPEED = 160;

  useEffect(() => {
    const scrollElement = scrollRef.current;
    if (!scrollElement) return;

    let animationId;
    let startTime = Date.now();
    let currentX = 0;

    const animate = () => {
      const now = Date.now();
      const delta = (now - startTime) / 1000; // 초 단위
      startTime = now;

      // 일정한 속도로 왼쪽으로 이동
      currentX -= SCROLL_SPEED * delta;

      // 한 세트가 완전히 지나가면 리셋 (seamless loop)
      const itemWidth = scrollElement.scrollWidth / 2;
      if (Math.abs(currentX) >= itemWidth) {
        currentX = 0;
      }

      scrollElement.style.transform = `translateX(${currentX}px)`;
      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, []);

  // 프로젝트 카드 렌더링 함수
  const renderProjectCard = (project, idx) => (
    <motion.div
      key={`${project.logo}-${project.displayName}-${idx}`}
      className={`${styles.projectItem} ${
        project.type === "affiliate" ? styles.partnerItem : ""
      }`}
      whileHover={{
        scale: 1.02,
        transition: { duration: 0.2 },
      }}
    >
      <img
        src={project.logo}
        alt={project.displayName}
        className={styles.logo}
        loading="lazy"
      />
      <div className={styles.textContent}>
        <h3 className={styles.name}>
          {project.displayName}
          {project.subtitle && (
            <span className={styles.nameSubtitle}>
              {project.subtitle}
            </span>
          )}
        </h3>
        <p className={styles.subtitle}>
          {project.description ? (
            project.description.length > 30
              ? project.description.slice(0, 30) + "..."
              : project.description
          ) : project.supportInfo}
        </p>
      </div>
    </motion.div>
  );

  return (
    <section className={styles.projectsSection}>
      <div className={styles.container}>
        <h2 className={styles.title}>SSAPI와 함께하는 프로젝트</h2>
        <div className={styles.scrollWrapper}>
          <div
            ref={scrollRef}
            className={styles.scrollTrack}
          >
            {/* 원본 세트 */}
            {uniqueProjects.map((project, idx) => renderProjectCard(project, idx))}
            {/* 복사본 세트 (무한 스크롤용) */}
            {uniqueProjects.map((project, idx) => renderProjectCard(project, idx + uniqueProjects.length))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectsList;
