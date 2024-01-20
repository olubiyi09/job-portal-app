import React, { useState } from 'react';
import styles from "./Modal.module.css";

const Modal = ({ isOpen, onClose, children }) => {
    const handleClose = () => {
        onClose();
    };

    return (
        <div className={`modal ${isOpen ? 'open' : ''}`}>
            <div className="modal-overlay" onClick={handleClose}></div>
            <div className="modal-content">
                <span className="close-button" onClick={handleClose}>&times;</span>
                {children}
            </div>
        </div>
    );
};

export default Modal;
