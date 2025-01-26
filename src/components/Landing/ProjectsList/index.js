import React, { useRef, useEffect, useState } from "react";
import { motion, useAnimationControls } from "framer-motion";
import projectsData from "@site/schemas/projects.json";
import styles from "./styles.module.scss";

// 배열을 랜덤하게 섞는 함수
const shuffleArray = (array) => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

const ProjectsList = () => {
  // 기본 프로젝트 데이터 설정
  const baseProjects = [
    ...projectsData.partners.map((p) => ({
      ...p,
      type: "partnership",
      supportInfo: p.subtitle,
    })),
    ...projectsData.minecraft.map((p) => ({
      ...p,
      type: "minecraft",
      supportInfo: `${p.support} · ${p.participants}`,
    })),
    ...projectsData.zomboid.map((p) => ({
      ...p,
      type: "zomboid",
      supportInfo: `${p.support} · ${p.participants}`,
    })),
  ];

  const scrollRef = useRef();
  const animationRef = useRef(null);
  const [direction, setDirection] = useState(1);
  const [items, setItems] = useState([
    ...shuffleArray(baseProjects),
    ...shuffleArray(baseProjects),
    ...shuffleArray(baseProjects),
  ]);
  const controls = useAnimationControls();

  // 스크롤 속도 조정 (더 높은 값 = 더 느린 속도)
  const SCROLL_DURATION = 45; // 기존 30에서 45로 증가

  useEffect(() => {
    let isMounted = true;

    const startScroll = async () => {
      if (!scrollRef.current || !isMounted) return;

      const animate = async () => {
        if (!scrollRef.current || !isMounted) return;

        try {
          await controls.start({
            x:
              direction === 1
                ? [-200, -(scrollRef.current.scrollWidth / 2)]
                : [-(scrollRef.current.scrollWidth / 2), -200],
            transition: {
              duration: SCROLL_DURATION,
              ease: "linear",
            },
          });

          if (isMounted) {
            setDirection((prev) => prev * -1);
          }
        } catch (error) {
          // 애니메이션이 취소된 경우 무시
        }
      };

      animationRef.current = requestAnimationFrame(animate);
    };

    startScroll();

    // 클린업 함수
    return () => {
      isMounted = false;
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      controls.stop();
    };
  }, [direction]);

  return (
    <section className={styles.projectsSection}>
      <div className={styles.container}>
        <h2 className={styles.title}>SSAPI와 함께하는 프로젝트</h2>
        <div className={styles.scrollWrapper}>
          <motion.div
            ref={scrollRef}
            className={styles.scrollTrack}
            animate={controls}
            initial={{ x: -200 }}
          >
            {items.map((project, idx) => (
              <motion.div
                key={`${project.name}-${idx}`}
                className={`${styles.projectItem} ${
                  project.type === "partnership" ? styles.partnerItem : ""
                }`}
                whileHover={{
                  scale: 1.02,
                  transition: { duration: 0.2 },
                }}
              >
                <img
                  src={project.logo}
                  alt={project.name}
                  className={styles.logo}
                  loading="lazy"
                />
                <div className={styles.textContent}>
                  <h3 className={styles.name}>
                    {project.name}
                    {project.subtitle && (
                      <span className={styles.nameSubtitle}>
                        {project.subtitle}
                      </span>
                    )}
                  </h3>
                  <p className={styles.subtitle}>
                    {project.description.length > 30
                      ? project.description.slice(0, 30) + "..."
                      : project.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ProjectsList;
