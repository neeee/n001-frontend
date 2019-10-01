import React from 'react';
import './App.css';

function App() {
  const handleChange = e => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('photo', file);
    console.log(file);
    console.log(formData);
    fetch('/api', { method: 'POST', body: formData })
      .then(res => console.log(res))
      .catch(err => console.log(err));
  };

  return (
    <>
      <input
        type="file"
        accept="image/png, image/jpeg"
        onChange={handleChange}
      />
    </>
  );
}

export default App;
