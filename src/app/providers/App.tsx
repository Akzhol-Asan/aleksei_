import { ScheduleProvider } from '@/entities/schedule/model/ScheduleProvider';
import { MainPage } from '../../pages/main-page/MainPage';

export function App() {
  return (
    <ScheduleProvider>
      <MainPage />
    </ScheduleProvider>
  );
}
