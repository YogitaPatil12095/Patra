import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import TTSControls from './TTSControls';

function PostcardViewer({ data, onBack }) {
  const [animationStage, setAnimationStage] = useState(0);
  const [showTTS, setShowTTS] = useState(false);

  useEffect(() => {
    // Animation sequence timing
    const timings = [2000, 1000, 1000, 1000]; // ms for each stage
    
    const timeouts = timings.map((delay, index) => {
      return setTimeout(() => {
        setAnimationStage(index + 1);
        if (index === 3) setShowTTS(true);
      }, timings.slice(0, index + 1).reduce((a, b) => a + b, 0));
    });

    return () => timeouts.forEach(clearTimeout);
  }, []);

  if (!data) {
    return <div className="error">No postcard data available</div>;
  }

  return (
    <div className="postcard-viewer">
      <div className="viewer-background" />
      
      {/* Stage 0-1: Envelope opens */}
      <AnimatePresence>
        {animationStage <= 1 && (
          <motion.div 
            className="envelope-container"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ 
              scale: 1, 
              opacity: 1,
              rotateX: animationStage === 1 ? 15 : 0
            }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <div className="envelope-body">
              <motion.div 
                className="envelope-flap"
                initial={{ rotateX: 0 }}
                animate={{ 
                  rotateX: animationStage >= 1 ? -180 : 0,
                  originY: 0
                }}
                transition={{ 
                  duration: 2, 
                  ease: [0.34, 1.56, 0.64, 1]
                }}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Stage 2: Bouquet appears */}
      <AnimatePresence>
        {animationStage >= 2 && (
          <motion.div 
            className="bouquet-container"
            initial={{ y: 50, opacity: 0, scale: 0.5 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            transition={{ 
              duration: 1, 
              ease: "easeOut",
              type: "spring",
              stiffness: 100
            }}
          >
            <div className="bouquet">
              <span className="flower">🌸</span>
              <span className="flower">🌼</span>
              <span className="flower">🌺</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Stage 3: Photo pops up */}
      <AnimatePresence>
        {animationStage >= 3 && (
          <motion.div 
            className="photo-frame"
            initial={{ scale: 0, rotate: -10, opacity: 0 }}
            animate={{ scale: 1, rotate: 2, opacity: 1 }}
            transition={{ 
              duration: 0.8,
              ease: [0.34, 1.56, 0.64, 1]
            }}
          >
            <div className="photo-border">
              <img 
                src={data.photo} 
                alt="Postcard memory" 
                className="photo-image"
              />
              
              {/* Stamp */}
              <div className="stamp-on-photo">
                <div 
                  className="stamp-content-small"
                  style={{ backgroundColor: data.stamp?.color }}
                >
                  <span className="stamp-emoji-small">
                    {data.stamp?.emoji}
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Stage 4: Letter slides up */}
      <AnimatePresence>
        {animationStage >= 4 && (
          <motion.div 
            className="letter-container"
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ 
              duration: 1,
              ease: "easeOut",
              type: "spring",
              stiffness: 60
            }}
          >
            <div className="letter-paper">
              <div className="letter-header">
                <p className="letter-to">To: {data.recipientName || 'You'}</p>
                <p className="letter-from">From: {data.senderName || 'A Friend'}</p>
              </div>
              
              <div className="letter-body">
                <p className="letter-message">{data.message}</p>
              </div>

              <div className="letter-signature">
                <p className="signature-line">With love,</p>
                <p className="signature-name">{data.senderName}</p>
              </div>
            </div>

            {showTTS && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <TTSControls text={data.message} />
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Back button (only show after animation) */}
      {animationStage >= 4 && onBack && (
        <motion.button
          className="back-button"
          onClick={onBack}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          ← Back
        </motion.button>
      )}
    </div>
  );
}

export default PostcardViewer;
