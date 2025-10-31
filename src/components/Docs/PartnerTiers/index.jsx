import styles from './styles.module.scss';

const tiers = [
  {
    id: 'affiliate',
    title: '제휴사',
    icon: '🤝',
    color: 'primary',
    description: 'SSAPI 운영 목적과 부합하는 프로젝트로, 운영정책의 일부 또는 전부를 특약으로 예외 적용받을 수 있습니다.',
    features: [
      '운영정책 특약 적용',
      '맞춤형 서비스 제공'
    ]
  },
  {
    id: 'partner',
    title: '파트너',
    icon: '⭐',
    color: 'success',
    description: 'SSAPI 장기 사용으로 신뢰성이 확보된 경우, API 키 발급 시 심사 없이 사용 신청서만 제출하면 즉시 발급됩니다.',
    features: [
      '운영정책 전체 준수',
      'API 키 무심사 발급'
    ]
  },
  {
    id: 'general',
    title: '일반 사용자',
    icon: '👤',
    color: 'secondary',
    description: '운영정책을 준수하며 정상 심사 절차를 통해 API 키를 발급받아 사용합니다.',
    features: [
      '운영정책 전체 준수',
      '심사 후 API 키 발급'
    ]
  }
];

export default function PartnerTiers() {
  return (
    <div className={styles.tiersContainer}>
      <div className={styles.tiersGrid}>
        {tiers.map((tier) => (
          <div key={tier.id} className={`${styles.tierCard} ${styles[tier.color]}`}>
            <div className={styles.tierHeader}>
              <span className={styles.tierIcon}>{tier.icon}</span>
              <h3 className={styles.tierTitle}>{tier.title}</h3>
            </div>
            <div className={styles.tierContent}>
              <p className={styles.tierDescription}>{tier.description}</p>
              {tier.note && (
                <div className={styles.tierNote}>
                  <span className={styles.noteIcon}>💡</span>
                  <p>{tier.note}</p>
                </div>
              )}
              <ul className={styles.tierFeatures}>
                {tier.features.map((feature, idx) => (
                  <li key={idx}>{feature}</li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
