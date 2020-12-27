import { useState, useEffect, Fragment } from 'react';
import axios from 'axios';
import Loader from 'react-loader-spinner';

import List from './components/List';
import Popup from './components/Popup';
import New from './components/New';

const App = () => {
  const [todos, setTodos] = useState(null);
  const [popupVisible, setPopupVisible] = useState(false);

  useEffect(() => {
    axios.get('/todos').then(({ data }) => setTodos(data));
  }, []);

  const closePopup = () => setPopupVisible(false);

  const togglePopup = () => setPopupVisible(!popupVisible);

  const onCompleteTask = (id, status) => {
    axios.patch('/todos/' + id, { completed: status })
      .then(() => {
        const newTodos = todos.map(todo => todo.id === id ? { ...todo, completed: status } : todo);
        setTodos(newTodos);
      })
      .catch(() => alert('Не удалось изменить статус задачи'));
  };

  const onAddTask = text => {
    axios.post('/todos', { text, completed: false })
      .then(({ data }) => {
        setTodos([ ...todos, data ]);
        closePopup();
      })
      .catch(() => alert('Не удалось добавить задачу'));
  };

  const onRemoveTask = id => {
    axios.delete('/todos/' + id)
      .then(() => {
        const newTodos = todos.filter(todo => todo.id !== id);
        setTodos(newTodos);
      })
      .catch(() => alert('Не удалось удалить задачу'));
  };

  const onEditTask = (id, text) => {
    axios.patch('/todos/' + id, { text })
      .then(() => {
        const newTodos = todos.map(todo => todo.id === id ? { ...todo, text } : todo);
        setTodos(newTodos);
      })
      .catch(() => alert('Не удалось изменить название задачи'));
  };

  return (
    <div className="wrapper">
      <div className="todo">
        <header className="header">Задачи</header>
        <main className="body">
          {todos ? (
            <Fragment>
              <List
                items={todos}
                onCompleteTask={onCompleteTask}
                onRemoveTask={onRemoveTask}
                onEditTask={onEditTask}
              />
              {popupVisible && <Popup onAdd={onAddTask} closePopup={closePopup} />}
              <New togglePopup={togglePopup} />
            </Fragment>
          ) : (
            <Loader
              className="loader"
              type="ThreeDots"
              color="#d49c6b"
              height={60}
              width={60}
            />
          )}
        </main>
      </div>
    </div>
  );
};

export default App;
