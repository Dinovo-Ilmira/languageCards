import React, { useState } from 'react';
import './WordCard.css';
import '../../styles.css';


const WordCard = ({ word }) => {
  const [showTranslation, setShowTranslation] = useState(false);

  return (
    <div className="word-card">
      <div className="english">{word.english}</div>
      <div className="transcription">{word.transcription}</div>
      {showTranslation && <div className="russian">{word.russian}</div>}
      <button onClick={() => setShowTranslation(!showTranslation)}>
        {showTranslation ? 'Скрыть' : 'Показать перевод'}
      </button>
    </div>
  );
};

export default WordCard;