import React from 'react';
import './WordCard.css';
import '../../styles.css';

function WordCard({ word }) {
  
  return (
    <div className="word-card">
      <h3>{word.term}</h3>
      <p>{word.transcription}</p>
      <p>{word.translation}</p>
      
    </div>
  );
}

export default WordCard;
