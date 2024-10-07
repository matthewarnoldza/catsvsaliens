import React, { useState } from 'react';
import styles from './RecruitScreen.module.css';
import Catcard from './catcard';

const initialBaits = [
  { id: 1, name: 'Fish Flakes', rarity: 'common', inventory: 3 },
  { id: 2, name: 'Catnip Sprig', rarity: 'common', inventory: 3 },
  { id: 3, name: 'Toy Mouse', rarity: 'common', inventory: 3 },
  { id: 4, name: 'Premium Catnip', rarity: 'uncommon', inventory: 3 },
  { id: 5, name: 'Tuna Can', rarity: 'uncommon', inventory: 3 },
  { id: 6, name: 'Feather Wand', rarity: 'uncommon', inventory: 3 },
  { id: 7, name: 'Silvervine Leaf', rarity: 'rare', inventory: 3 },
  { id: 8, name: 'Salmon Fillet', rarity: 'rare', inventory: 3 },
  { id: 9, name: 'Laser Pointer', rarity: 'rare', inventory: 3 },
  { id: 10, name: 'Golden Koi', rarity: 'legendary', inventory: 3 },
  { id: 11, name: 'Celestial Catnip', rarity: 'legendary', inventory: 3 },
  { id: 12, name: 'Phantom Mice', rarity: 'mythical', inventory: 3 },
];

const catCards = [
  {
    id: 1,
    name: 'Siamese – ShadowPaw',
    hp: 85,
    attack: 75,
    specialMove: 'Silent Strike – Deals double damage from stealth.',
    rarity: 'uncommon',
    attractedBy: ['Feather Wand', 'Silvervine Leaf', 'Laser Pointer']
  },
  {
    id: 2,
    name: 'Persian – The Catnip Queen',
    hp: 110,
    attack: 80,
    specialMove: 'Royal Command – Buffs all allies\' attack by 20% for 2 turns.',
    rarity: 'legendary',
    attractedBy: ['Catnip Sprig', 'Premium Catnip', 'Celestial Catnip']
  },
  {
    id: 3,
    name: 'Maine Coon – The Box Guardian',
    hp: 120,
    attack: 70,
    specialMove: 'Ambush from the Box – Hides in a box, becoming untargetable, then deals 150% damage.',
    rarity: 'rare',
    attractedBy: ['Toy Mouse', 'Salmon Fillet', 'Golden Koi']
  },
  {
    id: 4,
    name: 'Sphynx – Quantum Purr',
    hp: 100,
    attack: 85,
    specialMove: 'Photon Beam – Fires a laser beam, reducing enemy defense by 20%.',
    rarity: 'rare',
    attractedBy: ['Laser Pointer', 'Silvervine Leaf', 'Phantom Mice']
  },
  {
    id: 5,
    name: 'Bengal – Jungle Stalker',
    hp: 95,
    attack: 80,
    specialMove: 'Pounce Strike – Leaps at an enemy, stunning them for one turn.',
    rarity: 'uncommon',
    attractedBy: ['Tuna Can', 'Feather Wand', 'Fish Flakes']
  },
  {
    id: 6,
    name: 'Norwegian Forest Cat – Frostmane',
    hp: 110,
    attack: 75,
    specialMove: 'Glacial Roar – Freezes all enemies, reducing their speed and attack by 15% for two turns.',
    rarity: 'rare',
    attractedBy: ['Salmon Fillet', 'Golden Koi', 'Fish Flakes']
  },
  {
    id: 7,
    name: 'Devon Rex – Trickpaw',
    hp: 75,
    attack: 65,
    specialMove: 'Illusion Dash – Dodges an attack and leaves behind a decoy, reducing enemy accuracy by 30%.',
    rarity: 'common',
    attractedBy: ['Toy Mouse', 'Feather Wand', 'Phantom Mice']
  },
  {
    id: 8,
    name: 'Ragdoll – Dreamweaver',
    hp: 90,
    attack: 60,
    specialMove: 'Sleepy Aura – Puts a random enemy to sleep for two turns.',
    rarity: 'common',
    attractedBy: ['Catnip Sprig', 'Fish Flakes', 'Tuna Can']
  },
  {
    id: 9,
    name: 'Abyssinian – Dune Runner',
    hp: 100,
    attack: 70,
    specialMove: 'Sandstorm Dash – Swift damage, increases speed by 30% for two turns.',
    rarity: 'uncommon',
    attractedBy: ['Tuna Can', 'Salmon Fillet', 'Phantom Mice']
  }
];

