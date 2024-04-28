import React, { useState } from 'react';
import './CardList.css';

const CardList = ({ words, onSelectWord, onAddWord, onUpdateWord, onDeleteWord }) => {
  const [editWordId, setEditWordId] = useState(null);
  const [currentWord, setCurrentWord] = useState({ english: '', transcription: '', russian: '' });
  const [newWord, setNewWord] = useState({ english: '', transcription: '', russian: '' });
  const [selectedWord, setSelectedWord] = useState(null); 
  const [showTranslation, setShowTranslation] = useState(false); 

  const handleAddWord = (word) => {
    const newWord = { id: words.length + 1, english: word.english, transcription: word.transcription, russian: word.russian };
    setWords([...words, newWord]);
    setNewWord({ english: '', transcription: '', russian: '' }); 
  };

  const handleEdit = (word) => {
    setEditWordId(word.id);
    setCurrentWord({ ...word });
  };

  const handleSave = (id) => {
    onUpdateWord({ ...currentWord, id: id });
    setEditWordId(null);
    setCurrentWord({ english: '', transcription: '', russian: '' });
  };

  const handleDelete = (id) => {
    onDeleteWord(id);
  };

  const handleCancel = () => {
    setEditWordId(null);
    setCurrentWord({ english: '', transcription: '', russian: '' });
  };

  const handleAdd = () => {
    onAddWord(newWord);
    setNewWord({ english: '', transcription: '', russian: '' });
  };

  const handleSelectWord = (word) => {
    setSelectedWord(word);
    setShowTranslation(false); 
  };

  const handleCloseCard = () => {
    setSelectedWord(null);
  };

  const handleToggleTranslation = () => {
    setShowTranslation(true); 
  };

  return (
    <div>
      <table className="word-table">
        <thead>
          <tr>
            <th>#</th>
            <th>English</th>
            <th>Transcription</th>
            <th>Russian</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {words.map((word, index) => (
            <tr key={word.id}>
              <td>{index + 1}</td>
              {editWordId === word.id ? (
                <>
                  <td>
                    <input
                      type="text"
                      value={currentWord.english}
                      onChange={(e) => setCurrentWord({ ...currentWord, english: e.target.value })}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      value={currentWord.transcription}
                      onChange={(e) => setCurrentWord({ ...currentWord, transcription: e.target.value })}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      value={currentWord.russian}
                      onChange={(e) => setCurrentWord({ ...currentWord, russian: e.target.value })}
                    />
                  </td>
                </>
              ) : (
                <>
                  <td onClick={() => handleSelectWord(word)}>{word.english}</td>
                  <td>{word.transcription}</td>
                  <td>{word.russian}</td>
                </>
              )}
              <td>
                {editWordId === word.id ? (
                  <>
                    <button onClick={() => handleSave(word.id)}>Save</button>
                    <button onClick={handleCancel}>Cancel</button>
                  </>
                ) : (
                  <>
                    <button onClick={() => handleEdit(word)}>Edit</button>
                    <button onClick={() => handleDelete(word.id)}>Delete</button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

     
      {selectedWord && (
        <div className="word-card">
          <h2>{selectedWord.english}</h2>
          <p>Transcription: {selectedWord.transcription}</p>
          {showTranslation && <p>Russian: {selectedWord.russian}</p>}
          <button onClick={handleToggleTranslation}>Show Translation</button> 
          <button onClick={handleCloseCard}>Close</button>
        </div>
      )}

      <div>
        <input
          type="text"
          placeholder="English"
          value={newWord.english}
          onChange={(e) => setNewWord({ ...newWord, english: e.target.value })}
        />
        <input
          type="text"
          placeholder="Transcription"
          value={newWord.transcription}
          onChange={(e) => setNewWord({ ...newWord, transcription: e.target.value })}
        />
        <input
          type="text"
          placeholder="Russian"
          value={newWord.russian}
          onChange={(e) => setNewWord({ ...newWord, russian: e.target.value })}
        />
        <button onClick={handleAdd}>Add Word</button>
      </div>
    </div>
  );
};

export default CardList;