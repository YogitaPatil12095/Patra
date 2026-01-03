import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { speakText, stopSpeaking, pauseSpeaking, resumeSpeaking } from '../utils/textToSpeech';

function TTSControls({ text }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isSupported, setIsSupported] = useState(true);

  useEffect(() => {
    // Check if browser supports speech synthesis
    if (!window.speechSynthesis) {
      setIsSupported(false);
    }

    return () => {
      stopSpeaking();
    };
  }, []);

  const handlePlay = () => {
    if (isPaused) {
      resumeSpeaking();
      setIsPaused(false);
      setIsPlaying(true);
    } else {
      speakText(text, {
        onStart: () => setIsPlaying(true),
        onEnd: () => {
          setIsPlaying(false);
          setIsPaused(false);
        },
        onError: () => {
          setIsPlaying(false);
          setIsPaused(false);
          alert('Speech synthesis failed. Please try again.');
        }
      });
    }
  };

  const handlePause = () => {
    pauseSpeaking();
    setIsPaused(true);
    setIsPlaying(false);
  };

  const handleStop = () => {
    stopSpeaking();
    setIsPlaying(false);
    setIsPaused(false);
  };

  if (!isSupported) {
    return (
      <div className="tts-unsupported">
        Your browser doesn't support text-to-speech
      </div>
    );
  }

  return (
    <motion.div 
      className="tts-controls"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <p className="tts-label">🎙️ Listen to your postcard</p>
      
      <div className="tts-buttons">
        {!isPlaying && !isPaused && (
          <motion.button
            className="tts-button play"
            onClick={handlePlay}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            ▶️ Play
          </motion.button>
        )}

        {isPlaying && (
          <motion.button
            className="tts-button pause"
            onClick={handlePause}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            ⏸️ Pause
          </motion.button>
        )}

        {isPaused && (
          <motion.button
            className="tts-button resume"
            onClick={handlePlay}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            ▶️ Resume
          </motion.button>
        )}

        {(isPlaying || isPaused) && (
          <motion.button
            className="tts-button stop"
            onClick={handleStop}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            ⏹️ Stop
          </motion.button>
        )}
      </div>

      {isPlaying && (
        <motion.div 
          className="audio-wave"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <span className="wave-bar" />
          <span className="wave-bar" />
          <span className="wave-bar" />
          <span className="wave-bar" />
          <span className="wave-bar" />
        </motion.div>
      )}
    </motion.div>
  );
}

export default TTSControls;
