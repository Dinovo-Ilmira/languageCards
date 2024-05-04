import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import './CardList.css';

const CardList = ({ words, onAddWord, onUpdateWord, onDeleteWord }) => {
  const navigate = useNavigate();
  const [editWordId, setEditWordId] = useState(null);
  const [currentWord, setCurrentWord] = useState({ english: '', transcription: '', russian: '' });
  const [newWord, setNewWord] = useState({ english: '', transcription: '', russian: '' });

  const handleEdit = (word) => {
    setEditWordId(word.id);
    setCurrentWord({ ...word });
  };

  const handleSave = () => {
    onUpdateWord({ ...currentWord, id: editWordId });
    setEditWordId(null);
  };

  const handleDelete = (id) => {
    onDeleteWord(id);
  };

  const handleCancel = () => {
    setEditWordId(null);
  };

  const handleAdd = () => {
    onAddWord(newWord);
    setNewWord({ english: '', transcription: '', russian: '' }); 
  };

  const handleSelectWord = (word) => {
    navigate(`/word/${word.id}`); 
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
                  <td><input type="text" value={currentWord.english} onChange={(e) => setCurrentWord({ ...currentWord, english: e.target.value })} /></td>
                  <td><input type="text" value={currentWord.transcription} onChange={(e) => setCurrentWord({ ...currentWord, transcription: e.target.value })} /></td>
                  <td><input type="text" value={currentWord.russian} onChange={(e) => setCurrentWord({ ...currentWord, russian: e.target.value })} /></td>
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
                    <button onClick={handleSave}>Save</button>
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
