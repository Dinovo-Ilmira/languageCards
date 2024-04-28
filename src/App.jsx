import React, { useState } from 'react';
import Header from './components/Header/Header';
import Main from './components/Main/Main';
import Footer from './components/Footer/Footer';
import './styles.css';
import CardList from './components/CardList/CardList'; 
import WordCard from './components/WordCard/WordCard';

function App() {
  const [words, setWords] = useState([
    { id: 1, english: 'wind', transcription: '[wɪnd]', russian: 'ветер' },
    { id: 2, english: 'first', transcription: '[fərst]', russian: 'первый' },
    
  ]);
  const [selectedWord, setSelectedWord] = useState(null);

  const handleSelectWord = (word) => {
    setSelectedWord(word);
  };

  const handleAddWord = (newWord) => {
    setWords([...words, { ...newWord, id: Date.now() }]);
  };

  const handleUpdateWord = (updatedWord) => {
    setWords(words.map(word => word.id === updatedWord.id ? updatedWord : word));
    setSelectedWord(null); 
  };

  const handleDeleteWord = (id) => {
    setWords(words.filter(word => word.id !== id));
  };

  return (
    <div className="app">
      <Header />
      {selectedWord && <WordCard word={selectedWord} />}
      <CardList
        words={words}
        onSelectWord={handleSelectWord}
        onAddWord={handleAddWord}
        onUpdateWord={handleUpdateWord}
        onDeleteWord={handleDeleteWord}
      />
      <Footer />
    </div>
  );
}

export default App;
