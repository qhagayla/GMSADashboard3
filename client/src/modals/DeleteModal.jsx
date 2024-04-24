// DeleteModal.jsx
import React from 'react';
import '../templates/deletemodal.css'; // Import CSS file for styling

const DeleteModal = ({ client, onDelete, onClose }) => {
    const handleDelete = () => {
        onDelete(client.id);
        onClose();
    };

    return (
        <div className="modal">
            <div className="modal-content">
                <span className="close" onClick={onClose}>&times;</span>
                <h2>Delete Client</h2>
                <p>Are you sure you want to delete {client.name}?</p>
                <button onClick={handleDelete}>Delete</button>
                <button onClick={onClose}>Cancel</button>
            </div>
        </div>
    );
};

export default DeleteModal;
