import type { ScheduleData } from './types';

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
