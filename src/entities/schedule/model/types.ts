import type { Course } from '@/entities/course/model/types';
import type { Lesson } from '@/entities/lesson/model/types';
import type { Room } from '@/entities/room/model/types';
import type { Section } from '@/entities/section/model/types';
import type { Teacher } from '@/entities/teacher/model/types';
import type { TimeSlot, WeekDay } from '@/shared/model/schedule/types';

//Типизируем данные расписания из API (пока из нашего JSON)

export interface TeacherBlockedSlot {
  teacherId: string;
  day: WeekDay;
  timeSlotId: string;
  reason: string;
}

export interface ScheduleData {
  weekDay: { id: WeekDay; label: string }[];
  timeSlot: TimeSlot[];
  courses: Course[];
  teachers: Teacher[];
  rooms: Room[];
  sections: Section[];
  teacherBlockedSlots: TeacherBlockedSlot[];
  lessons: Lesson[];
}
