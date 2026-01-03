import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PostcardBuilder from './components/PostcardBuilder';
import PostcardViewer from './components/PostcardViewer';
import './App.css';

function App() {
  const [view, setView] = useState('builder'); // 'builder' or 'viewer'
  const [postcardData, setPostcardData] = useState(null);

  useEffect(() => {
    // Check if we're viewing a postcard from URL
    const params = new URLSearchParams(window.location.search);
    const encodedData = params.get('postcard');
    
    if (encodedData) {
      try {
        // URL-decode then base64-decode (we URI-encoded the base64 string when creating the link)
        const decodedJson = base64DecodeUnicode(decodeURIComponent(encodedData));
        const decoded = JSON.parse(decodedJson);
        setPostcardData(decoded);
        setView('viewer');
      } catch (e) {
        console.error('Invalid postcard data', e);
      }
    }
  }, []);

  const handlePostcardCreated = (data) => {
    setPostcardData(data);
    // Generate shareable URL
    const encoded = base64EncodeUnicode(JSON.stringify(data));
    // URI-encode the base64 string so it survives being placed into URLs and emails
    const encodedSafe = encodeURIComponent(encoded);
    const shareUrl = `${window.location.origin}${window.location.pathname}?postcard=${encodedSafe}`;
    console.log('Shareable URL:', shareUrl);
    return shareUrl;
  };

  // Helpers to safely base64-encode/decode UTF-8 strings
  function base64EncodeUnicode(str) {
    try {
      return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, function(match, p1) {
        return String.fromCharCode('0x' + p1);
      }));
    } catch (e) {
      console.error('base64EncodeUnicode failed', e);
      return btoa(str);
    }
  }

  function base64DecodeUnicode(str) {
    try {
      return decodeURIComponent(Array.prototype.map.call(atob(str), function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join(''));
    } catch (e) {
      console.error('base64DecodeUnicode failed', e);
      return atob(str);
    }
  }

  const handlePreview = (data) => {
    setPostcardData(data);
    setView('viewer');
  };

  const handleBackToBuilder = () => {
    setView('builder');
  };

  return (
    <div className="app">
      <AnimatePresence mode="wait">
        {view === 'builder' ? (
          <motion.div
            key="builder"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <PostcardBuilder 
              onPostcardCreated={handlePostcardCreated}
              onPreview={handlePreview}
            />
          </motion.div>
        ) : (
          <motion.div
            key="viewer"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <PostcardViewer 
              data={postcardData}
              onBack={handleBackToBuilder}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
