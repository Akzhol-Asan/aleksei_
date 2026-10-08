import type { RoomType } from '../../../shared/model/schedule/types';

export interface Room {
  id: string;
  name: string;
  capacity: number;
  type: RoomType;
}
