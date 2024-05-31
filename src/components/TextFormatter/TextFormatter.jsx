import React, { useState } from 'react';

const TextFormatter = () => {
  const [inputText, setInputText] = useState('');
  const [formattedText, setFormattedText] = useState('');

  const handleButtonClick = () => {
    setFormattedText(inputText.toUpperCase());
  };

  return (
    <div>
      <input
        type="text"
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        placeholder="Enter text"
      />
      <button onClick={handleButtonClick}>Format Text</button>
      <div>
        <p style={{ color: 'blue' }}>{formattedText}</p>
      </div>
    </div>
  );
};

export default TextFormatter;
