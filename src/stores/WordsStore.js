import { makeAutoObservable, action } from "mobx";

class WordsStore {
  words = [];
  loading = true;
  error = null;

  constructor() {
    makeAutoObservable(this, {
      fetchWords: action,
      setWords: action,
      setLoading: action,
      setError: action,
      addWord: action,
      updateWord: action,
      deleteWord: action
    });
    this.fetchWords();
  }

  fetchWords() {
    fetch('https://itgirlschool.justmakeit.ru/api/words')
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Something went wrong ...');
        }
      })
      .then(data => {
        this.setWords(data);
        this.setLoading(false);
      })
      .catch(error => {
        this.setError(error);
        this.setLoading(false);
      });
  }

  setWords(data) {
    this.words = data;
  }

  setLoading(value) {
    this.loading = value;
  }

  setError(error) {
    this.error = error;
  }

  addWord(newWord) {
    const wordWithDefaults = {
      ...newWord,
      tags: "",
      tags_json: "[]"
    };

    fetch('https://itgirlschool.justmakeit.ru/api/words/add', {
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
      this.words.push(data);
    })
    .catch(error => {
      this.setError(error);
    });
  }

  updateWord(updatedWord) {
    fetch(`https://itgirlschool.justmakeit.ru/api/words/${updatedWord.id}/update`, {
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
      const index = this.words.findIndex(word => word.id === updatedWord.id);
      this.words[index] = data;
    })
    .catch(error => {
      this.setError(error);
    });
  }

  deleteWord(id) {
    fetch(`https://itgirlschool.justmakeit.ru/api/words/${id}/delete`, {
      method: 'POST',
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to delete word');
      }
      this.words = this.words.filter(word => word.id !== id);
    })
    .catch(error => {
      this.setError(error);
    });
  }
}

export default new WordsStore();
