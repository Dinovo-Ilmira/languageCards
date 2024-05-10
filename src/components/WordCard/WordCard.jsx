import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './WordCard.css';

const WordCard = ({ words }) => {
  const { id } = useParams();
  
  if (!Array.isArray(words) || words.length === 0) {
    return <p>Слова отсутствуют</p>;
  }

  const initialIndex = words.findIndex(word => word.id === parseInt(id));
  const [currentIndex, setCurrentIndex] = useState(initialIndex >= 0 ? initialIndex : 0);
  const [animationClass, setAnimationClass] = useState('');
  const [showTranslation, setShowTranslation] = useState(false);

  const changeWord = (newIndex, direction) => {
    setAnimationClass(direction === 'next' ? 'slide-left' : 'slide-right');
    setShowTranslation(false); 
    setCurrentIndex(newIndex);
  };

  const nextWord = () => {
    const newIndex = (currentIndex + 1) % words.length;
    changeWord(newIndex, 'next');
  };

  const prevWord = () => {
    const newIndex = (currentIndex - 1 + words.length) % words.length;
    changeWord(newIndex, 'prev');
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimationClass(''); 
    }, 500); 

    return () => clearTimeout(timer);
  }, [currentIndex]);

  const word = words[currentIndex];

  return (
    <div className="word-carousel">
      <button className="control-button" onClick={prevWord}>&lt;</button>
      <div className={`word-card ${animationClass}`}>
        <div className="english">{word.english}</div>
        <div className="transcription">{word.transcription}</div>
        {showTranslation && <div className="russian">{word.russian}</div>}
        {!showTranslation && (
          <button onClick={() => setShowTranslation(true)}>Показать перевод</button>
        )}
      </div>
      <button className="control-button" onClick={nextWord}>&gt;</button>
    </div>
  );
};

export default WordCard;
