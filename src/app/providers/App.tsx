import { MainPage } from '../../pages/main-page/MainPage';
import { useScheduleStore } from '@/entities/schedule/model/scheduleStore';
import { useEffect } from 'react';

export function App() {
  const load = useScheduleStore((s) => s.load);

  //загружаем данные 1 раз при старте
  useEffect(() => {
    load();
  }, [load]);

  return <MainPage />;
}
