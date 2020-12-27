import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

const Popup = ({ onAdd, closePopup }) => {
  const [value, setValue] = useState('');
  const inputRef = useRef();

  const handleOutsideClick = e => {
    const path = e.path || (e.composedPath && e.composedPath());
    !path.includes(inputRef.current) && closePopup();
  };

  useEffect(() => {
    inputRef.current.focus();
    document.body.addEventListener('click', handleOutsideClick);
    return () => document.body.removeEventListener('click', handleOutsideClick);
  }, []);

  const onChange = e => setValue(e.target.value);

  const handleAdd = e => {
    e.preventDefault();
    if(value.trim()) {
      onAdd(value.trim());
      setValue('');
    } else {
      alert('Введите название задачи');
    };
  };

  return (
    <form onSubmit={handleAdd} className="popup">
      <input
        ref={inputRef}
        value={value}
        onChange={onChange}
        type="text"
        placeholder="Название задачи"
        className="popup__input"
      />
      <button className="popup__btn">
        <svg viewBox="0 0 448 448" xmlns="http://www.w3.org/2000/svg">
          <path d="m408 184h-136c-4.417969 0-8-3.582031-8-8v-136c0-22.089844-17.910156-40-40-40s-40 17.910156-40 40v136c0 4.417969-3.582031 8-8 8h-136c-22.089844 0-40 17.910156-40 40s17.910156 40 40 40h136c4.417969 0 8 3.582031 8 8v136c0 22.089844 17.910156 40 40 40s40-17.910156 40-40v-136c0-4.417969 3.582031-8 8-8h136c22.089844 0 40-17.910156 40-40s-17.910156-40-40-40zm0 0" />
        </svg>
      </button>
    </form>
  );
};

export default Popup;

Popup.propTypes = {
  onAdd: PropTypes.func.isRequired,
  closePopup: PropTypes.func.isRequired
};