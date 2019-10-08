import './App.css';
import styled from 'styled-components';
import Slider from '@material-ui/core/Slider';
import Submit from './Submit';
import Wrapper from './Wrapper';

import './index.css';

import React, { useRef, useState } from 'react';

const Upload = styled(Submit)`
  width: 100%;
  height: 15rem;
  margin: 2rem 0;
  color: white;
  background: none;
`;

const AgeLabel = styled.p`
  color: white;
  font-size: 3rem;
`;

function App() {
  const fileRef = useRef(null);

  const [formState, setFormState] = useState({ age: '0', photo: '' });

  const [error, setError] = useState('');

  const [success, setSuccess] = useState(false);

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
    if (success) return;

    const file = fileRef.current.files[0];

    if (!file) {
      setError('NEED PHOTO');
      return;
    }

    const formData = new FormData();
    formData.append('photo', file);
    formData.append('age', formState.age);
    fetch('/api', { method: 'POST', body: formData })
      .then(res => {
        console.log(res);
        if (res.status !== 200) {
          setError('OOPS');
        } else {
          setSuccess(true);
        }
      })
      .catch(err => {
        setError('OOPS');
        console.log(err);
      });
  };

  return (
    <>
      <Wrapper>
        <form onSubmit={handleSubmit}>
          <AgeLabel>ENTER YOUR AGE</AgeLabel>
          <Slider
            defaultValue={30}
            aria-labelledby="discrete-slider"
            valueLabelDisplay="auto"
            step={1}
            min={1}
            max={99}
            onChange={(e, val) => setFormState(prev => ({ ...prev, age: val }))}
          />
          <p>
            <Upload
              as="button"
              onClick={e => {
                e.preventDefault();
                setError('');
                fileRef.current.click();
              }}
            >
              TAKE PHOTO
            </Upload>
            <input
              style={{ display: 'none' }}
              ref={fileRef}
              type="file"
              accept="image/png, image/jpeg"
              name="photo"
            />
            <Submit
              type="submit"
              value={error ? error : success ? 'THANKS' : 'SUBMIT'}
            />
          </p>
        </form>
      </Wrapper>
    </>
  );
}

export default App;
