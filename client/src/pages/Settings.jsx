import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getUserInfo } from '../features/auth/authSlice';
import PasswordModal from '../modals/PasswordModal';
import '../templates/settings.css';

const Settings = () => {
    const dispatch = useDispatch();
    const { userInfo } = useSelector((state) => state.auth);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        dispatch(getUserInfo());
    }, [dispatch]);

    const handleChangePassword = () => {
        setIsModalOpen(true);
    };

    const handleSavePassword = (newPassword) => {
        console.log('New password:', newPassword);
        setIsModalOpen(false);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    return (
        <div className="doctor-profile">
            <div className="details-doctor-profile">
                <h3>Doctor's Profile</h3>
            </div>
            <div className="details-doctor">
                {userInfo && ( // Check if userInfo exists before accessing its properties
                    <>
                        <h3>Username: {userInfo.username}</h3>
                        <h3>First Name: {userInfo.first_name}</h3>
                        <h3>Last Name: {userInfo.last_name}</h3>
                        <h3>Email: {userInfo.email}</h3>
                    </>
                )}
                <button onClick={handleChangePassword}>Change Password</button>
            </div>
            {isModalOpen && (
                <PasswordModal 
                    onSave={handleSavePassword} 
                    onClose={handleCloseModal} 
                />
            )}
        </div>
    );
};

export default Settings;
