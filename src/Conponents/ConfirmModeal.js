import React from 'react';
import Modal from 'react-modal';
import './styles/confirmModal.css';

Modal.setAppElement('#root');

const ConfirmModal = ({ isOpen, onRequestClose, onConfirm, message }) => {
    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            contentLabel="Confirmation Modal"
            className="Modal"
            overlayClassName="Overlay"
        >
            <h2>Confirm</h2>
            <p>{message}</p>
            <button onClick={onConfirm}>Yes</button>
            <button onClick={onRequestClose}>No</button>
        </Modal>
    );
};

export default ConfirmModal;
