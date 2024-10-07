import React, { useState, useEffect } from 'react';
import styles from './BattleScreen.module.css';
import CatCard from './catcard';
import DogCard from './dogcard';
import { dogs } from '../dogData';

const BattleScreen = ({ collectedCats }) => {
  const [selectedCat, setSelectedCat] = useState(collectedCats[0]);
  const [randomDog, setRandomDog] = useState(null);
  const [catHealth, setCatHealth] = useState(100);
  const [dogHealth, setDogHealth] = useState(100);
  const [battleLog, setBattleLog] = useState([]);
  const [catRoll, setCatRoll] = useState(null);
  const [dogRoll, setDogRoll] = useState(null);
  const [isUserTurn, setIsUserTurn] = useState(true);

  const catAttackDescriptions = [
    "uses its powerful tail to whip",
    "pounces with lightning speed on",
    "unleashes a fierce meow, stunning",
    "swipes with razor-sharp claws at",
    "performs a graceful aerial somersault, landing on",
    "uses its hypnotic gaze to confuse",
    "launches a furball projectile at",
    "channels its inner tiger and roars at",
    "executes a perfect ninja-kick on",
    "summons a hairball of doom, hurling it at"
  ];

  const dogAttackDescriptions = [
    "unleashes a cosmic bark, disorienting",
    "teleports behind and surprises",
    "shoots laser beams from its eyes at",
    "grows to giant size and stomps on",
    "opens a portal, summoning space fleas to attack",
    "morphs its paw into a tentacle, grabbing",
    "emits an otherworldly howl, confusing",
    "creates a black hole, pulling in",
    "shape-shifts into a doppelganger of",
    "activates its anti-gravity collar, lifting and dropping"
  ];

  useEffect(() => {
    // Select a random dog when the component mounts
    setRandomDog(dogs[Math.floor(Math.random() * dogs.length)]);
  }, []);

  const rollD20 = () => Math.floor(Math.random() * 20) + 1;

  const getRandomAttackDescription = (attacker) => {
    if (attacker === 'cat') {
      return catAttackDescriptions[Math.floor(Math.random() * catAttackDescriptions.length)];
    } else {
      return dogAttackDescriptions[Math.floor(Math.random() * dogAttackDescriptions.length)];
    }
  };

  const attack = (attacker, defender, attackerRoll, defenderRoll) => {
    const damage = Math.max(0, attackerRoll - defenderRoll);
    const newHealth = Math.max(0, defender === 'dog' ? dogHealth - damage : catHealth - damage);
    
    if (defender === 'dog') {
      setDogHealth(newHealth);
    } else {
      setCatHealth(newHealth);
    }

    const attackDescription = getRandomAttackDescription(attacker);
    const logMessage = {
      text: `${attacker === 'cat' ? selectedCat.name : randomDog.name} ${attackDescription} ${defender === 'cat' ? selectedCat.name : randomDog.name} for ${damage} damage!`,
      isCatAttack: attacker === 'cat'
    };
    setBattleLog(prevLog => [logMessage, ...prevLog]); // Add new log message to the beginning of the array
  };

  const handleCatAttack = () => {
    if (!isUserTurn) return;

    const newCatRoll = rollD20();
    const newDogRoll = rollD20();
    setCatRoll(newCatRoll);
    setDogRoll(newDogRoll);

    attack('cat', 'dog', newCatRoll, newDogRoll);
    setIsUserTurn(false);

    // Schedule dog's attack after 2 seconds
    setTimeout(handleDogAttack, 2000);
  };

  const handleDogAttack = () => {
    const newCatRoll = rollD20();
    const newDogRoll = rollD20();
    setCatRoll(newCatRoll);
    setDogRoll(newDogRoll);

    attack('dog', 'cat', newDogRoll, newCatRoll);
    setIsUserTurn(true);
  };

  const getHealthBarColor = (health) => {
    if (health <= 25) return styles.redHealth;
    if (health <= 50) return styles.orangeHealth;
    if (health <= 75) return styles.yellowHealth;
    return styles.greenHealth;
  };

  return (
    <div className={styles.battleScreen}>
      <div className={styles.catSelectContainer}>
        <select 
          className={styles.catSelect}
          onChange={(e) => setSelectedCat(collectedCats.find(cat => cat.name === e.target.value))}
        >
          <option value="">Select a cat</option>
          {collectedCats.map(cat => (
            <option key={cat.name} value={cat.name}>{cat.name}</option>
          ))}
        </select>
      </div>
      <div className={styles.battleArea}>
        <div className={styles.cardContainer}>
          <img src="/images/d20.png" alt="D20" className={styles.d20} />
          {catRoll && <div className={styles.rollResult}>{catRoll}</div>}
          <div className={styles.catCardWrapper}>
            {selectedCat && <CatCard cat={selectedCat} />}
          </div>
          <div className={styles.healthBarContainer}>
            <div 
              className={`${styles.healthBar} ${getHealthBarColor(catHealth)}`} 
              style={{width: `${catHealth}%`}}
            >
              <span className={styles.healthText}>{Math.round(catHealth)}%</span>
            </div>
          </div>
        </div>
        <div className={styles.vs}>VS</div>
        <div className={styles.cardContainer}>
          <img src="/images/d20.png" alt="D20" className={styles.d20} />
          {dogRoll && <div className={styles.rollResult}>{dogRoll}</div>}
          <div className={styles.dogCardWrapper}>
            {randomDog && <DogCard dog={randomDog} />}
          </div>
          <div className={styles.healthBarContainer}>
            <div 
              className={`${styles.healthBar} ${getHealthBarColor(dogHealth)}`} 
              style={{width: `${dogHealth}%`}}
            >
              <span className={styles.healthText}>{Math.round(dogHealth)}%</span>
            </div>
          </div>
        </div>
      </div>
      <button 
        className={styles.attackButton} 
        onClick={handleCatAttack}
        disabled={!isUserTurn}
      >
        {isUserTurn ? "Attack" : "Waiting for dog's attack..."}
      </button>
      <div className={styles.battleLog}>
        <h3>Battle Log</h3>
        {battleLog.map((log, index) => (
          <p 
            key={index} 
            className={log.isCatAttack ? styles.catAttackLog : styles.dogAttackLog}
          >
            {log.text}
          </p>
        ))}
      </div>
    </div>
  );
};

export default BattleScreen;