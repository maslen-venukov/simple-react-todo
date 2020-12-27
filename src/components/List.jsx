import React from 'react';
import PropTypes from 'prop-types';

import Item from './Item';

const List = ({ items, onCompleteTask, onRemoveTask, onEditTask }) => {
  return (
    <ul className="list">
      {items && items.map(item => (
        <Item
          key={item.id}
          {...item}
          onComplete={onCompleteTask}
          onRemove={onRemoveTask}
          onEdit={onEditTask}
        />
      ))}
    </ul>
  );
};

export default List;

List.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object),
  onCompleteTask: PropTypes.func.isRequired,
  onRemoveTask: PropTypes.func.isRequired,
  onEditTask: PropTypes.func.isRequired
};

