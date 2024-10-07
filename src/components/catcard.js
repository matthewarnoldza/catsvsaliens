import React from 'react';
import styles from './catcard.module.css';

const catcard = ({ cat }) => {
  const getImageName = (catName) => {
    const nameMap = {
      'Siamese – ShadowPaw': 'siamese-shadowpaw',
      'Persian – The Catnip Queen': 'persian-the-catnip-queen',
      'Maine Coon – The Box Guardian': 'maine-coon-the-box-guardian',
      'Sphynx – Quantum Purr': 'sphynx-quantum-purr',
      'Bengal – Jungle Stalker': 'bengal-jungle-stalker',
      'Norwegian Forest Cat – Frostmane': 'norwegian-forest-cat-frostmane',
      'Devon Rex – Trickpaw': 'devon-rex-trickpaw',
      'Ragdoll – Dreamweaver': 'ragdoll-dreamweaver',
      'Abyssinian – Dune Runner': 'abyssinian-dune-runner'
    };
    return nameMap[catName] || catName.toLowerCase().replace(/[–\s]/g, '-').replace(/[^a-z0-9-]/g, '');
  };

  const imageName = getImageName(cat.name) + '.png';

  const getRarityClass = (rarity) => {
    const rarityLower = rarity.toLowerCase();
    return styles[rarityLower] || styles.common; // Default to common if rarity is not recognized
  };

  return (
    <div className={styles.catCard}>
      <div className={styles.catImageContainer}>
        <img 
          src={`/images/cats/${imageName}`} 
          alt={cat.name} 
          className={styles.catImage}
        />
      </div>
      <div className={styles.catInfo}>
        <h3 className={styles.catName}>{cat.name}</h3>
        <div className={styles.catStats}>
          <div className={styles.statItem}>
            <span className={styles.statIcon}>❤️</span>
            <span>{cat.hp} HP</span>
          </div>
          <div className={styles.statItem}>
            <span className={styles.statIcon}>⚔️</span>
            <span>{cat.attack} ATK</span>
          </div>
        </div>
        <p className={styles.specialMove}>Special Move: {cat.specialMove}</p>
        <p className={`${styles.catRarity} ${getRarityClass(cat.rarity)}`}>{cat.rarity}</p>
      </div>
    </div>
  );
};

export default catcard;
