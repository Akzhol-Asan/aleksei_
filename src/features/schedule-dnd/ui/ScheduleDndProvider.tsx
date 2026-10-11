import {
  DndContext,
  DragOverlay,
  PointerSensor,
  pointerWithin,
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
import { planSectionDrop } from '../model/planSectionDrop';
import { SectionCard } from '@/entities/section/ui/SectionCard';

export function ScheduleDndProvider({ children }: { children: ReactNode }) {
  const moveLesson = useScheduleStore((s) => s.moveLesson);
  const removeLesson = useScheduleStore((s) => s.removeLesson);
  const addLesson = useScheduleStore((s) => s.addLesson);

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

    //section activity
    if (drag.type === 'section') {
      if (drop.type !== 'slot') return;

      const { section } = drag.item;
      const plan = planSectionDrop(state.data, section, drop.day, drop.timeSlotId);
      if (plan.conflicts.length > 0 || !plan.teacherId || !plan.roomId) return;

      addLesson({
        id: crypto.randomUUID(),
        sectionId: section.id,
        teacherId: plan.teacherId,
        roomId: plan.roomId,
        day: drop.day,
        timeSlotId: drop.timeSlotId,
      });

      return;
    }

    const { lesson } = drag.item;

    if (drop.type === 'unassigned') {
      removeLesson(lesson.id);
      return;
    }

    if (lesson.day === drop.day && lesson.timeSlotId === drop.timeSlotId) return;
    if (getDropConflicts(state.data, drag, drop).length > 0) return;

    moveLesson(lesson.id, drop.day, drop.timeSlotId);
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={pointerWithin}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDragCancel={() => setActive(null)}
    >
      {children}
      <DragOverlay>
        {active?.type === 'lesson' && <LessonCard {...active.item} />}
        {active?.type === 'section' && <SectionCard {...active.item} />}
      </DragOverlay>
    </DndContext>
  );
}
