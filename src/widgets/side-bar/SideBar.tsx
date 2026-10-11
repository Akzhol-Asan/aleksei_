import { SectionCard } from '@/entities/section/ui/SectionCard';
import styles from './SideBar.module.scss';
import { useMemo } from 'react';
import { selectSectionListItems } from '@/entities/schedule/model/selectors';
import { Alert, Spin } from 'antd';
import { useScheduleStore } from '@/entities/schedule/model/scheduleStore';
import { UnassignedDropZone } from '@/features/schedule-dnd/ui/UnassignedDropZone';

export function SideBar() {
  const state = useScheduleStore();

  const items = useMemo(
    () => (state.status === 'ready' ? selectSectionListItems(state.data) : []),
    [state],
  );

  if (state.status === 'loading') return <Spin />;
  if (state.status === 'error') return <Alert type="error" title={state.error} />;
  return (
    <UnassignedDropZone className={styles.side_bar}>
      <div className={styles.side_bar_header}>Учебные секции</div>
      <div className={styles.side_bar_inner}>
        {items.map((item) => (
          <SectionCard key={item.section.id} {...item} />
        ))}
      </div>
    </UnassignedDropZone>
  );
}
