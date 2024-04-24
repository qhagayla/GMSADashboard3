// EditModal.jsx
import React, { useState } from 'react';
import '../templates/editmodal.css'; // Import CSS file for styling

const EditModal = ({ client, onUpdate, onClose }) => {
    const [formData, setFormData] = useState({ ...client });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onUpdate(formData);
        onClose();
    };

    return (
        <div className="modal">
            <div className="modal-content">
                <span className="close" onClick={onClose}>&times;</span>
                <h2>Edit Client</h2>
                <form onSubmit={handleSubmit}>
                    <label>
                        Name:
                        <input type="text" name="name" value={formData.name} onChange={handleChange} />
                    </label>
                    <label>
                        Age:
                        <input type="number" name="age" value={formData.age} onChange={handleChange} />
                    </label>
                    <label>
                        Birthdate:
                        <input type="date" name="birthdate" value={formData.birthdate} onChange={handleChange} />
                    </label>
                    <label>
                        Date of Assessment:
                        <input type="date" name="date_of_assessment" value={formData.date_of_assessment} onChange={handleChange} />
                    </label>
                    <label>
                        Gender:
                        <select name="gender" value={formData.gender} onChange={handleChange}>
                            <option value="">Select</option>
                            <option value="M">Male</option>
                            <option value="F">Female</option>
                            <option value="O">Other</option>
                        </select>
                    </label>
                    <label>
                        Grade Level:
                        <input type="text" name="grade_level" value={formData.grade_level} onChange={handleChange} />
                    </label>
                    <button type="submit">Update</button>
                </form>
            </div>
        </div>
    );
};

export default EditModal;
