---
sidebar_position: 1
---

import styles from './styles.module.css';

:::tip 요약
SSAPI 관련 문의는 디스코드를 통해 가장 빠르게 답변받으실 수 있습니다. 공지사항과 업데이트 소식은 디스코드 커뮤니티를 통해 제공됩니다.
:::

# 연락처

<div className={styles.header}>
  <h2 style={{ margin: '0 0 1rem 0' }}>문의 및 지원</h2>
  <p>SSAPI와 관련된 문의가 있으신 경우 아래 연락 수단을 통해 문의하실 수 있습니다.</p>
  <p>대부분의 공지사항은 디스코드 공개 커뮤니티를 통해서만 제공되고 있습니다.</p>
</div>

<div className={styles.grid}>
  <div className={styles.card}>
    <h2>📞 빠른 연락</h2>
    
    <div style={{ marginTop: '1.5rem' }}>
      <div className={styles.contactItem}>
        <h3 style={{ margin: '0 0 0.5rem 0' }}>💬 디스코드</h3>
        <code className={styles.code}>hutsak</code>
        <div style={{ marginTop: '0.5rem' }}>
          <span className={styles.badge}>추천</span>
          <span className={styles.badge}>빠른 응답</span>
        </div>
      </div>

      <div className={styles.contactItem}>
        <h3 style={{ margin: '0 0 0.5rem 0' }}>📧 이메일</h3>
        <code className={styles.code}>dochis2013@gmail.com</code>
      </div>
    </div>

  </div>

  <div>
    <div className={styles.card} style={{ marginBottom: '2rem' }}>
      <h2>🌐 커뮤니티</h2>
      <p>SSAPI 디스코드 커뮤니티에서 다양한 소식과 업데이트를 확인하세요.</p>
      <a href="https://discord.gg/cNVpzCkEvM" className={styles.button}>커뮤니티 참여하기</a>
    </div>

    <div className={styles.card}>
      <h2>🔗 관련 서비스</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <a href="https://doc.ssapi.kr/" className={styles.serviceLink}>
          <h3 style={{ margin: '0 0 0.25rem 0' }}>🔌 SSAPI</h3>
          <p className={styles.serviceDescription}>아프리카/치지직 후원 및 채팅 API</p>
        </a>

        <a href="https://afreeca-emotes.vercel.app/" className={styles.serviceLink}>
          <h3 style={{ margin: '0 0 0.25rem 0' }}>😀 아프리카 이모트</h3>
          <p className={styles.serviceDescription}>아프리카 이모트 서비스</p>
        </a>

        <a href="https://bj.afreecatv.com/sack2022" className={styles.serviceLink}>
          <h3 style={{ margin: '0 0 0.25rem 0' }}>📺 방송국</h3>
          <p className={styles.serviceDescription}>기타 숲 관련 서비스들</p>
        </a>
      </div>
    </div>

  </div>
</div>
