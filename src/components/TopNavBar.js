import React from 'react';
import styles from './TopNavBar.module.css';

function TopNavBar({ setCurrentScreen }) {
  return (
    <nav className={styles.topNavBar}>
      <div className={styles.navLogo}>CATS VS ALIENS</div>
      <ul className={styles.navLinks}>
        <li><button onClick={() => setCurrentScreen('recruit')}>Recruit</button></li>
        <li><button onClick={() => setCurrentScreen('collection')}>Collection</button></li>
        <li><button onClick={() => setCurrentScreen('battle')}>Battle</button></li>
      </ul>
    </nav>
  );
}

export default TopNavBar;
