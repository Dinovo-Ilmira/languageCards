import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import './CardList.css';
import { WordsContext } from '../../WordsContext';

const CardList = () => {
  const { words, addWord, updateWord, deleteWord, loading, error } = useContext(WordsContext);
  const navigate = useNavigate();
  const [editWordIndex, setEditWordIndex] = useState(null);
  const [currentWord, setCurrentWord] = useState({
    english: "",
    transcription: "",
    russian: "",
  });
  const [newWord, setNewWord] = useState({ english: "", transcription: "", russian: "" });
  const [errors, setErrors] = useState({});

  const handleEdit = (index, word) => {
    setEditWordIndex(index);
    setCurrentWord({ ...word });
    setErrors({});
  };

  const handleSave = () => {
    const newErrors = {};
    if (!currentWord.english) newErrors.english = true;
    if (!currentWord.transcription) newErrors.transcription = true;
    if (!currentWord.russian) newErrors.russian = true;

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    updateWord(currentWord);
    setEditWordIndex(null);
    setErrors({});
  };

  const handleDelete = (id) => {
    deleteWord(id);
  };

  const handleCancel = () => {
    setEditWordIndex(null);
    setErrors({});
  };

  const handleAdd = () => {
    const newErrors = {};
    if (!newWord.english) newErrors.english = true;
    if (!newWord.transcription) newErrors.transcription = true;
    if (!newWord.russian) newErrors.russian = true;

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    addWord({ ...newWord });
    setNewWord({ english: "", transcription: "", russian: "" });
  };

  const handleSelectWord = (word) => {
    navigate(`/word/${word.id}`);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h1 className="page-title">Word Cards Management</h1>
      <p className="page-description">Manage your word cards here. You can add, edit, and delete words.</p>
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
              {editWordIndex === index ? (
                <>
                  <td>
                    <input
                      type="text"
                      value={currentWord.english}
                      onChange={(e) =>
                        setCurrentWord({
                          ...currentWord,
                          english: e.target.value,
                        })
                      }
                      style={errors.english ? { border: '1px solid red' } : {}}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      value={currentWord.transcription}
                      onChange={(e) =>
                        setCurrentWord({
                          ...currentWord,
                          transcription: e.target.value,
                        })
                      }
                      style={errors.transcription ? { border: '1px solid red' } : {}}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      value={currentWord.russian}
                      onChange={(e) =>
                        setCurrentWord({
                          ...currentWord,
                          russian: e.target.value,
                        })
                      }
                      style={errors.russian ? { border: '1px solid red' } : {}}
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
                {editWordIndex === index ? (
                  <>
                    <button className="save-button" onClick={handleSave} disabled={Object.keys(errors).length > 0}>Save</button>
                    <button className="cancel-button" onClick={handleCancel}>Cancel</button>
                  </>
                ) : (
                  <>
                    <button className="edit-button" onClick={() => handleEdit(index, word)}>Edit</button>
                    <button className="delete-button" onClick={() => handleDelete(word.id)}>Delete</button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="add-word-form">
        <h2>Add New Word</h2>
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
          onChange={(e) =>
            setNewWord({ ...newWord, transcription: e.target.value })
          }
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
