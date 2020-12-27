import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

const Item = ({ id, text, completed, onComplete, onRemove, onEdit }) => {
  const [isEditing, setEditing] = useState(false);
  const [value, setValue] = useState(text);
  const inputRef = useRef();

  const handleEdit = () => {
    const processedValue = value.replace(/\s+/g, ' ').trim();
    setEditing(false);
    if(value.trim()) {
      onEdit(id, processedValue);
    } else {
      alert('Введите название задачи');
      setValue(text);
    };
  };

  const handleOutsideClick = e => {
    const path = e.path || (e.composedPath && e.composedPath());
    inputRef.current && !path.includes(inputRef.current.closest('.list-item')) && handleEdit();
  };

  useEffect(() => {
    inputRef.current && inputRef.current.focus();
    document.body.addEventListener('click', handleOutsideClick);
    return () => {
      document.body.removeEventListener('click', handleOutsideClick);
    };
  }, [isEditing, value]);

  const toggleEditing = () => setEditing(!isEditing);

  const onInputChange = e => setValue(e.target.value);

  const handleComplete = () => onComplete(id, !completed);

  const handleRemove = () => window.confirm('Вы дейсвительно хотите удалить задачу?') && onRemove(id);

  const onSubmit = e => {
    e.preventDefault();
    handleEdit();
  };

  return (
    <li className="list__item list-item">
      <input onChange={handleComplete} id={id} type="checkbox" checked={completed} className="list-item__checkbox" />
      <label htmlFor={id} className="list-item__label">
        <svg className="list-item__mark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 212.045 212.045">
          <path d="M167.871,0H44.84C34.82,0,26.022,8.243,26.022,18v182c0,3.266,0.909,5.988,2.374,8.091c1.752,2.514,4.573,3.955,7.598,3.954 c2.86,0,5.905-1.273,8.717-3.675l55.044-46.735c1.7-1.452,4.142-2.284,6.681-2.284c2.538,0,4.975,0.832,6.68,2.288l54.86,46.724 c2.822,2.409,5.657,3.683,8.512,3.683c4.828,0,9.534-3.724,9.534-12.045V18C186.022,8.243,177.891,0,167.871,0z" />
        </svg>
        {isEditing ? (
          <form onSubmit={onSubmit} className="list-item__form">
            <input
              ref={inputRef}
              value={value}
              onChange={onInputChange}
              type="text"
              className="list-item__input"
            />
            <button className="list-item__edit">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 45.701 45.7">
                <path d="M20.687,38.332c-2.072,2.072-5.434,2.072-7.505,0L1.554,26.704c-2.072-2.071-2.072-5.433,0-7.504 c2.071-2.072,5.433-2.072,7.505,0l6.928,6.927c0.523,0.522,1.372,0.522,1.896,0L36.642,7.368c2.071-2.072,5.433-2.072,7.505,0 c0.995,0.995,1.554,2.345,1.554,3.752c0,1.407-0.559,2.757-1.554,3.752L20.687,38.332z"/>
              </svg>
            </button>
          </form>
        ) : (
          <span className="list-item__text">{value}</span>
        )}
      </label>
      <button onClick={toggleEditing} className="list-item__pen">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 383.947 383.947">
          <polygon points="0,303.947 0,383.947 80,383.947 316.053,147.893 236.053,67.893 "/>
          <path d="M377.707,56.053L327.893,6.24c-8.32-8.32-21.867-8.32-30.187,0l-39.04,39.04l80,80l39.04-39.04 C386.027,77.92,386.027,64.373,377.707,56.053z"/>
        </svg>
      </button>
      <button onClick={handleRemove} className="list-item__remove">
        <svg viewBox="0 0 365.696 365.696" xmlns="http://www.w3.org/2000/svg">
          <path d="m243.1875 182.859375 113.132812-113.132813c12.5-12.5 12.5-32.765624 0-45.246093l-15.082031-15.082031c-12.503906-12.503907-32.769531-12.503907-45.25 0l-113.128906 113.128906-113.132813-113.152344c-12.5-12.5-32.765624-12.5-45.246093 0l-15.105469 15.082031c-12.5 12.503907-12.5 32.769531 0 45.25l113.152344 113.152344-113.128906 113.128906c-12.503907 12.503907-12.503907 32.769531 0 45.25l15.082031 15.082031c12.5 12.5 32.765625 12.5 45.246093 0l113.132813-113.132812 113.128906 113.132812c12.503907 12.5 32.769531 12.5 45.25 0l15.082031-15.082031c12.5-12.503906 12.5-32.769531 0-45.25zm0 0" />
        </svg>
      </button>
    </li>
  );
};

export default Item;

Item.propTypes = {
  id: PropTypes.number.isRequired,
  text: PropTypes.string.isRequired,
  completed: PropTypes.bool.isRequired,
  onComplete: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired
};