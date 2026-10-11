import type { Lesson } from '@/entities/lesson/model/types';
import type { ScheduleData } from '@/entities/schedule/model/types';
import {
  validateDrop,
  type Conflict,
  type ConflictCode,
} from '@/features/validate-drop/model/validateDrop';

export interface EditOptions {
  value: string;
  label: string;
  conflicts: Conflict[];
}

const TEACHER_CODES: ConflictCode[] = ['TEACHER_BUSY', 'TEACHER_BLOCKED'];
const ROOM_CODES: ConflictCode[] = ['ROOM_BUSY', 'ROOM_TOO_SMALL'];

//проверка урок с новым преподавателем/аудиторией с тем же validateDrop
function checkLesson(
  data: ScheduleData,
  lesson: Lesson,
  changes: Partial<Lesson>,
  codes: ConflictCode[],
) {
  const next = { ...lesson, ...changes };

  return validateDrop(data, {
    lessonId: next.id,
    sectionId: next.sectionId,
    teacherId: next.teacherId,
    roomId: next.roomId,
    day: next.day,
    timeSlotId: next.timeSlotId,
  }).filter((c) => codes.includes(c.code));
}

//допустимые преподаватели + конфликты
export function getTeacherOptions(data: ScheduleData, lesson: Lesson): EditOptions[] {
  const section = data.sections.find((s) => s.id === lesson.sectionId);
  const ids = section?.allowedTeacherIds ?? [lesson.teacherId];

  return ids.map((id) => ({
    value: id,
    label: data.teachers.find((t) => t.id === id)?.name ?? id,
    conflicts: checkLesson(data, lesson, { teacherId: id }, TEACHER_CODES),
  }));
}

//аудитории + конфликты
export function getRoomOptions(data: ScheduleData, lesson: Lesson): EditOptions[] {
  return data.rooms.map((room) => ({
    value: room.id,
    label: `${room.name} - ${room.capacity} мест`,
    conflicts: checkLesson(data, lesson, { roomId: room.id }, ROOM_CODES),
  }));
}

//select вариант с конфликтом недоступен
export function toSelectOptions(options: EditOptions[]) {
  return options.map((option) => ({
    value: option.value,
    label:
      option.conflicts.length > 0 ? `${option.label} ${option.conflicts[0].message}` : option.label,
    disabled: option.conflicts.length > 0,
  }));
}
