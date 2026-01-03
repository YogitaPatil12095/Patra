// Text-to-Speech utility using Web Speech API

let currentUtterance = null;

/**
 * Speak text with a warm, friendly voice
 * @param {string} text - The text to speak
 * @param {Object} options - Callbacks and settings
 */
export function speakText(text, options = {}) {
  // Stop any current speech
  stopSpeaking();

  // Check if browser supports speech synthesis
  if (!window.speechSynthesis) {
    console.error('Speech synthesis not supported');
    if (options.onError) options.onError();
    return;
  }

  // Create utterance
  currentUtterance = new SpeechSynthesisUtterance(text);

  // Configure voice settings for warm, friendly tone
  currentUtterance.rate = 0.9;   // Slightly slower for warmth
  currentUtterance.pitch = 1.1;  // Slightly higher for friendliness
  currentUtterance.volume = 1.0; // Full volume

  // Try to select a pleasant voice
  const voices = window.speechSynthesis.getVoices();
  
  // Prefer female voices or voices with "natural" in name
  const preferredVoice = voices.find(voice => 
    voice.name.includes('Female') || 
    voice.name.includes('Natural') ||
    voice.name.includes('Samantha') ||
    voice.name.includes('Victoria')
  ) || voices[0]; // Fallback to first available voice

  if (preferredVoice) {
    currentUtterance.voice = preferredVoice;
  }

  // Set up callbacks
  currentUtterance.onstart = () => {
    console.log('Speech started');
    if (options.onStart) options.onStart();
  };

  currentUtterance.onend = () => {
    console.log('Speech ended');
    currentUtterance = null;
    if (options.onEnd) options.onEnd();
  };

  currentUtterance.onerror = (event) => {
    console.error('Speech error:', event);
    currentUtterance = null;
    if (options.onError) options.onError(event);
  };

  // Start speaking
  window.speechSynthesis.speak(currentUtterance);
}

/**
 * Stop current speech
 */
export function stopSpeaking() {
  if (window.speechSynthesis) {
    window.speechSynthesis.cancel();
    currentUtterance = null;
  }
}

/**
 * Pause current speech
 */
export function pauseSpeaking() {
  if (window.speechSynthesis && window.speechSynthesis.speaking) {
    window.speechSynthesis.pause();
  }
}

/**
 * Resume paused speech
 */
export function resumeSpeaking() {
  if (window.speechSynthesis && window.speechSynthesis.paused) {
    window.speechSynthesis.resume();
  }
}

/**
 * Check if currently speaking
 */
export function isSpeaking() {
  return window.speechSynthesis && window.speechSynthesis.speaking;
}

/**
 * Load voices (needed for some browsers)
 */
export function loadVoices() {
  return new Promise((resolve) => {
    const voices = window.speechSynthesis.getVoices();
    if (voices.length > 0) {
      resolve(voices);
      return;
    }

    // Wait for voices to load
    window.speechSynthesis.onvoiceschanged = () => {
      resolve(window.speechSynthesis.getVoices());
    };
  });
}

export default {
  speakText,
  stopSpeaking,
  pauseSpeaking,
  resumeSpeaking,
  isSpeaking,
  loadVoices
};
