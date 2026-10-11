import type { LessonsListItem } from '@/entities/schedule/model/types';
import type { WeekDay } from '@/shared/model/schedule/types';

export type DragData = { type: 'lesson'; item: LessonsListItem };

export type SlotDrop = { type: 'slot'; day: WeekDay; timeSlotId: string };
export type UnassignedDrop = { type: 'unassigned' };
export type DropData = SlotDrop | UnassignedDrop;
