import { useSchedule } from '@/entities/schedule/model/useSchedule';
import styles from './ScheduleGrid.module.scss';
import { Spin } from 'antd';
import React from 'react';

export function ScheduleGrid() {
  const state = useSchedule();

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

          {days.map((day) => (
            <div key={`${day.id}_${slot.id}`} className={styles.cell} />
          ))}
        </React.Fragment>
      ))}
    </div>
  );
}
