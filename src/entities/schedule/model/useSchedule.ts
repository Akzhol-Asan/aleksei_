import { useContext } from 'react';
import { ScheduleContext } from './ScheduleContext';

//если компонент оказался вне провайдера, показываем ошибку
export function useSchedule() {
  const ctx = useContext(ScheduleContext);
  if (!ctx) throw new Error('useChedule must be used inside SheduleProvider u know..');
  return ctx;
}
