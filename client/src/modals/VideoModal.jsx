import React from 'react';
import '../templates/video-modal.css'; // Import the CSS file for styling

const VideoModal = ({ videoUrl, caption, onClose }) => {
    return (
        <div className="video-modal-overlay" onClick={onClose}>
            <div className="video-modal-content" onClick={(e) => e.stopPropagation()}>
                <video src={videoUrl} controls />
                <p className="video-caption">{caption}</p> {/* Ensure caption is displayed */}
            </div>
        </div>
    );
};

export default VideoModal;