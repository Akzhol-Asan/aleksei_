import type { LessonsListItem, ScheduleData } from './types';

//собираем готовые данные для карточки секций. название курса, ФИО преподователя...
export function selectSectionListItems(data: ScheduleData) {
  const courseById = new Map(data.courses.map((c) => [c.id, c])); //массив курсов в массив ключ / значение ['C_CS101', { id: 'C_CS101', code: 'CS101', name: 'Основы программирования' }],
  const teacherById = new Map(data.teachers.map((t) => [t.id, t]));

  const lessonsCount = new Map<string, number>();

  for (const l of data.lessons) {
    lessonsCount.set(l.sectionId, (lessonsCount.get(l.sectionId) ?? 0) + 1);
  }

  return data.sections.map((section) => ({
    section,
    courseName: courseById.get(section.courseId)?.name ?? '-',
    teacherName: section.teacherId ? (teacherById.get(section.teacherId)?.name ?? null) : null,
    scheduledCount: lessonsCount.get(section.id) ?? 0,
  }));
}

//Lessons
//Раскладка lessons по ячейкам сетки + названия вместо id

export function getSlotKey(day: string, timeSlotId: string) {
  return `${day}_${timeSlotId}`;
}

export function selectLessonsBySlot(data: ScheduleData) {
  const sectionById = new Map(data.sections.map((s) => [s.id, s]));
  const courseById = new Map(data.courses.map((c) => [c.id, c]));
  const teacherById = new Map(data.teachers.map((t) => [t.id, t]));
  const roomById = new Map(data.rooms.map((r) => [r.id, r]));

  const bySlot = new Map<string, LessonsListItem[]>();

  for (const lesson of data.lessons) {
    const section = sectionById.get(lesson.sectionId);

    const item: LessonsListItem = {
      lesson,
      sectionCode: section?.code ?? '-',
      courseName: section ? (courseById.get(section.courseId)?.name ?? '-') : '-',
      teacherName: teacherById.get(lesson.teacherId)?.shortName ?? '-',
      roomName: roomById.get(lesson.roomId)?.name ?? '-',
    };

    const key = getSlotKey(lesson.day, lesson.timeSlotId);
    const list = bySlot.get(key) ?? [];
    list.push(item);
    bySlot.set(key, list);
  }

  return bySlot;
}
