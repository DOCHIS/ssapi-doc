import React, { useMemo } from 'react';
import projectData from '@site/schemas/projects.json';
import styles from './styles.module.scss';

// Fisher-Yates 셔플 알고리즘
function shuffleArray(array) {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export default function PartnerCards({ type = 'all' }) {
  // type에 따라 필터링: 'affiliate', 'partner', 또는 'all'
  const items = useMemo(() => {
    let data = [];
    if (type === 'affiliate') {
      data = projectData.affiliates || [];
    } else if (type === 'partner') {
      data = projectData.partners || [];
    } else {
      // 'all'인 경우 affiliates와 partners 모두 표시
      data = [...(projectData.affiliates || []), ...(projectData.partners || [])];
    }

    // 랜덤 정렬
    return shuffleArray(data);
  }, [type]);

  return (
    <div className={styles.partnerGrid}>
      {items.map((item, idx) => (
        <div key={idx} className={styles.partnerCard}>
          <img src={item.logo} alt={item.name} />
          <div className={styles.partnerInfo}>
            <h3>{item.name}</h3>
            {item.subtitle && <p className={styles.subtitle}>{item.subtitle}</p>}
            {item.description && <p className={styles.description}>{item.description}</p>}
            <a href={item.link[0]} target="_blank" rel="noopener noreferrer">
              바로가기 ↗
            </a>
          </div>
        </div>
      ))}
    </div>
  );
}