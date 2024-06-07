import React, { createContext, useState, useEffect } from 'react';
import LoadingSpinner from './components/LoadingSpinner/LoadingSpinner'; 

export const WordsContext = createContext();

export const WordsProvider = ({ children }) => {
  const [words, setWords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('https://itgirlschool.justmakeit.ru/api/words')
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Something went wrong ...');
        }
      })
      .then(data => {
        setWords(data);
        setLoading(false);
      })
      .catch(error => {
        setError(error);
        setLoading(false);
      });
  }, []);

  const addWord = (newWord) => {
    fetch('https://itgirlschool.justmakeit.ru/api/words/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newWord),
    })
    .then(response => response.json())
    .then(data => {
      setWords(prevWords => [...prevWords, data]);
    })
    .catch(error => {
      setError(error);
    });
  };

  const updateWord = (updatedWord) => {
    fetch(`https://itgirlschool.justmakeit.ru/api/words/${updatedWord.id}/update`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedWord),
    })
    .then(response => response.json())
    .then(data => {
      setWords(prevWords => prevWords.map(word => word.id === updatedWord.id ? data : word));
    })
    .catch(error => {
      setError(error);
    });
  };

  const deleteWord = (id) => {
    fetch(`https://itgirlschool.justmakeit.ru/api/words/${id}/delete`, {
      method: 'POST',
    })
    .then(() => {
      setWords(prevWords => prevWords.filter(word => word.id !== id));
    })
    .catch(error => {
      setError(error);
    });
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <WordsContext.Provider value={{ words, addWord, updateWord, deleteWord, loading, error }}>
      {children}
    </WordsContext.Provider>
  );
};
