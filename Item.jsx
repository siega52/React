import React from 'react';

const Item = ({ task, onRemove }) => {
  return (
    <div>
      <div className="row">
        <div>
          <button type="button" className="btn btn-primary btn-sm" onClick={onRemove}> - </button>
        </div>
        <div className="col-10">{task}</div>
      </div>
      <hr />
    </div>
  );
};

export default Item;
