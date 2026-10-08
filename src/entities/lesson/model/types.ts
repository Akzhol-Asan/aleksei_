import type { WeekDay } from '../../../shared/model/schedule/types';

export interface Lesson {
  id: string;
  sectionId: string;
  teacherId: string;
  roomId: string;
  day: WeekDay;
  timeSlotId: string;
}
