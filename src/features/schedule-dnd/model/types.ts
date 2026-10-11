import type { LessonsListItem } from '@/entities/schedule/model/types';
import type { WeekDay } from '@/shared/model/schedule/types';

export type DragData = { type: 'lesson'; item: LessonsListItem };

export type DropData = { type: 'slot'; day: WeekDay; timeSlotId: string };
