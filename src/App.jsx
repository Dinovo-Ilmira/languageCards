import React, { useState } from 'react';
import Header from './components/Header/Header';
import Main from './components/Main/Main';
import Footer from './components/Footer/Footer';
import './styles.css';
import CardList from './components/CardList/CardList'; 

function App() {
  const [words, setWords] = useState([
    { id: 1, english: 'wind', transcription: '[wɪnd]', russian: 'ветер' },
    { id: 2, english: 'first', transcription: '[fərst]', russian: 'первый' },
    
  ]);

  const handleAddWord = () => {
    const newWord = { id: words.length + 1, english: '', transcription: '', russian: '' };
    setWords([...words, newWord]);
  };

  const handleUpdateWord = (id) => {
    console.log(`Update word with id ${id}`);
  };

  const handleDeleteWord = (id) => {
    setWords(words.filter(word => word.id !== id));
  };

  return (
    <div className="app">
      <h1>Learn Foreign Words</h1>
      <CardList
        words={words}
        onAddWord={handleAddWord}
        onUpdateWord={handleUpdateWord}
        onDeleteWord={handleDeleteWord}
      />
    </div>
  );
}

export default App;