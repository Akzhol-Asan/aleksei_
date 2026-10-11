import styles from './ScheduleGrid.module.scss';
import { Spin } from 'antd';
import React, { useMemo } from 'react';
import { getSlotKey, selectLessonsBySlot } from '@/entities/schedule/model/selectors';
import type { LessonsListItem } from '@/entities/schedule/model/types';
import { useScheduleStore } from '@/entities/schedule/model/scheduleStore';
import { DroppableSlot } from '@/features/schedule-dnd/ui/DroppableSlot';
import { DraggableLesson } from '@/features/schedule-dnd/ui/DraggableLesson';
import { LessonEditor } from '@/features/edit-lesson/ui/LessonEditor';

export function ScheduleGrid() {
  const state = useScheduleStore();

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
              <DroppableSlot key={key} day={day.id} timeSlotId={slot.id} className={styles.cell}>
                {lessons.map((item) => (
                  <LessonEditor key={item.lesson.id} lesson={item.lesson}>
                    <DraggableLesson item={item} />
                  </LessonEditor>
                ))}
              </DroppableSlot>
            );
          })}
        </React.Fragment>
      ))}
    </div>
  );
}
