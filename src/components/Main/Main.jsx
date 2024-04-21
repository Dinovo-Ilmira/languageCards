import React from 'react';
import CardList from '../CardList/CardList';
import './Main.css';
import '../../styles.css';

const words = [
  { id: 1, term: "Hello", transcription: "həˈləʊ", translation: "Привет", nickname: "Приветствие" },
 
];

const Main = () => {
  return (
    <main className="main">
      <CardList words={words} /> 
    </main>
  );
}

export default Main;
