import React, { useState } from 'react';
import { motion } from 'framer-motion';
import PhotoUpload from './PhotoUpload';
import MessageEditor from './MessageEditor';
import StampSelector from './StampSelector';
import SendForm from './SendForm';

function PostcardBuilder({ onPostcardCreated, onPreview }) {
  const [step, setStep] = useState(1);
  const [postcardData, setPostcardData] = useState({
    photo: null,
    message: '',
    senderName: '',
    recipientEmail: '',
    recipientName: '',
    stamp: null
  });

  const updateData = (field, value) => {
    setPostcardData(prev => ({ ...prev, [field]: value }));
  };

  const handleNext = () => {
    if (step < 4) setStep(step + 1);
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const handlePreview = () => {
    onPreview(postcardData);
  };

  const handleSend = async (emailData) => {
    const finalData = { ...postcardData, ...emailData };
    const shareUrl = onPostcardCreated(finalData);
    return shareUrl;
  };

  const progress = (step / 4) * 100;

  return (
    <div className="postcard-builder">
      <div className="builder-header">
        <motion.h1 
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="builder-title"
        >
          Create Your Vintage Postcard
        </motion.h1>
        
        <div className="progress-bar">
          <motion.div 
            className="progress-fill"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
        
        <div className="step-indicators">
          {[1, 2, 3, 4].map(num => (
            <div 
              key={num}
              className={`step-dot ${step >= num ? 'active' : ''}`}
            >
              {num}
            </div>
          ))}
        </div>
      </div>

      <motion.div 
        className="builder-content"
        key={step}
        initial={{ x: 20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: -20, opacity: 0 }}
        transition={{ duration: 0.4 }}
      >
        {step === 1 && (
          <PhotoUpload 
            photo={postcardData.photo}
            onPhotoSelect={(photo) => updateData('photo', photo)}
          />
        )}

        {step === 2 && (
          <MessageEditor 
            message={postcardData.message}
            onMessageChange={(msg) => updateData('message', msg)}
          />
        )}

        {step === 3 && (
          <StampSelector 
            selectedStamp={postcardData.stamp}
            onStampSelect={(stamp) => updateData('stamp', stamp)}
          />
        )}

        {step === 4 && (
          <SendForm 
            data={postcardData}
            onSend={handleSend}
            onPreview={handlePreview}
          />
        )}
      </motion.div>

      <div className="builder-navigation">
        {step > 1 && (
          <button onClick={handleBack} className="btn-secondary">
            ← Back
          </button>
        )}
        
        {step < 4 && (
          <button 
            onClick={handleNext} 
            className="btn-primary"
            disabled={!isStepComplete(step, postcardData)}
          >
            Next →
          </button>
        )}
      </div>
    </div>
  );
}

// Helper function to validate step completion
function isStepComplete(step, data) {
  switch(step) {
    case 1: return data.photo !== null;
    case 2: return data.message.trim().length > 0;
    case 3: return data.stamp !== null;
    default: return true;
  }
}

export default PostcardBuilder;
