import React from 'react';
import styles from './dogcard.module.css';

const DogCard = ({ dog }) => {
  return (
    <div className={styles.catCard}>
      <div className={styles.catImageContainer}>
        <img 
          src={`/images/dogs/${dog.image}`} 
          alt={dog.name} 
          className={styles.catImage}
        />
      </div>
      <div className={styles.catInfo}>
        <h3 className={styles.catName}>{dog.name}</h3>
        <div className={styles.catStats}>
          <div className={styles.statItem}>
            <span className={styles.statIcon}>❤️</span>
            <span>{dog.health} HP</span>
          </div>
          <div className={styles.statItem}>
            <span className={styles.statIcon}>⚔️</span>
            <span>{dog.attack} ATK</span>
          </div>
        </div>
        <p className={styles.specialMove}>{dog.description}</p>
      </div>
    </div>
  );
};

export const dogs = [
  {
    name: "Slime Hound",
    health: 130,
    attack: 60,
    description: "A bulldog oozing with glowing slime that slows and sticks to everything it touches.",
    image: "slime_hound.png"
  },
  {
    name: "Tentacle Paws",
    health: 120,
    attack: 70,
    description: "A Labrador with tentacles instead of legs, capable of grabbing and pulling enemies closer.",
    image: "tentacle_paws.png"
  },
  {
    name: "Levitation Stalker",
    health: 110,
    attack: 75,
    description: "A Doberman that hovers silently above the ground, striking from unexpected angles.",
    image: "levitation_stalker.png"
  },
  {
    name: "Mind Bender",
    health: 90,
    attack: 65,
    description: "A Poodle with multiple hypnotic eyes that can control the minds of its enemies.",
    image: "mind_bender.png"
  },
  {
    name: "Echo Howler",
    health: 100,
    attack: 80,
    description: "A Beagle that unleashes powerful sonic blasts, disorienting everything in its path.",
    image: "echo_howler.png"
  },
  {
    name: "Void Walker",
    health: 140,
    attack: 85,
    description: "A Great Dane that can phase in and out of existence, pulling enemies into a dark void.",
    image: "void_walker.png"
  }
];

export default DogCard;
