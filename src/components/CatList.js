import React from 'react';
import { cats } from '../catData';
import CatCard from './catcard';

const CatList = () => {
  return (
    <div>
      <h2>Cat Collection</h2>
      {cats.map(cat => (
        <CatCard key={cat.name} cat={cat} />
      ))}
    </div>
  );
};

export default CatList;
