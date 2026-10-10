import { EnvironmentOutlined, UserOutlined } from '@ant-design/icons';
import styles from './LessonCard.module.scss';

interface LessonCardProps {
  sectionCode: string;
  courseName: string;
  teacherName: string;
  roomName: string;
  removeLesson?: () => void;
}

export function LessonCard({
  sectionCode,
  courseName,
  teacherName,
  roomName,
  removeLesson,
}: LessonCardProps) {
  return (
    <div className={styles.lesson_card} onDoubleClick={removeLesson}>
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
