import type { Section } from '../model/types';
import styles from './SectionCard.module.scss';
import { Progress } from 'antd';
import { CalendarOutlined, UsergroupAddOutlined, UserOutlined } from '@ant-design/icons';

interface SectionCardProps {
  section: Section;
  courseName: string;
  teacherName: string | null;
  scheduledCount: number;
}

export function SectionCard({
  section,
  courseName,
  teacherName,
  scheduledCount,
}: SectionCardProps) {
  const required = section.requiredLessonsPerWeek;
  const percent = Math.round((scheduledCount / required) * 100);

  return (
    <div className={styles.card}>
      <div className={styles.top}>
        <b>{section.code}</b>
        <span>
          {scheduledCount}/{required}
        </span>
      </div>

      <div className={styles.center}>
        <p>{courseName}</p>
        <div className={styles.progress_bar}>
          <Progress percent={percent} showInfo={false} size="small" />
        </div>
      </div>

      <div className={styles.bottom}>
        <div>
          <UsergroupAddOutlined />
          <p>{section.studentsCount}</p>
        </div>
        <div>
          <UserOutlined />
          <p>{teacherName ?? 'Не назначен'}</p>
        </div>
        <div>
          <CalendarOutlined />
          <p>{required} занятия</p>
        </div>
      </div>
    </div>
  );
}
