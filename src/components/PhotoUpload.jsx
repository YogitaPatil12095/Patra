import React, { useState } from 'react';
import { motion } from 'framer-motion';

function PhotoUpload({ photo, onPhotoSelect }) {
  const [preview, setPreview] = useState(photo);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const imageData = reader.result;
        setPreview(imageData);
        onPhotoSelect(imageData);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const imageData = reader.result;
        setPreview(imageData);
        onPhotoSelect(imageData);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  return (
    <div className="photo-upload-section">
      <h2 className="section-title">Choose Your Photo</h2>
      <p className="section-description">
        Select a beautiful memory to share
      </p>

      <motion.div 
        className={`upload-area ${preview ? 'has-image' : ''}`}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        whileHover={{ scale: preview ? 1 : 1.02 }}
        transition={{ duration: 0.2 }}
      >
        {preview ? (
          <div className="preview-container">
            <img src={preview} alt="Preview" className="preview-image" />
            <motion.label 
              htmlFor="photo-input"
              className="change-photo-btn"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Change Photo
            </motion.label>
          </div>
        ) : (
          <label htmlFor="photo-input" className="upload-prompt">
            <div className="upload-icon">📷</div>
            <p className="upload-text">
              Click to upload or drag and drop
            </p>
            <p className="upload-hint">
              PNG, JPG, or WEBP
            </p>
          </label>
        )}
        
        <input
          id="photo-input"
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          style={{ display: 'none' }}
        />
      </motion.div>

      <div className="url-upload">
        <label htmlFor="photoUrl" className="form-label">Or paste an image URL</label>
        <div className="url-row">
          <input
            id="photoUrl"
            type="url"
            placeholder="https://example.com/photo.jpg"
            className="form-input"
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                const url = e.target.value.trim();
                if (url) {
                  setPreview(url);
                  onPhotoSelect(url);
                }
              }
            }}
          />
          <button
            type="button"
            className="btn-secondary"
            onClick={() => {
              const input = document.getElementById('photoUrl');
              const url = input && input.value && input.value.trim();
              if (url) {
                setPreview(url);
                onPhotoSelect(url);
              }
            }}
          >Use URL</button>
        </div>
      </div>

      <div className="sample-photos">
        <p className="samples-label">Or try a sample:</p>
        <div className="samples-grid">
          {SAMPLE_PHOTOS.map((sample, idx) => (
            <motion.button
              key={idx}
              className="sample-photo"
              onClick={() => {
                setPreview(sample.url);
                onPhotoSelect(sample.url);
              }}
              whileHover={{ scale: 1.1, rotate: 2 }}
              whileTap={{ scale: 0.95 }}
            >
              <img src={sample.url} alt={sample.alt} />
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  );
}

// Sample photos (you can replace with actual image URLs)
const SAMPLE_PHOTOS = [
  { url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400', alt: 'Mountains' },
  { url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400', alt: 'Beach' },
  { url: 'https://images.unsplash.com/photo-1506929562872-bb421503ef21?w=400', alt: 'Nature' },
  { url: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=400', alt: 'Mountains' }
];

export default PhotoUpload;
