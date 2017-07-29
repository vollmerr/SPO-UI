import * as React from 'react';
import * as ReactDOM from 'react-dom';

export function List({
  list,
  onChange,
}) {
  return (
    <div>
      <label>Title</label>
      <input value={list.Title} onChange={onChange} name={'Title'} />
      <p>{list.firstName}</p>
      <p>{list.lastName}</p>
      <p>{list.phoneNumber}</p>
      <hr />
    </div>
  );
}
