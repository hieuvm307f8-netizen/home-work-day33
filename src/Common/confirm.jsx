import React from 'react';
import { confirmable, createConfirmation } from 'react-confirm';

const MyDialog = ({ show, proceed, message }) => (
  <div className={`dialog-overlay ${show ? 'show' : 'hide'}`}>
    <div className="dialog">
      <p>{message}</p>
      <div className="dialog-footer">
        <button onClick={() => proceed(true)}>Chắc</button>
        <button onClick={() => proceed(false)}>No</button>
      </div>
    </div>
  </div>
);

export const confirm = createConfirmation(confirmable(MyDialog));