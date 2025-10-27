---
sidebar_position: 1
sidebar_label: 문의하기
title: 문의하기
---

import styles from './styles.module.css';

<div className={styles.pageHeader}>
  <div className={styles.headerContent}>
    <h1 className={styles.mainTitle}>💬 문의하기</h1>
    <p className={styles.subtitle}>
      SSAPI와 관련된 모든 문의사항을 도와드립니다
    </p>
  </div>
</div>

:::tip 💡 빠른 답변을 원하신다면
디스코드를 통해 가장 빠르게 답변받으실 수 있습니다. 공지사항과 업데이트 소식도 디스코드 커뮤니티를 통해 제공됩니다.
:::

## 🌐 커뮤니티

<div className={styles.communitySection}>
  <div className={styles.communityCard}>
    <div className={styles.communityHeader}>
      <span className={styles.communityIcon}>🎮</span>
      <div>
        <h3 className={styles.communityTitle}>SSAPI Discord 커뮤니티</h3>
        <p className={styles.communityDescription}>
          개발자와 사용자들이 모여 정보를 공유하고 소통하는 공간입니다
        </p>
      </div>
    </div>
    <ul className={styles.featureList}>
      <li>✅ 실시간 기술 지원</li>
      <li>✅ 공지사항 및 업데이트 소식</li>
      <li>✅ 다른 개발자들과의 네트워킹</li>
      <li>✅ 문제 해결 및 팁 공유</li>
    </ul>
    <a href="https://discord.gg/cNVpzCkEvM" className={styles.primaryButton} target="_blank" rel="noopener noreferrer">
      <span>Discord 커뮤니티 참여하기 ↗</span>
    </a>
  </div>
</div>

## 📞 연락 방법

<div className={styles.contactGrid}>
  <div className={styles.contactCard}>
    <div className={styles.iconWrapper}>
      <span className={styles.icon}>💬</span>
    </div>
    <h3 className={styles.contactTitle}>디스코드</h3>
    <p className={styles.contactDescription}>
      가장 빠르고 편리한 연락 수단입니다
    </p>
    <div className={styles.contactInfo}>
      <code className={styles.contactCode}>hutsak</code>
    </div>
    <div className={styles.badges}>
      <span className={styles.badge}>⚡ 빠른 응답</span>
      <span className={styles.badgePrimary}>⭐ 추천</span>
    </div>
  </div>

  <div className={styles.contactCard}>
    <div className={styles.iconWrapper}>
      <span className={styles.icon}>📧</span>
    </div>
    <h3 className={styles.contactTitle}>이메일</h3>
    <p className={styles.contactDescription}>
      공식적인 문의나 제안사항은 이메일로
    </p>
    <div className={styles.contactInfo}>
      <code className={styles.contactCode}>info@ssapi.kr</code>
    </div>
    <div className={styles.badges}>
      <span className={styles.badge}>📝 공식 문의</span>
    </div>
  </div>
</div>

