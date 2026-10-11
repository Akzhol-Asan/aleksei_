import { useDroppable } from '@dnd-kit/core';
import type { ReactNode } from 'react';
import type { DragData, DropData } from '../model/types';
import styles from './dnd.module.scss';
import { RollbackOutlined } from '@ant-design/icons';

interface UnassignedDropZoneProps {
  className?: string;
  children: ReactNode;
}

export function UnassignedDropZone({ className, children }: UnassignedDropZoneProps) {
  const { setNodeRef, isOver, active } = useDroppable({
    id: 'unassigned',
    data: { type: 'unassigned' } satisfies DropData,
  });

  const drag = active?.data.current as DragData | undefined;
  const isLessonDragging = drag?.type === 'lesson';

  const stateClass = isLessonDragging
    ? isOver
      ? styles.unassigned_over
      : styles.unassigned_active
    : '';

  return (
    <div ref={setNodeRef} className={`${className ?? ''} ${styles.unassigned} ${stateClass}`}>
      {children}
      {isLessonDragging && (
        <div className={styles.unassigned_hint}>
          <p>Убрать занятие в занятие из расписания</p>
          <RollbackOutlined />
        </div>
      )}
    </div>
  );
}
