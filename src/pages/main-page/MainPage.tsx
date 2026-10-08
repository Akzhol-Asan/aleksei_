import { Header } from '@/widgets/header/Header';
import { ScheduleGrid } from '@/widgets/schedule-grid/ScheduleGrid';
import { SideBar } from '@/widgets/side-bar/SideBar';
import styles from './MainPage.module.scss';

export function MainPage() {
  return (
    <div className={styles.main_page}>
      <Header />

      <main className={styles.main_content}>
        <aside className={styles.side_bar}>
          <SideBar />
        </aside>

        <section className={styles.grid}>
          <ScheduleGrid />
        </section>
      </main>
    </div>
  );
}
