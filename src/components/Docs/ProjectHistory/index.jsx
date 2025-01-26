import React from 'react';
import projectData from '@site/schemas/projects.json';
import styles from './styles.module.scss';

export default function ProjectHistory() {
  const getTypeStyle = (type) => {
    switch (type) {
      case 'KPI':
        return styles.kpiTag;
      case 'update':
        return styles.updateTag;
      default:
        return '';
    }
  };

  return (
    <div className={styles.historyContainer}>
      {projectData.history.map((item, idx) => (
        <div key={idx} className={styles.historyItem}>
          <div className={styles.historyDate}>
            {item.date}
          </div>
          <div className={styles.historyContent}>
            {item.type && (
              <span className={getTypeStyle(item.type)}>{item.type}</span>
            )}
            <span className={styles.historyText}>{item.content}</span>
          </div>
        </div>
      ))}
    </div>
  );
} 