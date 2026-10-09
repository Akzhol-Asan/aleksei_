import { createContext } from 'react';
import type { ScheduleData } from './types';

//union instead of отдельных флагов
export type ScheduleState =
  | { status: 'loading' }
  | { status: 'error'; error: string }
  | { status: 'ready'; data: ScheduleData };

//по умолчанию null что-бы ловить использование вне провайдера
export const ScheduleContext = createContext<ScheduleState | null>(null);
