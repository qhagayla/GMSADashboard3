import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchVideos } from '../features/videos/videoSlice';
import { fetchClients } from '../features/client/clientSlice'; // Import fetchClients action
import UploadForm from '../forms/UploadForm';
import RemarksForm from '../forms/RemarksForm';
import DeleteForm from '../forms/DeleteForm';
import RemarkModal from '../modals/RemarksModal';
import VideoModal from '../modals/VideoModal';
import '../templates/recorded-videos.css';

const RecordedVideos = () => {
    const dispatch = useDispatch();
    const { videos, isLoading, isError } = useSelector((state) => state.video);
    const { clients } = useSelector((state) => state.client); // Get clients from the Redux store
    const [showUploadForm, setShowUploadForm] = useState(false);
    const [showDeleteForm, setShowDeleteForm] = useState(false);
    const [videoToDelete, setVideoToDelete] = useState(null);
    const [showRemarksForm, setShowRemarksForm] = useState(false);
    const [selectedVideo, setSelectedVideo] = useState(null);
    const [showRemarkModal, setShowRemarkModal] = useState(false);
    const [showVideoModal, setShowVideoModal] = useState(false);
    const [videoUrl, setVideoUrl] = useState('');
    const [videoCaption, setVideoCaption] = useState('');

    useEffect(() => {
        dispatch(fetchVideos());
        dispatch(fetchClients()); // Fetch clients when component mounts
    }, [dispatch]);

    const toggleUploadForm = () => {
        setShowUploadForm(!showUploadForm);
    };

    const toggleDeleteForm = (videoId) => {
        setVideoToDelete(videoId);
        setShowDeleteForm(!showDeleteForm);
    };

    const handleCancel = () => {
        setShowDeleteForm(false);
    };

    const handleRemark = (video) => {
        setSelectedVideo(video);
        setShowRemarkModal(true);
    };

    const handleAddRemarks = () => {
        setShowRemarksForm(true);
    };

    const handleCaptionClick = (video) => {
        // Show the video modal only if the click event target is not a button
        if (!event.target.matches('button')) {
            setVideoUrl(video.video);
            setVideoCaption(video.caption);
            setShowVideoModal(true);
        }
    };

    return (
        <div>
            <h1 style={{ textAlign: 'center' }}>Video List</h1>
            <div className='upperbuttons' style={{ position: 'relative' }}>
                <button className="upload-button" onClick={toggleUploadForm}>Upload</button>
                <button className="add-remarks-button" onClick={handleAddRemarks}>Add Remarks</button>
                {showUploadForm && <UploadForm onClose={toggleUploadForm} />}
            </div>
            {isLoading ? (
                <p>Loading...</p>
            ) : isError ? (
                <p>Error loading videos</p>
            ) : videos.length === 0 ? (
                <p>No videos available</p>
            ) : (
                <div className="video-list">
                    {videos.map((video, index) => (
                        <div className="video-list-item" key={index} onClick={() => handleCaptionClick(video)}>
                            {/* Display the name of the client besides the caption */}
                            <p className="caption" onClick={() => handleCaptionClick(video)}>
                                {video.caption} - {video.client_name ? video.client_name : 'No client'}
                            </p>
                            <div className="button-container">
                                <button className="delete-button" onClick={() => toggleDeleteForm(video.id)}>Delete</button>
                                <button className="remark-button" onClick={() => handleRemark(video)}>Remark</button>
                            </div>
                            {showDeleteForm && videoToDelete === video.id && (
                                <DeleteForm
                                    videoId={videoToDelete}
                                    onClose={handleCancel}
                                />
                            )}
                        </div>
                    ))}
                </div>
            )}
            {showRemarksForm && (
                <RemarksForm
                    onClose={() => setShowRemarksForm(false)}
                    selectedVideo={selectedVideo}
                />
            )}
            {showRemarkModal && (
                <RemarkModal
                    isOpen={showRemarkModal}
                    onClose={() => setShowRemarkModal(false)}
                    videoId={selectedVideo.id}
                    caption={selectedVideo.caption} // Ensure selectedVideo.caption is defined and passed correctly
                />
            )}
            {showVideoModal && (
                <VideoModal
                    videoUrl={videoUrl}
                    caption={videoCaption}
                    onClose={() => setShowVideoModal(false)}
                />
            )}
        </div>
    );
};

export default RecordedVideos;
