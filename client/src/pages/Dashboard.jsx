import React from 'react';
import { useSelector } from 'react-redux';
import DateDisplay from '../components/DateDisplay'; // Import the DateDisplay component
import '../templates/dashboard.css'; // Import CSS file for styling
import dashboardImage from '../assets/dashboard-top.png';


const Dashboard = () => {
    const { userInfo } = useSelector((state) => state.auth);

    return (
        <div className="dashboard-container">
            <div className="content-top">
                <div className="greeting">
                    <DateDisplay /> {/* Use the DateDisplay component here */}
                    <h1>Welcome, PT {userInfo.first_name}</h1>
                    <h2>Have a nice day!</h2>
                </div>
                <img src={dashboardImage} alt="Image" />
            </div>
        </div>
    );
}

export default Dashboard;