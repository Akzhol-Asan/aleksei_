export type WeekDay = 'MON' | 'TUE' | 'WED' | 'THU' | 'FRI';
export type RoomType = 'LECTURE' | 'COMPUTER_LAB';

export interface TimeSlot {
  id: string;
  start: string;
  end: string;
}
