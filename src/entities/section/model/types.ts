import type { RoomType } from '../../../shared/model/schedule/types';

export interface Section {
  id: string;
  courseId: string;
  code: string;
  studentsCount: number;
  requiredLessonsPerWeek: number;
  teacherId: string | null;
  allowedTeacherIds: string[];
  preferredRoomType: RoomType;
}
