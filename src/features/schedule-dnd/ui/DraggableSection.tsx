import type { SectionListItem } from '@/entities/schedule/model/types';
import { useDraggable } from '@dnd-kit/core';
import type { DragData } from '../model/types';
import styles from './dnd.module.scss';
import { SectionCard } from '@/entities/section/ui/SectionCard';

export function DraggableSection({ item }: { item: SectionListItem }) {
  const { setNodeRef, listeners, attributes, isDragging } = useDraggable({
    id: `section:${item.section.id}`,
    data: { type: 'section', item } satisfies DragData,
  });

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      className={`${styles.draggable_section} ${isDragging ? styles.dragging : ''}`}
    >
      <SectionCard {...item} />
    </div>
  );
}
