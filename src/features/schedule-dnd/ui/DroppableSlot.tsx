import { getSlotKey } from '@/entities/schedule/model/selectors';
import type { WeekDay } from '@/shared/model/schedule/types';
import { useDroppable } from '@dnd-kit/core';
import type { ReactNode } from 'react';
import type { DropData } from '../model/types';
import styles from './dnd.module.scss';

interface DroppableSlotProps {
  day: WeekDay;
  timeSlotId: string;
  className?: string;
  children?: ReactNode;
}

export function DroppableSlot({ day, timeSlotId, className, children }: DroppableSlotProps) {
  const { setNodeRef, isOver } = useDroppable({
    id: `slot:${getSlotKey(day, timeSlotId)}`,
    data: { type: 'slot', day, timeSlotId } satisfies DropData,
  });

  return (
    <div ref={setNodeRef} className={`${className ?? ''} ${isOver ? styles.over : ''}`}>
      {children}
    </div>
  );
}
