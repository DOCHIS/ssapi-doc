import React from 'react';
import projectData from '@site/schemas/projects.json';
import styles from './styles.module.scss';

export default function ServerList({ type }) {
  const servers = type === 'minecraft' ? projectData.minecraft : projectData.zomboid;

  return (
    <div className={styles.serverGrid}>
      {servers.map((server, idx) => (
        <div key={idx} className={styles.serverCard}>
          <div className={styles.logoWrapper}>
            <img src={server.logo} alt={server.name} />
          </div>
          
          <div className={styles.serverInfo}>
            <div className={styles.titleArea}>
              <h3 className={styles.serverName}>
                {server.name}
                {server.subtitle && <span className={styles.subtitle}>({server.subtitle})</span>}
              </h3>
              <div className={styles.meta}>
                <span>{server.period}</span>
                <span>•</span>
                <span>{server.participants}</span>
              </div>
            </div>
            <div className={styles.bottomArea}>
              <span className={styles.description}>{server.description}</span>
              <div className={styles.actions}>
                {server.link.map((url, linkIdx) => (
                  <a
                    key={linkIdx}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.linkButton}
                  >
                    {server.link.length > 1 ? `${linkIdx + 1}` : '바로가기'}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
} 