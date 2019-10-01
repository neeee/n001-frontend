import './App.css';

import React, { useRef, useState } from 'react';

function App() {
  const fileRef = useRef(null);

  const [formState, setFormState] = useState({ age: '0', photo: '' });
  const handleChange = e => {
    const target = e.target;

    const name = target.name;
    const value = target.value;

    setFormState(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    const file = fileRef.current.files[0];
    const formData = new FormData();
    formData.append('photo', file);
    formData.append('age', formState.age);
    fetch('/api', { method: 'POST', body: formData })
      .then(res => console.log(res))
      .catch(err => console.log(err));
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          type="number"
          name="age"
          value={formState.age}
          onChange={handleChange}
        />
        <input
          ref={fileRef}
          type="file"
          accept="image/png, image/jpeg"
          name="photo"
        />
        <input type="submit" />
      </form>
    </>
  );
}

export default App;
