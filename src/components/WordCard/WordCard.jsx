import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './WordCard.css';

const WordCard = ({ words }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  if (!Array.isArray(words) || words.length === 0) {
    return <p>Слова отсутствуют</p>;
  }

  const initialIndex = words.findIndex(word => word.id === parseInt(id));
  const [currentIndex, setCurrentIndex] = useState(initialIndex >= 0 ? initialIndex : 0);
  const [animationClass, setAnimationClass] = useState('');

  const changeWord = (newIndex, direction) => {
    setAnimationClass(direction === 'next' ? 'slide-left' : 'slide-right');
    setCurrentIndex(newIndex);
    navigate(`/word/${words[newIndex].id}`);
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
  const [showTranslation, setShowTranslation] = useState(false);

  return (
    <div className="word-carousel">
      <button className="control-button" onClick={prevWord}>&lt;</button>
      <div className={`word-card ${animationClass}`}>
        <div className="english">{word.english}</div>
        <div className="transcription">{word.transcription}</div>
        {showTranslation && <div className="russian">{word.russian}</div>}
        <button onClick={() => setShowTranslation(!showTranslation)}>
          {showTranslation ? 'Скрыть перевод' : 'Показать перевод'}
        </button>
      </div>
      <button className="control-button" onClick={nextWord}>&gt;</button>
    </div>
  );
};

export default WordCard;
