import type { Lesson } from '@/entities/lesson/model/types';
import type { ScheduleData } from '@/entities/schedule/model/types';
import type { Section } from '@/entities/section/model/types';
import { validateDrop, type Conflict } from '@/features/validate-drop/model/validateDrop';
import type { WeekDay } from '@/shared/model/schedule/types';

export interface SectionDropPlan {
  teacherId: string | null;
  roomId: string | null;
  conflicts: Conflict[];
}

export function planSectionDrop(
  data: ScheduleData,
  section: Section,
  day: WeekDay,
  timeSlotId: string,
): SectionDropPlan {
  const slotLessons = data.lessons.filter((l) => l.day === day && l.timeSlotId === timeSlotId);

  const teacherId = section.teacherId ?? pickTeacher(data, section, day, timeSlotId, slotLessons);
  const roomId = pickRoom(data, section, slotLessons);

  const conflicts = validateDrop(data, {
    sectionId: section.id,
    teacherId,
    roomId,
    day,
    timeSlotId,
  });

  const scheduled = data.lessons.filter((l) => l.sectionId === section.id).length;

  if (scheduled >= section.requiredLessonsPerWeek) {
    conflicts.unshift({
      code: 'SECTION_COMPLETE',
      message: 'Все занятия уже распределены',
    });
  }

  if (!teacherId) {
    conflicts.push({
      code: 'NO_TEACHER',
      message: 'Нет свободного преподавателя на это время',
    });
  }
  if (!roomId) {
    conflicts.push({
      code: 'NO_ROOM',
      message: `Нет свободной аудитории на ${section.studentsCount} студентов`,
    });
  }

  return { teacherId, roomId, conflicts };
}

//ищем первого свободного преподавателя
function pickTeacher(
  data: ScheduleData,
  section: Section,
  day: WeekDay,
  timeSlotId: string,
  slotLessons: Lesson[],
): string | null {
  const isBusy = (id: string) => slotLessons.some((l) => l.teacherId === id);
  const isBlocked = (id: string) =>
    data.teacherBlockedSlots.some(
      (b) => b.teacherId === id && b.day === day && b.timeSlotId === timeSlotId,
    );

  return section.allowedTeacherIds.find((id) => !isBusy(id) && !isBlocked(id)) ?? null;
}

//ищем первую свободную аудиторию
function pickRoom(data: ScheduleData, section: Section, slotLessons: Lesson[]): string | null {
  const isPreferred = (type: string) => (type === section.preferredRoomType ? 1 : 0);

  const candidates = data.rooms
    .filter((r) => r.capacity >= section.studentsCount)
    .filter((r) => !slotLessons.some((l) => l.roomId === r.id))
    .sort((a, b) => isPreferred(b.type) - isPreferred(a.type) || a.capacity - b.capacity);

  return candidates[0]?.id ?? null;
}
