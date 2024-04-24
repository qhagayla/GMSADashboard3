import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchClients, addClient, editClient, deleteClient } from '../features/client/clientSlice';
import ClientForm from '../forms/ClientForm';
import EditModal from '../modals/EditModal';
import DeleteModal from '../modals/DeleteModal';
import '../templates/client.css';

const ClientPage = () => {
    const dispatch = useDispatch();
    const clients = useSelector((state) => state.client.clients);
    const isLoading = useSelector((state) => state.client.isLoading);

    const [showClientForm, setShowClientForm] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedClient, setSelectedClient] = useState(null);

    useEffect(() => {
        dispatch(fetchClients());
    }, [dispatch]);

    const handleAddClientClick = () => setShowClientForm(true);

    const handleCloseModal = () => {
        setShowClientForm(false);
        setShowEditModal(false);
        setShowDeleteModal(false);
        setSelectedClient(null);
    };

    const handleClientFormSubmit = (formData) => {
        dispatch(addClient(formData));
        setShowClientForm(false);
    };

    const handleEditClick = (client) => {
        setSelectedClient(client);
        setShowEditModal(true);
    };

    const handleEditSubmit = (formData) => {
        dispatch(editClient({ clientId: selectedClient.id, clientData: formData }));
        setShowEditModal(false);
    };

    const handleDeleteClick = (client) => {
        setSelectedClient(client);
        setShowDeleteModal(true);
    };

    const handleDeleteSubmit = () => {
        dispatch(deleteClient(selectedClient.id));
        setShowDeleteModal(false);
    };

    return (
        <div className="client-page">
            <button className="add-client-button" onClick={handleAddClientClick}>Add Client</button>
            <h1>Clients</h1>
            {showClientForm && <ClientForm onSubmit={handleClientFormSubmit} onClose={handleCloseModal} />}
            {isLoading ? (
                <p>Loading...</p>
            ) : (
                <ul>
                    {clients.map((client) => (
                        <li key={client.id}>
                            <p>Name: {client.name}</p>
                            <p>Age: {client.age}</p>
                            <p>Birthdate: {client.birthdate}</p>
                            <p>Date of Assessment: {client.date_of_assessment}</p>
                            <p>Gender: {client.gender}</p>
                            <p>Grade Level: {client.grade_level}</p>
                            <button onClick={() => handleEditClick(client)}>Edit</button>
                            <button onClick={() => handleDeleteClick(client)}>Delete</button>
                        </li>
                    ))}
                </ul>
            )}
            {showEditModal && <EditModal client={selectedClient} onUpdate={handleEditSubmit} onClose={handleCloseModal} />}
            {showDeleteModal && <DeleteModal client={selectedClient} onDelete={handleDeleteSubmit} onClose={handleCloseModal} />}
        </div>
    );
};

export default ClientPage;