const catchRates = {
  common: 0.75,
  uncommon: 0.75,
  rare: 0.50,
  legendary: 0.40,
  mythical: 0.30
};

const RecruitScreen = ({ onCatCaught }) => {
  const [baits, setBaits] = useState(initialBaits);
  const [selectedBait, setSelectedBait] = useState(null);
  const [attractedCat, setAttractedCat] = useState(null);
  const [isWaiting, setIsWaiting] = useState(false);
  const [message, setMessage] = useState('');

  const handleBaitSelect = (bait) => {
    if (bait.inventory > 0) {
      setSelectedBait(bait);
      setIsWaiting(true);
      setAttractedCat(null);
      setMessage('');

      setBaits(prevBaits => prevBaits.map(b => 
        b.id === bait.id ? {...b, inventory: b.inventory - 1} : b
      ));

      setTimeout(() => {
        const catchSuccessful = Math.random() < catchRates[bait.rarity];
        
        if (catchSuccessful) {
          const possibleCats = catCards.filter(cat => cat.attractedBy.includes(bait.name));
          if (possibleCats.length > 0) {
            const randomCat = possibleCats[Math.floor(Math.random() * possibleCats.length)];
            setAttractedCat(randomCat);
            onCatCaught(randomCat);
            setMessage(`Success! You caught a ${randomCat.name}!`);
          } else {
            setMessage(`No cats were attracted to ${bait.name} this time. Try a different bait!`);
          }
        } else {
          setMessage(`Unsuccessful catch with ${bait.name}. The cat got away! Try again!`);
        }
        setIsWaiting(false);
      }, 3000);
    }
  };

  const getBaitImageName = (baitName) => {
    const nameMap = {
      'Phantom Mice': 'phantom-mice.png'
    };
    return nameMap[baitName] || baitName.toLowerCase().replace(/\s+/g, '-') + '.png';
  };

  return (
    <div className={styles.recruitScreen}>
      <div className={styles.baitSection}>
        <h2 className={styles.title}>SELECT BAIT</h2>
        <div className={styles.baitGrid}>
          {baits.map((bait) => (
            <button
              key={bait.id}
              className={`${styles.baitButton} ${styles[bait.rarity]} ${selectedBait === bait ? styles.selected : ''}`}
              onClick={() => handleBaitSelect(bait)}
              disabled={bait.inventory === 0}
            >
              <div className={styles.baitImageContainer}>
                <img 
                  src={`/images/bait/${getBaitImageName(bait.name)}`} 
                  alt={bait.name}
                  className={styles.baitImage}
                />
              </div>
              <span className={styles.baitName}>{bait.name}</span>
              <span className={styles.baitInventory}>x{bait.inventory}</span>
            </button>
          ))}
        </div>
      </div>
      <div className={styles.cardDisplayArea}>
        {isWaiting ? (
          <div className={styles.waitingAnimation}>
            <p>Waiting for a cat...</p>
            <div className={styles.spinner}></div>
          </div>
        ) : message ? (
          <div className={styles.message}>{message}</div>
        ) : null}
        {attractedCat && (
          <Catcard cat={attractedCat} />
        )}
        {!isWaiting && !attractedCat && !message && (
          <p>Select a bait to attract a cat!</p>
        )}
      </div>
    </div>
  );
};

export default RecruitScreen;