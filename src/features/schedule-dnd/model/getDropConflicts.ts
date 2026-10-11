import type { ScheduleData } from '@/entities/schedule/model/types';
import type { DragData, SlotDrop } from './types';
import { validateDrop, type Conflict } from '@/features/validate-drop/model/validateDrop';
import { planSectionDrop } from './planSectionDrop';

export function getDropConflicts(data: ScheduleData, drag: DragData, drop: SlotDrop): Conflict[] {
  if (drag.type === 'section') {
    return planSectionDrop(data, drag.item.section, drop.day, drop.timeSlotId).conflicts;
  }

  const { lesson } = drag.item;

  return validateDrop(data, {
    lessonId: lesson.id,
    sectionId: lesson.sectionId,
    teacherId: lesson.teacherId,
    roomId: lesson.roomId,
    day: drop.day,
    timeSlotId: drop.timeSlotId,
  });
}
