import React, { useState } from 'react';
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
import { WordsProvider } from './WordsContext';

function App() {
  const [wordsLearned, setWordsLearned] = useState(0);

  const handleWordLearned = () => {
    setWordsLearned(prevCount => prevCount + 1);
  };

  return (
    <WordsProvider>
      <Router>
        <div className="app">
          <Navigation />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/facts" element={<Facts />} />
            <Route path="/game" element={<Game />} />
            <Route path="/cards" element={<CardList />} />
            <Route path="/word/:id" element={<WordCard onLearned={handleWordLearned} wordsLearned={wordsLearned} />} />
            <Route path="/word" element={<WordCard onLearned={handleWordLearned} wordsLearned={wordsLearned} />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
          <Footer />
        </div>
      </Router>
    </WordsProvider>
  );
}

export default App;
