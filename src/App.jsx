import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import './styles.css';
import CardList from './components/CardList/CardList';
import WordCard from './components/WordCard/WordCard';

function App() {
  const [words, setWords] = useState([
    { id: 1, english: 'wind', transcription: '[wɪnd]', russian: 'ветер' },
    { id: 2, english: 'first', transcription: '[fərst]', russian: 'первый' },
  ]);

  return (
    <Router>
      <div className="app">
        <Header />
        <Routes>
          <Route path="/" element={<CardList words={words} />} />
          <Route path="/word/:id" element={
            <>
              <Link to="/" className="back-link">Back to All Words</Link>
              <WordCard words={words} />
            </>
          } />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
