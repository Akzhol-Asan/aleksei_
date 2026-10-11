import { BankTwoTone } from '@ant-design/icons';
import styles from './Header.module.scss';

export function Header() {
  return (
    <div className={styles.header}>
      <BankTwoTone />
      <h3>University Scheduler</h3>
    </div>
  );
}
