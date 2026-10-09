import { useEffect, useState, type ReactNode } from 'react';
import { fetchScheduleData } from '../api/fetchScheduleData';
import { ScheduleContext, type ScheduleState } from './ScheduleContext';

export function ScheduleProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<ScheduleState>({ status: 'loading' });

  //выполняется один раз при монтировании
  useEffect(() => {
    fetchScheduleData()
      .then((data) => setState({ status: 'ready', data }))
      .catch(() => setState({ status: 'error', error: 'Failed loading data' }));
  }, []);

  return <ScheduleContext.Provider value={state}>{children}</ScheduleContext.Provider>;
}
