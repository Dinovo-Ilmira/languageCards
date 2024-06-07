import React, { useState, useEffect, useRef, useContext } from 'react';
import { Link } from 'react-router-dom';
import styles from './WordCard.module.css';
import { WordsContext } from '../../WordsContext';

const WordCard = ({ onLearned, wordsLearned }) => {
  const { words } = useContext(WordsContext);
  const showTranslationButtonRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showTranslation, setShowTranslation] = useState(false);

  useEffect(() => {
    if (showTranslationButtonRef.current) {
      showTranslationButtonRef.current.focus();
    }
  }, [currentIndex]);

  if (!Array.isArray(words) || words.length === 0) {
    return <p>Слова отсутствуют</p>;
  }

  const word = words[currentIndex];

  const nextWord = () => {
    setCurrentIndex((currentIndex + 1) % words.length);
    setShowTranslation(false);
  };

  const prevWord = () => {
    setCurrentIndex((currentIndex - 1 + words.length) % words.length);
    setShowTranslation(false);
  };

  const handleShowTranslation = () => {
    setShowTranslation(true);
    onLearned();
  };

  return (
    <div className={styles.wordCardContainer}>
      <Link to="/cards" className={styles.backLink}>Back to All Words</Link>
      <h1>Words Learned: {wordsLearned}</h1>
      <div className={styles.wordCarousel}>
        <button className={styles.controlButton} onClick={prevWord}>&lt;</button>
        <div className={styles.wordCard}>
          <div className={styles.english}>{word.english}</div>
          <div className={styles.transcription}>{word.transcription}</div>
          {showTranslation ? (
            <div className={styles.russian}>{word.russian}</div>
          ) : (
            <button
              ref={showTranslationButtonRef}
              onClick={handleShowTranslation}
            >
              Показать перевод
            </button>
          )}
        </div>
        <button className={styles.controlButton} onClick={nextWord}>&gt;</button>
      </div>
    </div>
  );
};

export default WordCard;
