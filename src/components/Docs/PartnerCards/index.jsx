import React from 'react';
import projectData from '@site/schemas/projects.json';
import styles from './styles.module.scss';

export default function PartnerCards() {
  return (
    <div className={styles.partnerGrid}>
      {projectData.partners.map((partner, idx) => (
        <div key={idx} className={styles.partnerCard}>
          <img src={partner.logo} alt={partner.name} />
          <div className={styles.partnerInfo}>
            <h3>[{partner.type === 'partnership' ? '제휴' : '파트너'}] {partner.name}</h3>
            <p>
              <span>{partner.period}</span>
              <span>{partner.subtitle}</span>
            </p>
            <a href={partner.link[0]} target="_blank" rel="noopener noreferrer">
              바로가기
            </a>
          </div>
        </div>
      ))}
    </div>
  );
}