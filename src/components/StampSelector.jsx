import React from 'react';
import { motion } from 'framer-motion';

function StampSelector({ selectedStamp, onStampSelect }) {
  return (
    <div className="stamp-selector-section">
      <h2 className="section-title">Choose Your Stamp</h2>
      <p className="section-description">
        Add a vintage touch with a classic postage stamp
      </p>

      <div className="stamps-grid">
        {STAMPS.map((stamp) => (
          <motion.button
            key={stamp.id}
            className={`stamp-card ${selectedStamp?.id === stamp.id ? 'selected' : ''}`}
            onClick={() => onStampSelect(stamp)}
            whileHover={{ scale: 1.05, y: -5 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            <div className="stamp-preview">
              <div className="stamp-perforations" />
              <div className="stamp-content" style={{ backgroundColor: stamp.color }}>
                <span className="stamp-emoji">{stamp.emoji}</span>
                <span className="stamp-label">{stamp.label}</span>
              </div>
            </div>
            
            {selectedStamp?.id === stamp.id && (
              <motion.div 
                className="selection-indicator"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
              >
                ✓
              </motion.div>
            )}
          </motion.button>
        ))}
      </div>
    </div>
  );
}

const STAMPS = [
  { id: 1, emoji: '🌹', label: 'Rose', color: '#fec5bb' },
  { id: 2, emoji: '🌻', label: 'Sunflower', color: '#ffd7ba' },
  { id: 3, emoji: '🦋', label: 'Butterfly', color: '#d8e2dc' },
  { id: 4, emoji: '🏔️', label: 'Mountain', color: '#e8e8e4' },
  { id: 5, emoji: '🌊', label: 'Ocean', color: '#fcd5ce' },
  { id: 6, emoji: '🌙', label: 'Moon', color: '#ece4db' },
  { id: 7, emoji: '☀️', label: 'Sun', color: '#ffe5d9' },
  { id: 8, emoji: '🌲', label: 'Pine', color: '#fae1dd' },
  { id: 9, emoji: '🍂', label: 'Autumn', color: '#fec89a' },
  { id: 10, emoji: '❤️', label: 'Heart', color: '#f8edeb' }
];

export default StampSelector;
