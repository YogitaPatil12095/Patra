# 📮 Vintage Postcard Creator

A beautiful, vintage-styled web application that lets users design digital postcards and send them via email with delightful animations.

![Vintage Postcard Demo](https://via.placeholder.com/800x400/fec5bb/6b5b4f?text=Vintage+Postcard+Creator)

## ✨ Features

- 🎨 **Vintage Aesthetic**: Soft pastel colors, handwritten fonts, and paper textures
- 📸 **Photo Upload**: Drag-and-drop or click to upload your favorite memories
- ✍️ **Message Editor**: Write heartfelt messages with a handwritten feel
- 🎫 **Vintage Stamps**: Choose from 10 beautiful vintage-style stamps
- 🎬 **Animated Opening**: Envelope opens → bouquet appears → photo pops → letter slides up
- 🔊 **Text-to-Speech**: Listen to postcards read aloud with a warm, friendly voice
- 📧 **Email Integration**: Send postcards via EmailJS (no backend required!)
- 📱 **Mobile Responsive**: Beautiful on all devices

## 🚀 Quick Start

### Prerequisites

- Node.js 16+ installed
- npm or yarn package manager

### Installation

1. **Clone or download this project**

```bash
cd vintage-postcard
```

2. **Install dependencies**

```bash
npm install
```

3. **Start development server**

```bash
npm run dev
```

4. **Open your browser**

Navigate to `http://localhost:3000`

## 📧 Email Setup (EmailJS)

To enable email sending, you need to set up EmailJS:

### Step 1: Create EmailJS Account

1. Go to [https://www.emailjs.com/](https://www.emailjs.com/)
2. Sign up for a free account (200 emails/month)

### Step 2: Add Email Service

1. In EmailJS dashboard, go to "Email Services"
2. Click "Add New Service"
3. Choose your email provider (Gmail recommended)
4. Follow the authentication steps
5. Copy your **Service ID**

### Step 3: Create Email Template

1. Go to "Email Templates"
2. Click "Create New Template"
3. Use this template structure:

**Subject:**
```
You received a vintage postcard from {{sender_name}}! 📮
```

**Body:**
```
Hello {{recipient_name}},

{{sender_name}} has sent you a special vintage postcard!

Click the button below to open and view your postcard:

{{postcard_url}}

Message preview:
{{message_preview}}

Created with love,
The Vintage Postcard Team
```

4. Save and copy your **Template ID**

### Step 4: Get Public Key

1. Go to "Account" → "General"
2. Copy your **Public Key**

### Step 5: Configure the App

Open `src/utils/emailService.js` and replace the placeholders:

```javascript
const EMAILJS_CONFIG = {
  publicKey: 'YOUR_PUBLIC_KEY_HERE',    // From step 4
  serviceId: 'YOUR_SERVICE_ID_HERE',     // From step 2
  templateId: 'YOUR_TEMPLATE_ID_HERE'    // From step 3
};
```

That's it! Email sending will now work. 🎉

## 🎨 Customization

### Colors

Edit the color palette in `src/App.css`:

```css
:root {
  --pink-light: #fec5bb;
  --pink-medium: #fcd5ce;
  --sage: #d8e2dc;
  /* ... more colors */
}
```

### Fonts

The app uses:
- **Caveat** - Handwritten style
- **Crimson Text** - Body text

To change fonts, update the Google Fonts import in `src/App.css`.

### Stamps

Add or modify stamps in `src/components/StampSelector.jsx`:

```javascript
const STAMPS = [
  { id: 1, emoji: '🌹', label: 'Rose', color: '#fec5bb' },
  // Add your own!
];
```

### Sample Photos

Update sample photos in `src/components/PhotoUpload.jsx`:

```javascript
const SAMPLE_PHOTOS = [
  { url: 'https://your-image-url.com', alt: 'Description' },
  // Add more samples
];
```

## 🏗️ Project Structure

```
vintage-postcard/
├── src/
│   ├── components/
│   │   ├── PostcardBuilder.jsx      # Main creation flow
│   │   ├── PostcardViewer.jsx       # Animated viewer
│   │   ├── PhotoUpload.jsx          # Photo selection
│   │   ├── MessageEditor.jsx        # Message writing
│   │   ├── StampSelector.jsx        # Stamp picker
│   │   ├── SendForm.jsx             # Email form
│   │   └── TTSControls.jsx          # Text-to-speech
│   ├── utils/
│   │   ├── emailService.js          # EmailJS integration
│   │   └── textToSpeech.js          # Web Speech API
│   ├── App.jsx                      # Root component
│   ├── App.css                      # All styles
│   └── main.jsx                     # Entry point
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

## 🎬 Animation Timeline

The postcard opening sequence:

1. **0-2s**: Envelope appears and flap opens upward
2. **2-3s**: Small bouquet fades in and floats up
3. **3-4s**: Photo pops up with gentle rotation
4. **4-6s**: Letter slides up from bottom

All animations use `framer-motion` with custom easing curves for a smooth, delightful experience.

## 🔊 Text-to-Speech

The app uses the **Web Speech API** (built into modern browsers) to read postcards aloud:

- **Rate**: 0.9 (slightly slower for warmth)
- **Pitch**: 1.1 (slightly higher for friendliness)
- **Voice Selection**: Prefers female/natural voices

Supports:
- ▶️ Play
- ⏸️ Pause
- ⏹️ Stop

## 📱 Browser Support

- ✅ Chrome/Edge 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

**Note**: Text-to-speech availability varies by browser and OS.

## 🚢 Deployment

### Build for Production

```bash
npm run build
```

This creates an optimized build in the `dist/` folder.

### Deploy Options

**Vercel** (Recommended)
```bash
npm i -g vercel
vercel
```

**Netlify**
```bash
# Install Netlify CLI
npm i -g netlify-cli

# Deploy
netlify deploy --prod
```

**GitHub Pages**
1. Update `vite.config.js` with base path
2. Build and push `dist/` folder

## 🛠️ Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

### Code Style

- Functional React components with hooks
- Framer Motion for animations
- CSS custom properties for theming
- Mobile-first responsive design

## 🎯 Future Enhancements

Ideas for expanding the app:

- [ ] Multiple postcard templates
- [ ] Sticker/decoration options
- [ ] Save drafts to localStorage
- [ ] Download as PDF
- [ ] Social media sharing
- [ ] Custom stamp upload
- [ ] Animation speed controls
- [ ] Gallery of sent postcards

## 📝 License

MIT License - feel free to use this project for personal or commercial purposes!

## 🙏 Credits

- **Fonts**: Google Fonts (Caveat, Crimson Text)
- **Animations**: Framer Motion
- **Email**: EmailJS
- **Icons**: Emoji (native)

## 💌 Feedback

Found a bug or have a suggestion? Please open an issue or submit a pull request!

---

Made with ❤️ and nostalgia for handwritten letters

