import {
  DndContext,
  DragOverlay,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
  type DragStartEvent,
} from '@dnd-kit/core';
import { useScheduleStore } from '@/entities/schedule/model/scheduleStore';
import { useState, type ReactNode } from 'react';
import type { DragData, DropData } from '../model/types';
import { getDropConflicts } from '../model/getDropConflicts';
import { LessonCard } from '@/entities/lesson/ui/LessonCard';

export function ScheduleDndProvider({ children }: { children: ReactNode }) {
  const moveLesson = useScheduleStore((s) => s.moveLesson);
  const [active, setActive] = useState<DragData | null>(null);

  //старт перетаскивания от 5 пикселя
  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 5 } }));

  function handleDragStart(e: DragStartEvent) {
    setActive(e.active.data.current as DragData);
  }

  function handleDragEnd(e: DragEndEvent) {
    setActive(null);

    const drag = e.active.data.current as DragData | undefined;
    const drop = e.over?.data.current as DropData | undefined;

    if (!drag || !drop) return;

    const state = useScheduleStore.getState();
    if (state.status !== 'ready') return;

    const { lesson } = drag.item;
    if (lesson.day === drop.day && lesson.timeSlotId === drop.timeSlotId) return;

    if (getDropConflicts(state.data, drag, drop).length > 0) return;

    moveLesson(lesson.id, drop.day, drop.timeSlotId);
  }

  return (
    <DndContext
      sensors={sensors}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDragCancel={() => setActive(null)}
    >
      {children}
      <DragOverlay>{active ? <LessonCard {...active.item} /> : null}</DragOverlay>
    </DndContext>
  );
}
