import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./CardList.css";

const CardList = ({ words, onAddWord }) => {
  const navigate = useNavigate();
  const [editWordIndex, setEditWordIndex] = useState(null);
  const [currentWord, setCurrentWord] = useState({
    english: "",
    transcription: "",
    russian: "",
  });
  const [newWord, setNewWord] = useState(words);

  const handleEdit = (index, word) => {
    setEditWordIndex(index);
    setCurrentWord({ ...word });
  };

  const handleSave = () => {
    // Создание копии массива слов для обновления
    setNewWord((prevNewWord) => {
      const updatedWords = [...prevNewWord];
      // Замена отредактированного слова в копии массива
      updatedWords[editWordIndex] = currentWord;
      return updatedWords; // Возврат обновлённого массива слов
    });
    setEditWordIndex(null); // Завершение редактирования слова
  };
  
  const handleDelete = (id) => {
    // Фильтруем массив слов, оставляя только те, у которых id не совпадает с id удаляемого слова
    setNewWord((prevNewWord) => prevNewWord.filter((word) => word.id !== id));
  };
  

  const handleCancel = () => {
    setEditWordIndex(null);
  };

  const handleAdd = () => {
    onAddWord(newWord);
    setNewWord({ english: "", transcription: "", russian: "" });
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
          {newWord.map((word, index) => (
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
                    <button onClick={handleSave}>Save</button>
                    <button onClick={handleCancel}>Cancel</button>
                  </>
                ) : (
                  <>
                    <button onClick={() => handleEdit(index, word)}>Edit</button>
                    <button onClick={() => handleDelete(word.id)}>
                      Delete
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
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