import { getSlotKey } from '@/entities/schedule/model/selectors';
import type { WeekDay } from '@/shared/model/schedule/types';
import { useDroppable } from '@dnd-kit/core';
import { useMemo, type ReactNode } from 'react';
import type { DragData, DropData } from '../model/types';
import styles from './dnd.module.scss';
import { getDropConflicts } from '../model/getDropConflicts';
import { useScheduleStore } from '@/entities/schedule/model/scheduleStore';

interface DroppableSlotProps {
  day: WeekDay;
  timeSlotId: string;
  className?: string;
  children?: ReactNode;
}

export function DroppableSlot({ day, timeSlotId, className, children }: DroppableSlotProps) {
  const data = useScheduleStore((s) => (s.status === 'ready' ? s.data : null));

  const { setNodeRef, isOver, active } = useDroppable({
    id: `slot:${getSlotKey(day, timeSlotId)}`,
    data: { type: 'slot', day, timeSlotId } satisfies DropData,
  });

  //active то что дивгают сейчас
  const drag = active?.data.current as DragData | undefined;

  const conflicts = useMemo(
    () => (drag && data ? getDropConflicts(data, drag, { type: 'slot', day, timeSlotId }) : []),
    [drag, data, day, timeSlotId],
  );

  const stateClass = getSlotStateClass(Boolean(drag), conflicts.length === 0, isOver);

  return (
    <div ref={setNodeRef} className={`${className ?? ''} ${styles.slot} ${stateClass}`}>
      {children}

      {isOver && conflicts.length > 0 && (
        <ul className={styles.conflicts}>
          {conflicts.map((c) => (
            <li key={c.code}>{c.message}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

function getSlotStateClass(isDragging: boolean, isValid: boolean, isOver: boolean) {
  if (!isDragging) return '';
  if (isValid) return isOver ? styles.over_valid : styles.valid;
  return isOver ? styles.over_invalid : styles.invalid;
}
