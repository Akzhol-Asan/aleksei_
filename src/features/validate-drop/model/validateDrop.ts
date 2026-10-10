import type { ScheduleData } from '@/entities/schedule/model/types';
import type { WeekDay } from '@/shared/model/schedule/types';

export interface DropCandidate {
  sectionId: string;
  teacherId: string | null;
  roomId: string | null;
  day: WeekDay;
  timeSlotId: string;
  lessonId?: string;
}

export type ConflictCode =
  'SECTION_BUSY' | 'TEACHER_BUSY' | 'ROOM_BUSY' | 'TEACHER_BLCOKED' | 'ROOM_TOO_SMALL';

export interface Conflict {
  code: ConflictCode;
  message: string;
}

export function validateDrop(data: ScheduleData, c: DropCandidate): Conflict[] {
  const conflicts: Conflict[] = [];

  const section = data.sections.find((s) => s.id === c.sectionId);
  const sectionCode = (id: string) => data.sections.find((s) => s.id === id)?.code ?? id;

  const sameSlot = data.lessons.filter(
    (l) => l.day === c.day && l.timeSlotId === c.timeSlotId && l.id !== c.lessonId,
  );

  if (sameSlot.some((l) => l.sectionId === c.sectionId)) {
    conflicts.push({ code: 'SECTION_BUSY', message: 'У секции есть другое занятие в это время' });
  }

  if (c.teacherId) {
    const busy = sameSlot.find((l) => l.teacherId === c.teacherId);
    if (busy) {
      conflicts.push({
        code: 'TEACHER_BUSY',
        message: 'Преподователь занят в это время',
      });
    }

    const blocked = data.teacherBlockedSlots.find(
      (b) => b.teacherId === c.teacherId && b.day === c.day && b.timeSlotId === c.timeSlotId,
    );

    if (blocked) {
      conflicts.push({
        code: 'TEACHER_BLCOKED',
        message: `Преподователь - ${blocked.reason} занят в это время`,
      });
    }

    if (c.roomId) {
      const room = data.rooms.find((r) => r.id === c.roomId);

      const busy = sameSlot.find((l) => l.roomId === c.roomId);
      if (busy) {
        conflicts.push({
          code: 'ROOM_BUSY',
          message: `Данная удитория занята (${sectionCode(busy.sectionId)})`,
        });
      }

      if (room && section && room.capacity < section.studentsCount) {
        conflicts.push({
          code: 'ROOM_TOO_SMALL',
          message: `Данная Аудитория вмещает ${room.capacity}, а в секции ${section.studentsCount} студентов`,
        });
      }
    }
  }

  return conflicts;
}
