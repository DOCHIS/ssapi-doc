import React from 'react';
import projectData from '@site/schemas/projects.json';
import styles from './styles.module.scss';

export default function OtherProjects() {
  return (
    <div className={styles.otherProjectsContainer}>
      {projectData.others.map((project, idx) => (
        <div key={idx} className={styles.projectItem}>
          <div className={styles.projectDate}>
            {project.date}
          </div>
          <div className={styles.projectContent}>
            {project.user && (
              <span className={styles.userBadge}>{project.user}</span>
            )}
            <span className={styles.description}>{project.description}</span>
          </div>
        </div>
      ))}
    </div>
  );
} 