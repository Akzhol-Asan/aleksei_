import raw from '@/shared/api/mock-data/schedule-mock-data.json';
import type { ScheduleData } from '../model/types';

const DELAY_MS = 600;

//данные из json + заддержка 600мс

export function fetchScheduleData(): Promise<ScheduleData> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        weekDay: raw.meta.weekDays,
        timeSlot: raw.timeSlots,
        courses: raw.courses,
        teachers: raw.teachers,
        rooms: raw.rooms,
        sections: raw.sections,
        teacherBlockedSlots: raw.teacherBlockedSlots,
        lessons: raw.lessons,
      } as ScheduleData); //json отдает данные все string, приводим тип один раз
    }, DELAY_MS);
  });
}
