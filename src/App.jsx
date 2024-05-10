import React from 'react';
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

function App() {

  const words = [
    { id: 1, english: 'apple', transcription: '[ˈæpl]', russian: 'яблоко' },
  { id: 2, english: 'orange', transcription: '[ˈɔːrɪndʒ]', russian: 'апельсин' },
  { id: 3, english: 'banana', transcription: '[bəˈnɑːnə]', russian: 'банан' },
  { id: 4, english: 'grape', transcription: '[ɡreɪp]', russian: 'виноград' },
  { id: 5, english: 'watermelon', transcription: '[ˈwɔːtərmelən]', russian: 'арбуз' },
    
  ];

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
          <Route path="/cards" element={<CardList words={words} />} />
          <Route path="/word/:id" element={<WordCard words={words} />} /> 
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
        <Footer /> 
      </div>
    </Router>
  );
}

export default App;
