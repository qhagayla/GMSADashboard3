import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { saveRemarkAsync } from '../features/remarks/remarkSlice';
import '../templates/remarks-form.css'
const RemarksForm = ({ onClose }) => {
  const dispatch = useDispatch();
  const videos = useSelector((state) => state.video.videos);
  const [selectedVideo, setSelectedVideo] = useState('');
  const [text, setText] = useState('');

  useEffect(() => {
    // Add event listener to close modal when clicked outside
    const handleClickOutside = (event) => {
      if (!event.target.closest('.remarks-form')) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);

  const handleSaveRemark = () => {
    if (!selectedVideo || !text) return;
    dispatch(
      saveRemarkAsync({
        video: selectedVideo,
        text: text
      })
    );
    // Reset form fields after saving remark
    setSelectedVideo('');
    setText('');
    onClose(); // Close modal after saving
  };

  return (
    <div className="overlay">
      <div className="remarks-form">
        <button className="modal-close is-large" aria-label="close" onClick={onClose}></button> {/* Close button */}
        <div className="field">
          <label className="label">Select Video</label>
          <div className="control">
            <div className="select">
              <select value={selectedVideo} onChange={(e) => setSelectedVideo(e.target.value)}>
                <option value="">Select Video</option>
                {videos.map((video) => (
                  <option key={video.id} value={video.id}>{video.caption}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
        <div className="field">
          <label className="label">Remark Text</label>
          <div className="control">
            <textarea className="textarea" value={text} onChange={(e) => setText(e.target.value)}></textarea>
          </div>
        </div>
        <div className="field is-grouped">
          <div className="control">
            <button className="button is-link" onClick={handleSaveRemark}>Save Remark</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RemarksForm;
