// ClientForm.jsx
import React, { useState } from 'react';
import '../templates/clientform.css'; // Import CSS file for styling

const ClientForm = ({ onSubmit, onClose }) => {
    const [formData, setFormData] = useState({
        name: '',
        age: '',
        birthdate: '',
        date_of_assessment: '',
        gender: '',
        grade_level: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <div className="client-form">
            <h2>Add Client</h2>
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
                <button type="submit">Submit</button>
                <button type="button" onClick={onClose}>Close</button>
            </form>
        </div>
    );
};

export default ClientForm;
