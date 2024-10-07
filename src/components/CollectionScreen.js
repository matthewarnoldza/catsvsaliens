import React, { useState } from 'react';
import styles from './CollectionScreen.module.css';
import Catcard from './catcard'; // Make sure this import is correct

const rarityOptions = ['All', 'Common', 'Uncommon', 'Rare', 'Legendary', 'Mythical'];

const CollectionScreen = ({ collectedCats }) => {
  const [selectedRarity, setSelectedRarity] = useState('All');

  const filteredCats = selectedRarity === 'All'
    ? collectedCats
    : collectedCats.filter(cat => cat.rarity.toLowerCase() === selectedRarity.toLowerCase());

  return (
    <div className={styles.collectionScreen}>
      <div className={styles.filterContainer}>
        <select 
          className={styles.rarityFilter}
          value={selectedRarity}
          onChange={(e) => setSelectedRarity(e.target.value)}
        >
          {rarityOptions.map(option => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>
      </div>
      <div className={styles.gridContainer}>
        <div className={styles.cardGrid}>
          {filteredCats.map(cat => (
            <Catcard key={cat.id} cat={cat} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CollectionScreen;
