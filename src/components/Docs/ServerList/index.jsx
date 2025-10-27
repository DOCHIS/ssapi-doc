import React from 'react';
import projectData from '@site/schemas/projects.json';
import styles from './styles.module.scss';

export default function ServerList({ type }) {
  const contents = type === 'minecraft' ? projectData.minecraft : projectData.zomboid;

  // 날짜를 "MM월 DD일" 형식으로 변환
  const formatMonthDay = (dateStr) => {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${month}월 ${day}일`;
  };

  // 연도 추출
  const getYear = (dateStr) => {
    if (!dateStr) return null;
    return new Date(dateStr).getFullYear();
  };

  // 연도별로 그룹화된 행 생성
  const renderRows = () => {
    const rows = [];
    let currentYear = null;

    contents.forEach((content, idx) => {
      const year = getYear(content.startDate);

      // 연도가 바뀌면 구분선과 헤더 추가
      if (year !== currentYear) {
        currentYear = year;
        rows.push(
          <tr key={`year-${year}`} className={styles.yearRow}>
            <td colSpan="6" className={styles.yearCell}>
              {year}년
            </td>
          </tr>
        );
        // 연도 아래에 헤더 추가
        rows.push(
          <tr key={`header-${year}`} className={styles.headerRow}>
            <th className={styles.logoColumn}>이미지</th>
            <th className={styles.organizerColumn}>주최자</th>
            <th className={styles.nameColumn}>컨텐츠명</th>
            <th className={styles.periodColumn}>기간</th>
            <th className={styles.participantsColumn}>참가자</th>
            <th className={styles.linksColumn}>링크</th>
          </tr>
        );
      }

      // 컨텐츠 행 추가
      rows.push(
        <tr key={idx}>
          <td className={styles.logoCell}>
            <div className={styles.logoWrapper}>
              <img src={content.logo} alt={content.contentName} />
            </div>
          </td>
          <td className={styles.organizerCell}>
            {content.broadcastLink ? (
              <a
                href={content.broadcastLink}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.organizerLink}
              >
                {content.organizer}
              </a>
            ) : (
              <span className={styles.organizerText}>{content.organizer}</span>
            )}
          </td>
          <td className={styles.nameCell}>{content.contentName}</td>
          <td className={styles.periodCell}>
            <div className={styles.periodWrapper}>
              <span>{formatMonthDay(content.startDate)}</span>
              <span className={styles.separator}>~</span>
              {content.endDate && <span>{formatMonthDay(content.endDate)}</span>}
            </div>
          </td>
          <td className={styles.participantsCell}>
            {content.participants && `약 ${content.participants}명`}
          </td>
          <td className={styles.linksCell}>
            {content.noticeLink && (
              <a
                href={content.noticeLink}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.noticeButton}
              >
                공지
              </a>
            )}
          </td>
        </tr>
      );
    });

    return rows;
  };

  return (
    <div className={styles.tableWrapper}>
      <table className={styles.contentTable}>
        <tbody>
          {renderRows()}
        </tbody>
      </table>
    </div>
  );
} 