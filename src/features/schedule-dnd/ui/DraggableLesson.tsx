import type { LessonsListItem } from '@/entities/schedule/model/types';
import { useDraggable } from '@dnd-kit/core';
import type { DragData } from '../model/types';
import styles from './dnd.module.scss';
import { LessonCard } from '@/entities/lesson/ui/LessonCard';

export function DraggableLesson({ item }: { item: LessonsListItem }) {
  const { setNodeRef, listeners, attributes, isDragging } = useDraggable({
    id: `lesson: ${item.lesson.id}`,
    data: { type: 'lesson', item } satisfies DragData,
  });

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      className={`${styles.draggable} ${isDragging ? styles.dragging : ''}`}
    >
      <LessonCard {...item} />
    </div>
  );
}
