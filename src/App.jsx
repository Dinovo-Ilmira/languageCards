import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation/Navigation';
import Home from './components/Home/Home';
import Login from './components/Login/Login';
import Contact from './components/Contact/Contact';
import Facts from './components/Facts/Facts';
import Game from './components/Game/Game';
import CardList from './components/CardList/CardList'; 
import WordCard from './components/WordCard/WordCard'; 
import NotFoundPage from './components/NotFoundPage/NotFoundPage';
import Footer from './components/Footer/Footer';
import TextFormatter from './components/TextFormatter/TextFormatter';  

function App() {
  const [wordsLearned, setWordsLearned] = useState(() => {
    const saved = localStorage.getItem("wordsLearned");
    return saved ? JSON.parse(saved) : 0;
  });
  const [words, setWords] = useState(() => {
    const savedWords = localStorage.getItem("words");
    return savedWords ? JSON.parse(savedWords) : [
      { id: 1, english: 'apple', transcription: '[ˈæpl]', russian: 'яблоко' },
      { id: 2, english: 'orange', transcription: '[ˈɔːrɪndʒ]', russian: 'апельсин' },
      { id: 3, english: 'banana', transcription: '[bəˈnɑːnə]', russian: 'банан' },
      { id: 4, english: 'grape', transcription: '[ɡreɪp]', russian: 'виноград' },
      { id: 5, english: 'watermelon', transcription: '[ˈwɔːtərmelən]', russian: 'арбуз' },
    ];
  });

  useEffect(() => {
    localStorage.setItem("wordsLearned", JSON.stringify(wordsLearned));
  }, [wordsLearned]);

  useEffect(() => {
    localStorage.setItem("words", JSON.stringify(words));
  }, [words]);

  const handleWordLearned = () => {
    setWordsLearned(prevCount => prevCount + 1);
  };

  const handleAddWord = (newWord) => {
    setWords(prevWords => [
      ...prevWords,
      { ...newWord, id: prevWords.length + 1 }
    ]);
  };

  return (
    <Router>
      <div className="app">
        <Navigation />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/facts" element={<Facts />} />
          <Route path="/game" element={<Game />} />
          <Route path="/cards" element={<CardList words={words} onAddWord={handleAddWord} />} />
          <Route path="/word/:id" element={<WordCard words={words} onLearned={handleWordLearned} wordsLearned={wordsLearned} />} />
          <Route path="/formatter" element={<TextFormatter />} /> 
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
        <Footer /> 
      </div>
    </Router>
  );
}

export default App;
