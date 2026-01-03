import React from 'react';
import { motion } from 'framer-motion';

function MessageEditor({ message, onMessageChange }) {
  const characterCount = message.length;
  const maxCharacters = 500;

  return (
    <div className="message-editor-section">
      <h2 className="section-title">Write Your Message</h2>
      <p className="section-description">
        Share your thoughts, memories, or kind words
      </p>

      <motion.div 
        className="message-paper"
        initial={{ rotateX: -15, opacity: 0 }}
        animate={{ rotateX: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className="paper-lines" />
        
        <textarea
          className="message-textarea"
          value={message}
          onChange={(e) => onMessageChange(e.target.value)}
          placeholder="Dear friend,&#10;&#10;Wish you were here...&#10;&#10;With love,"
          maxLength={maxCharacters}
          rows={12}
        />

        <div className="character-count">
          {characterCount} / {maxCharacters}
        </div>
      </motion.div>

      <div className="message-tips">
        <h3 className="tips-title">💡 Writing Tips</h3>
        <ul className="tips-list">
          <li>Be personal and heartfelt</li>
          <li>Share a specific memory or moment</li>
          <li>End with a warm closing</li>
        </ul>
      </div>
    </div>
  );
}

export default MessageEditor;
