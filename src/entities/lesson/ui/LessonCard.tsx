import { EnvironmentOutlined, UserOutlined } from '@ant-design/icons';
import styles from './LessonCard.module.scss';

interface LessonCardProps {
  sectionCode: string;
  courseName: string;
  teacherName: string;
  roomName: string;
}

export function LessonCard({ sectionCode, courseName, teacherName, roomName }: LessonCardProps) {
  return (
    <div className={styles.lesson_card}>
      <b>{sectionCode}</b>
      <span>{courseName}</span>

      <div className={styles.lesson_card_inner}>
        <span>
          <UserOutlined />
          {teacherName}
        </span>
        <span>
          <EnvironmentOutlined />
          {roomName}
        </span>
      </div>
    </div>
  );
}
