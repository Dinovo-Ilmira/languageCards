import React, { createContext, useState, useEffect } from 'react';
import LoadingSpinner from './components/LoadingSpinner/LoadingSpinner'; 
import ErrorDisplay from './components/CardList/ErrorDisplay/ErrorDisplay'; 

export const WordsContext = createContext();

export const WordsProvider = ({ children }) => {
  const [words, setWords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('http://itgirlschool.justmakeit.ru/api/words') // Изменено для проверки
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
        console.error('Error fetching words:', error);
        setError(error);
        setLoading(false);
      });
  }, []);

  const addWord = (newWord) => {
    const wordWithDefaults = {
      ...newWord,
      tags: "",
      tags_json: "[]"
    };

    fetch('http://itgirlschool.justmakeit.ru/api/words/add', { // Изменено для проверки
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(wordWithDefaults),
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to add word');
      }
      return response.json();
    })
    .then(data => {
      setWords(prevWords => [...prevWords, data]);
    })
    .catch(error => {
      console.error('Error adding word:', error);
      setError(error);
    });
  };

  const updateWord = (updatedWord) => {
    fetch(`http://itgirlschool.justmakeit.ru/api/words/${updatedWord.id}/update`, { // Изменено для проверки
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedWord),
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to update word');
      }
      return response.json();
    })
    .then(data => {
      setWords(prevWords => prevWords.map(word => word.id === updatedWord.id ? data : word));
    })
    .catch(error => {
      console.error('Error updating word:', error);
      setError(error);
    });
  };

  const deleteWord = (id) => {
    fetch(`http://itgirlschool.justmakeit.ru/api/words/${id}/delete`, { // Изменено для проверки
      method: 'POST',
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to delete word');
      }
      setWords(prevWords => prevWords.filter(word => word.id !== id));
    })
    .catch(error => {
      console.error('Error deleting word:', error);
      setError(error);
    });
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErrorDisplay message={error.message} />;
  }

  return (
    <WordsContext.Provider value={{ words, addWord, updateWord, deleteWord, loading, error }}>
      {children}
    </WordsContext.Provider>
  );
};
