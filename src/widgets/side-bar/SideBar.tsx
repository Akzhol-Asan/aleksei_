import { SectionCard } from '@/entities/section/ui/SectionCard';
import styles from './SideBar.module.scss';
import { useMemo } from 'react';
import { selectSectionListItems } from '@/entities/schedule/model/selectors';
import { Alert, Spin } from 'antd';
import { useSchedule } from '@/entities/schedule/model/useSchedule';

export function SideBar() {
  const state = useSchedule();

  const items = useMemo(
    () => (state.status === 'ready' ? selectSectionListItems(state.data) : []),
    [state],
  );

  if (state.status === 'loading') return <Spin />;
  if (state.status === 'error') return <Alert type="error" title={state.error} />;
  return (
    <div className={styles.side_bar}>
      <div className={styles.side_bar_header}>Учебные секции</div>
      <div className={styles.side_bar_inner}>
        {items.map((item) => (
          <SectionCard key={item.section.id} {...item} />
        ))}
      </div>
    </div>
  );
}
