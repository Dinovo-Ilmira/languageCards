import React from 'react';
import './Facts.css';

const Facts = () => {
  const facts = [
    {
      id: 1,
      title: "English is the Global Language",
      description: "English is spoken by more than 1.5 billion people worldwide, making it the most widely spoken language in the world.",
      image: "path/to/global_language_image.jpg"
    },
    {
      id: 2,
      title: "Longest Word in English",
      description: "The longest word in English is pneumonoultramicroscopicsilicovolcanoconiosis, a type of lung disease caused by inhaling very fine ash and sand dust.",
      image: "path/to/longest_word_image.jpg"
    },
    {
      id: 3,
      title: "English Has Over 1 Million Words",
      description: "The Oxford English Dictionary lists over 600,000 words, but there are more than 1 million words in the English language.",
      image: "path/to/million_words_image.jpg"
    },
    {
      id: 4,
      title: "The Most Common Letter",
      description: "The letter 'E' is the most commonly used letter in the English language.",
      image: "path/to/letter_e_image.jpg"
    }
  ];

  return (
    <div className="facts-container">
      <h1>Interesting Facts about English</h1>
      <p>Here you can explore some fascinating facts about the English language.</p>
      <div className="facts-list">
        {facts.map((fact) => (
          <div key={fact.id} className="fact-card">
            <img src={fact.image} alt={fact.title} className="fact-image" />
            <h2 className="fact-title">{fact.title}</h2>
            <p className="fact-description">{fact.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Facts;
