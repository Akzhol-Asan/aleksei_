import styles from './ScheduleGrid.module.scss';
import { Spin } from 'antd';
import React, { useMemo } from 'react';
import { getSlotKey, selectLessonsBySlot } from '@/entities/schedule/model/selectors';
import { LessonCard } from '@/entities/lesson/ui/LessonCard';
import type { LessonsListItem } from '@/entities/schedule/model/types';
import { useScheduleStore } from '@/entities/schedule/model/scheduleStore';

export function ScheduleGrid() {
  const state = useScheduleStore();

  const removeLesson = useScheduleStore((s) => s.removeLesson);

  const lessonsBySlot = useMemo(
    () =>
      state.status === 'ready'
        ? selectLessonsBySlot(state.data)
        : new Map<string, LessonsListItem[]>(),
    [state],
  );

  if (state.status === 'loading') return <Spin />;
  if (state.status === 'error') return null;

  const { weekDay: days, timeSlot: slots } = state.data;

  return (
    <div className={styles.schedule_grid}>
      <div className={styles.corner} />

      {days.map((day) => (
        <div key={day.id} className={styles.day_header}>
          {day.label}
        </div>
      ))}

      {slots.map((slot) => (
        <React.Fragment key={slot.id}>
          <div className={styles.time_cell}>
            <span>{slot.start}</span>
            <span className={styles.time_end}>{slot.end}</span>
          </div>

          {days.map((day) => {
            const key = getSlotKey(day.id, slot.id);
            const lessons = lessonsBySlot.get(key) ?? [];

            return (
              <div key={key} className={styles.cell}>
                {lessons.map((item) => (
                  <LessonCard
                    key={item.lesson.id}
                    {...item}
                    removeLesson={() => removeLesson(item.lesson.id)}
                  />
                ))}
              </div>
            );
          })}
        </React.Fragment>
      ))}
    </div>
  );
}
