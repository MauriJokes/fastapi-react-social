import React from 'react';
import '../index.css'

export default function Modal({ children, onClose }) {
  return (
    <div className='modal-container'>
      <div className='modal-container-inner'>
        {children}
        <button className='modal-close-button' onClick={onClose}>X</button>
      </div>
    </div>
  );
}