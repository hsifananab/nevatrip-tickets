import React from 'react';

const RouteItem = props => {
  const { item, isSelected, handleClick } = props;

  return (
    <div
      onClick={handleClick}
      style={{ padding: '0 0.5rem', fontWeight: 700, cursor: 'pointer' }}
      className={`${isSelected ? 'text-rose-500' : ''} transition-all`}
    >
      {item}
    </div>
  );
};

export default RouteItem;
