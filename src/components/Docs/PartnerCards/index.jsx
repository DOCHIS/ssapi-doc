import React from 'react';
import projectData from '@site/schemas/projects.json';
import styles from './styles.module.scss';

export default function PartnerCards({ type = 'all' }) {
  // type에 따라 필터링: 'affiliate', 'partner', 또는 'all'
  let items = [];
  if (type === 'affiliate') {
    items = projectData.affiliates || [];
  } else if (type === 'partner') {
    items = projectData.partners || [];
  } else {
    // 'all'인 경우 affiliates와 partners 모두 표시
    items = [...(projectData.affiliates || []), ...(projectData.partners || [])];
  }

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