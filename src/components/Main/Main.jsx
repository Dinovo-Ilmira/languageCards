import React, { useState } from 'react';
import CardList from '../CardList/CardList';
import './Main.css';
import '../../styles.css';

const Main = ({ initialValue }) => {
  const [editMode, setEditMode] = useState(false);
  const [value, setValue] = useState(initialValue);

  const handleValueChange = (event) => {
    setValue(event.target.value);
  };

  const cancelEdit = () => {
    setValue(initialValue);
    setEditMode(false); 
  };

  return (
    <div>
      {editMode ? (
        <input type="text" value={value} onChange={handleValueChange} />
      ) : (
        <span>{value}</span>
      )}
      <button onClick={() => setEditMode(true)}>Редактировать</button>
      {editMode && <button onClick={cancelEdit}>Отмена редактирования</button>}
    </div>
  );
};

export default Main;
