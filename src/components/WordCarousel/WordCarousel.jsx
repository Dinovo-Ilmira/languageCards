import React, { useState } from 'react';
import WordCard from '../WordCard/WordCard'; 
import './WordCarousel.css';

const WordCarousel = ({ words, initialIndex = 0 }) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);

  const nextWord = () => {
    setCurrentIndex((prev) => (prev + 1) % words.length);
  };

  const prevWord = () => {
    setCurrentIndex((prev) => (prev - 1 + words.length) % words.length);
  };

  if (!words.length) {
    return <div>Слова отсутствуют</div>;
  }

  return (
    <div className="word-carousel">
      <button className="control-button" onClick={prevWord}>&lt;</button>
      <div className="word-card-container">
        <WordCard word={words[currentIndex]} />
      </div>
      <button className="control-button" onClick={nextWord}>&gt;</button>
    </div>
  );
};

export default WordCarousel;
