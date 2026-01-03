import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { sendPostcard } from '../utils/emailService';

function SendForm({ data, onSend, onPreview }) {
  const [formData, setFormData] = useState({
    senderName: '',
    recipientName: '',
    recipientEmail: ''
  });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSending(true);

    try {
      // Generate shareable URL
      const shareUrl = await onSend(formData);
      
      // Send email via EmailJS
      const result = await sendPostcard({
        ...data,
        ...formData,
        postcardUrl: shareUrl
      });

      if (result.success) {
        setSent(true);
      } else {
        setError(result.error || 'Failed to send postcard');
      }
    } catch (err) {
      setError('Something went wrong. Please try again.');
      console.error('Send error:', err);
    } finally {
      setSending(false);
    }
  };

  if (sent) {
    return (
      <motion.div 
        className="success-message"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
      >
        <div className="success-icon">✉️</div>
        <h2 className="success-title">Postcard Sent!</h2>
        <p className="success-text">
          Your vintage postcard is on its way to {formData.recipientName}
        </p>
        <motion.button
          className="btn-primary"
          onClick={() => window.location.reload()}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Create Another
        </motion.button>
      </motion.div>
    );
  }

  return (
    <div className="send-form-section">
      <h2 className="section-title">Send Your Postcard</h2>
      <p className="section-description">
        Who will receive this special message?
      </p>

      <form onSubmit={handleSubmit} className="send-form">
        <div className="form-group">
          <label htmlFor="senderName" className="form-label">
            Your Name
          </label>
          <input
            id="senderName"
            type="text"
            className="form-input"
            value={formData.senderName}
            onChange={(e) => handleChange('senderName', e.target.value)}
            placeholder="How should you be addressed?"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="recipientName" className="form-label">
            Recipient's Name
          </label>
          <input
            id="recipientName"
            type="text"
            className="form-input"
            value={formData.recipientName}
            onChange={(e) => handleChange('recipientName', e.target.value)}
            placeholder="Who will receive this?"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="recipientEmail" className="form-label">
            Recipient's Email
          </label>
          <input
            id="recipientEmail"
            type="email"
            className="form-input"
            value={formData.recipientEmail}
            onChange={(e) => handleChange('recipientEmail', e.target.value)}
            placeholder="name@example.com"
            required
          />
        </div>

        {error && (
          <motion.div 
            className="error-message"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {error}
          </motion.div>
        )}

        <div className="form-actions">
          <motion.button
            type="button"
            className="btn-secondary"
            onClick={onPreview}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            👁️ Preview
          </motion.button>

          <motion.button
            type="submit"
            className="btn-primary"
            disabled={sending}
            whileHover={{ scale: sending ? 1 : 1.02 }}
            whileTap={{ scale: sending ? 1 : 0.98 }}
          >
            {sending ? (
              <span className="sending-spinner">Sending...</span>
            ) : (
              '✉️ Send Postcard'
            )}
          </motion.button>
        </div>
      </form>

      <div className="send-info">
        <p className="info-text">
          🔒 Your recipient will receive an email with a link to view 
          their beautiful animated postcard. No attachments, just magic!
        </p>
      </div>
    </div>
  );
}

export default SendForm;
