import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import './WordCard.css';

const WordCard = ({ words, onLearned, wordsLearned }) => {
  const { id } = useParams();
  const showTranslationButtonRef = useRef(null);

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

    if (showTranslationButtonRef.current) {
      showTranslationButtonRef.current.focus();
    }

    return () => clearTimeout(timer);
  }, [currentIndex]);

  const handleShowTranslation = () => {
    setShowTranslation(true);
    onLearned(); 
  };

  const word = words[currentIndex];

  return (
    <div className="word-card-container">
      <Link to="/cards" className="back-link">Back to All Words</Link>
      <h1>Words Learned: {wordsLearned}</h1>
      <div className="word-carousel">
        <button className="control-button" onClick={prevWord}>&lt;</button>
        <div className={`word-card ${animationClass}`}>
          <div className="english">{word.english}</div>
          <div className="transcription">{word.transcription}</div>
          {showTranslation && <div className="russian">{word.russian}</div>}
          {!showTranslation && (
            <button
              ref={showTranslationButtonRef}
              onClick={handleShowTranslation}
            >
              Показать перевод
            </button>
          )}
        </div>
        <button className="control-button" onClick={nextWord}>&gt;</button>
      </div>
    </div>
  );
};

export default WordCard;
