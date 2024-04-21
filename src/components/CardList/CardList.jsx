import React, { useState } from 'react';
import './CardList.css';

const CardList = ({ words, onAddWord, onUpdateWord, onDeleteWord }) => {
  const [editWordId, setEditWordId] = useState(null);
  const [newWord, setNewWord] = useState({ english: '', transcription: '', russian: '' });

  const handleEdit = (id) => {
    setEditWordId(id);
  };

  const handleSave = (id) => {
    onUpdateWord(id);
    setEditWordId(null);
  };

  const handleDelete = (id) => {
    onDeleteWord(id);
  };

  const handleAdd = () => {
    onAddWord(newWord);
    setNewWord({ english: '', transcription: '', russian: '' });
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
                  <td><input type="text" defaultValue={word.english} /></td>
                  <td><input type="text" defaultValue={word.transcription} /></td>
                  <td><input type="text" defaultValue={word.russian} /></td>
                </>
              ) : (
                <>
                  <td>{word.english}</td>
                  <td>{word.transcription}</td>
                  <td>{word.russian}</td>
                </>
              )}
              <td>
                {editWordId === word.id ? (
                  <>
                    <button onClick={() => handleSave(word.id)}>Save</button>
                    <button onClick={() => setEditWordId(null)}>Cancel</button>
                  </>
                ) : (
                  <>
                    <button onClick={() => handleEdit(word.id)}>Edit</button>
                    <button onClick={() => handleDelete(word.id)}>Delete</button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <input type="text" placeholder="English" value={newWord.english} onChange={(e) => setNewWord({ ...newWord, english: e.target.value })} />
        <input type="text" placeholder="Transcription" value={newWord.transcription} onChange={(e) => setNewWord({ ...newWord, transcription: e.target.value })} />
        <input type="text" placeholder="Russian" value={newWord.russian} onChange={(e) => setNewWord({ ...newWord, russian: e.target.value })} />
        <button onClick={handleAdd}>Add Word</button>
      </div>
    </div>
  );
};

export default CardList;