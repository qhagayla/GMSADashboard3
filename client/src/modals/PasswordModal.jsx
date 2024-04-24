import React, { useState } from 'react';
import '../templates/password-modal.css';
import { useDispatch, useSelector } from 'react-redux';
import { changePassword } from '../features/auth/authSlice';

const PasswordModal = ({ onClose }) => {
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [retypeNewPassword, setRetypeNewPassword] = useState('');
    const [error, setError] = useState('');
    const dispatch = useDispatch();
    const isLoading = useSelector((state) => state.auth.isLoading);

    const handleChangePassword = async () => {
        // Check if new passwords match
        if (newPassword !== retypeNewPassword) {
            setError("New passwords do not match");
            return;
        }

        try {
            await dispatch(changePassword({ current_password: currentPassword, new_password: newPassword }));
            onClose();
        } catch (error) {
            setError(error.message);
        }
    };

    const handleClose = () => {
        setCurrentPassword('');
        setNewPassword('');
        setRetypeNewPassword('');
        setError('');
        onClose();
    };

    const isChangeButtonDisabled = () => {
        return (
            isLoading ||
            currentPassword.trim() === '' ||
            newPassword.trim() === '' ||
            retypeNewPassword.trim() === ''
        );
    };

    return (
        <div className="password-modal">
            <h2>Change Password</h2>
            {error && <p className="error-message">{error}</p>}
            <div>
                <label>Current Password:</label>
                <input 
                    type="password" 
                    value={currentPassword} 
                    onChange={(e) => setCurrentPassword(e.target.value)} 
                />
            </div>
            <div>
                <label>New Password:</label>
                <input 
                    type="password" 
                    value={newPassword} 
                    onChange={(e) => setNewPassword(e.target.value)} 
                />
            </div>
            <div>
                <label>Retype New Password:</label>
                <input 
                    type="password" 
                    value={retypeNewPassword} 
                    onChange={(e) => setRetypeNewPassword(e.target.value)} 
                />
            </div>
            <div>
                <button onClick={handleChangePassword} disabled={isChangeButtonDisabled()}>
                    {isLoading ? 'Changing...' : 'Change Password'}
                </button>
                <button onClick={handleClose} disabled={isLoading}>Cancel</button>
            </div>
        </div>
    );
};

export default PasswordModal;
