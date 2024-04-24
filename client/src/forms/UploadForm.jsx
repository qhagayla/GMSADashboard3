import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { uploadVideo } from '../features/videos/videoSlice';
import { fetchClients } from '../features/client/clientSlice'; // Import fetchClients action
import axios from 'axios';
import '../templates/upload-form.css';

const UploadForm = ({ onClose }) => {
    const [caption, setCaption] = useState('');
    const [selectedFile, setSelectedFile] = useState(null);
    const [error, setError] = useState('');
    const [selectedClient, setSelectedClient] = useState(''); // State to store the selected client
    const dispatch = useDispatch();
    const { clients } = useSelector((state) => state.client); // Get clients from the Redux store

    useEffect(() => {
        dispatch(fetchClients()); // Fetch clients when component mounts
    }, [dispatch]);

    const handleFileChange = (e) => {
        setSelectedFile(e.target.files[0]);
    };

    const handleCaptionChange = (e) => {
        setCaption(e.target.value);
    };

    const handleClientChange = (e) => {
        setSelectedClient(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('caption', caption);
        formData.append('video', selectedFile);
        formData.append('client', selectedClient); // Add selected client to the form data

        try {
            // Dispatch the uploadVideo action with the form data
            dispatch(uploadVideo(formData));
            // Close the form after successful upload
            onClose();
        } catch (error) {
            setError('Failed to upload video');
        }
    };

    return (
        <div className="upload-form-container">
            <div className="upload-form">
                <button className="exit-button" onClick={onClose}>X</button>
                <h2>Upload Video</h2>
                {error && <p className="error-message">{error}</p>}
                <form onSubmit={handleSubmit}>
                    <input type="text" placeholder="Caption" value={caption} onChange={handleCaptionChange} required />
                    <input type="file" onChange={handleFileChange} required />
                    {/* Dropdown to select client */}
                    <select value={selectedClient} onChange={handleClientChange} required>
                        <option value="">Select Client</option>
                        {clients.map(client => (
                            <option key={client.id} value={client.id}>{client.name}</option>
                        ))}
                    </select>
                    <button type="submit">Upload</button>
                </form>
            </div>
        </div>
    );
};

export default UploadForm;
