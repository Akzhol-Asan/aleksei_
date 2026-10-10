import type { Lesson } from '@/entities/lesson/model/types';
import type { ScheduleData } from './types';
import type { WeekDay } from '@/shared/model/schedule/types';
import { create } from 'zustand';
import { fetchScheduleData } from '../api/fetchScheduleData';

type ScheduleState =
  | { status: 'loading' }
  | { status: 'error'; error: string }
  | { status: 'ready'; data: ScheduleData };

interface ScheduleActions {
  load: () => Promise<void>;
  addLesson: (lesson: Lesson) => void;
  moveLesson: (lessonId: string, day: WeekDay, timeSlotId: string) => void;
  removeLesson: (lessonId: string) => void;
  updateLesson: (lessonId: string, changes: Partial<Pick<Lesson, 'teacherId' | 'roomId'>>) => void;
}

export const useScheduleStore = create<ScheduleState & ScheduleActions>()((set, get) => {
  const updateLessons = (fn: (lessons: Lesson[]) => Lesson[]) => {
    const state = get();
    if (state.status !== 'ready') return;
    set({ data: { ...state.data, lessons: fn(state.data.lessons) } });
  };

  return {
    status: 'loading',
    load: async () => {
      set({ status: 'loading' });

      try {
        const data = await fetchScheduleData();
        set({ status: 'ready', data });
      } catch {
        set({ status: 'error', error: 'Не удалось загрузить данные' });
      }
    },

    addLesson: (lesson) => updateLessons((lessons) => [...lessons, lesson]),

    moveLesson: (LessonId, day, timeSlotId) =>
      updateLessons((lessons) =>
        lessons.map((l) => (l.id === LessonId ? { ...l, day, timeSlotId } : l)),
      ),

    removeLesson: (lessonId) =>
      updateLessons((lessons) => lessons.filter((l) => l.id !== lessonId)),

    updateLesson: (lessonId, changes) =>
      updateLessons((lessons) =>
        lessons.map((l) => (l.id === lessonId ? { ...l, ...changes } : l)),
      ),
  };
});
