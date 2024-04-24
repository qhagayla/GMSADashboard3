import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchRemarks } from '../features/remarks/remarkSlice';
import '../templates/remarks-modal.css';

const RemarksModal = ({ isOpen, onClose, videoId, caption }) => {
  const dispatch = useDispatch();
  const [latestRemark, setLatestRemark] = useState('');

  const remarks = useSelector((state) => state.remark.remarks);

  useEffect(() => {
    if (isOpen && videoId) {
      dispatch(fetchRemarks(videoId));
    }
  }, [isOpen, videoId, dispatch]);

  useEffect(() => {
    // Filter remarks for the specific video ID
    const remarksForVideo = remarks.filter(remark => remark.video === videoId);
    // Sort remarks by creation date to get the latest one
    const latestRemarkForVideo = remarksForVideo.length > 0 ? remarksForVideo.sort((a, b) => new Date(b.created_at) - new Date(a.created_at))[0] : null;
    // Set the latest remark text if available
    if (latestRemarkForVideo) {
      setLatestRemark(latestRemarkForVideo.text);
    } else {
      setLatestRemark('No remarks available');
    }
  }, [remarks, videoId]);

  return (
    <div className={`modal ${isOpen ? 'is-active' : ''}`}>
      <div className="modal-background" onClick={onClose}></div>
      <div className="modal-content">
        <div className="box">
          <h3 className="title">Latest Remark for {caption} Video</h3> {/* Use caption here */}
          <p>{latestRemark}</p>
        </div>
      </div>
      <button className="modal-close is-large" aria-label="close" onClick={onClose}></button>
    </div>
  );
};

export default RemarksModal;
