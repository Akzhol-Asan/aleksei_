import type { LessonsListItem, SectionListItem } from '@/entities/schedule/model/types';
import type { WeekDay } from '@/shared/model/schedule/types';

export type DragData =
  { type: 'lesson'; item: LessonsListItem } | { type: 'section'; item: SectionListItem };

export type SlotDrop = { type: 'slot'; day: WeekDay; timeSlotId: string };
export type UnassignedDrop = { type: 'unassigned' };
export type DropData = SlotDrop | UnassignedDrop;
