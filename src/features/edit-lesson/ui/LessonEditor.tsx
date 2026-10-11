import type { Lesson } from '@/entities/lesson/model/types';
import { useScheduleStore } from '@/entities/schedule/model/scheduleStore';
import { useDndMonitor } from '@dnd-kit/core';
import { useMemo, useState, type ReactNode } from 'react';
import { getRoomOptions, getTeacherOptions, toSelectOptions } from '../model/getEditOptions';
import { Popover, Select } from 'antd';
import styles from './LessonEditor.module.scss';

interface LessonEditorProps {
  lesson: Lesson;
  children: ReactNode;
}

export function LessonEditor({ lesson, children }: LessonEditorProps) {
  const [open, setOpen] = useState(false);
  const data = useScheduleStore((s) => (s.status === 'ready' ? s.data : null));
  const updateLesson = useScheduleStore((s) => s.updateLesson);

  //close модальное окно при dragg
  useDndMonitor({ onDragStart: () => setOpen(false) });

  //считаем варинты только если модальное окно открыто
  const teacherOptions = useMemo(
    () => (open && data ? toSelectOptions(getTeacherOptions(data, lesson)) : []),
    [open, data, lesson],
  );
  const roomOptions = useMemo(
    () => (open && data ? toSelectOptions(getRoomOptions(data, lesson)) : []),
    [open, data, lesson],
  );

  const content = (
    <div className={styles.editor}>
      <div className={styles.field}>
        <span>Преподаватель</span>
        <Select
          value={lesson.teacherId}
          options={teacherOptions}
          onChange={(teacherId) => updateLesson(lesson.id, { teacherId })}
        />
      </div>

      <div className={styles.field}>
        <span>Аудитория</span>
        <Select
          value={lesson.roomId}
          options={roomOptions}
          onChange={(roomId) => updateLesson(lesson.id, { roomId })}
        />
      </div>
    </div>
  );

  return (
    <Popover
      open={open}
      onOpenChange={setOpen}
      trigger="click"
      placement="right"
      title="Редактирование занятия"
      content={content}
    >
      <div className={styles.trigger}>{children}</div>
    </Popover>
  );
}
