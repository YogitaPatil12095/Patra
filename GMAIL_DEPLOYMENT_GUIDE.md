# 📧 Gmail Setup & 🚀 Deployment Guide

## Part 1: Gmail Configuration (EmailJS)

### Step 1: Create EmailJS Account
1. Go to **https://www.emailjs.com/**
2. Click **"Sign Up Free"**
3. Use your Gmail to sign up
4. Verify your email

### Step 2: Connect Gmail Service
1. In EmailJS dashboard, click **"Email Services"**
2. Click **"Add New Service"**
3. Select **"Gmail"**
4. Click **"Connect Account"**
5. **Sign in with your Gmail**
6. **Allow EmailJS access** (it's safe!)
7. Copy your **Service ID** (looks like: `service_abc1234`)
   - Save it in a notepad!

### Step 3: Create Email Template
1. Click **"Email Templates"** in sidebar
2. Click **"Create New Template"**
3. **Delete everything** and paste this:

**Template Name:** `postcard_notification`

**Subject:**
```
You received a vintage postcard from {{sender_name}}! 📮
```

**Content (HTML):**
```html
<p>Hello {{recipient_name}},</p>

<p><strong>{{sender_name}}</strong> has sent you a special vintage postcard!</p>

<p>Click the button below to open and view your beautiful postcard:</p>

<a href="{{postcard_url}}" style="display: inline-block; padding: 12px 24px; background-color: #fec89a; color: white; text-decoration: none; border-radius: 25px; font-weight: bold;">
  Open Your Postcard
</a>

<p>Or copy this link: {{postcard_url}}</p>

<p style="color: #888; font-size: 14px;">Message preview: {{message_preview}}</p>

<hr>

<p style="color: #888; font-size: 12px;">Created with Vintage Postcard Creator</p>
```

4. Click **"Save"**
5. Copy your **Template ID** (looks like: `template_xyz7890`)
   - Save it in notepad!

### Step 4: Get Public Key
1. Click **"Account"** in sidebar
2. Click **"General"** tab
3. Find **"Public Key"** section
4. Copy the key (looks like: `AbC123dEfGh456`)
   - Save it in notepad!

### Step 5: Update Your Code
1. In VS Code, open **`src/utils/emailService.js`**
2. Find lines 10-14:
```javascript
const EMAILJS_CONFIG = {
  publicKey: 'YOUR_PUBLIC_KEY',    // Replace with your key
  serviceId: 'YOUR_SERVICE_ID',     // Replace with your service ID
  templateId: 'YOUR_TEMPLATE_ID'    // Replace with your template ID
};
```

3. Replace with YOUR values:
```javascript
const EMAILJS_CONFIG = {
  publicKey: 'AbC123dEfGh456',      // Your actual public key
  serviceId: 'service_abc1234',     // Your actual service ID
  templateId: 'template_xyz7890'    // Your actual template ID
};
```

4. **Save the file** (Ctrl+S)

### Step 6: Test It!
1. Make sure your app is running (`npm run dev`)
2. Create a test postcard
3. Use your own email as recipient
4. Click **"Send Postcard"**
5. Check your Gmail inbox! 📬

✅ **Email setup complete!**

---

## Part 2: Deployment (Make it Live!)

### 🌟 Option A: Vercel (Easiest - Recommended)

#### Step 1: Create Vercel Account
1. Go to **https://vercel.com/**
2. Click **"Sign Up"**
3. Choose **"Continue with GitHub"**
4. Create a GitHub account if needed

#### Step 2: Push to GitHub
1. Go to **https://github.com/**
2. Click **"+"** → **"New repository"**
3. Name it: `vintage-postcard-app`
4. Click **"Create repository"**
5. In VS Code terminal, run these commands:

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/vintage-postcard-app.git
git push -u origin main
```
*(Replace YOUR_USERNAME with your GitHub username)*

#### Step 3: Deploy to Vercel
1. Go back to **https://vercel.com/dashboard**
2. Click **"Add New..."** → **"Project"**
3. Click **"Import"** next to your repository
4. Click **"Deploy"**
5. Wait 1-2 minutes ⏳
6. 🎉 **Done!** You'll get a live URL like: `https://vintage-postcard-app.vercel.app`

#### Step 4: Share Your App!
- Copy the URL
- Send to friends
- They can create postcards!

---

### 🌟 Option B: Netlify (Also Easy)

#### Step 1: Build Your App
In VS Code terminal:
```bash
npm run build
```
This creates a `dist` folder with optimized files.

#### Step 2: Deploy to Netlify
1. Go to **https://www.netlify.com/**
2. Click **"Sign Up"** (use GitHub)
3. Drag and drop the **`dist`** folder onto the Netlify page
4. Wait 30 seconds ⏳
5. 🎉 **Live!** You get a URL like: `https://random-name.netlify.app`

#### Step 3: Custom Domain (Optional)
1. In Netlify dashboard, click **"Domain settings"**
2. Click **"Add custom domain"**
3. Follow instructions to connect your domain

---

### 🌟 Option C: GitHub Pages (Free)

#### Step 1: Update Config
In `vite.config.js`, add base path:
```javascript
export default defineConfig({
  plugins: [react()],
  base: '/vintage-postcard-app/',  // Add this line
  server: {
    port: 3000,
    open: true
  }
});
```

#### Step 2: Add Deploy Script
In `package.json`, add to `"scripts"`:
```json
"scripts": {
  "dev": "vite",
  "build": "vite build",
  "preview": "vite preview",
  "deploy": "npm run build && gh-pages -d dist"
}
```

#### Step 3: Install gh-pages
```bash
npm install --save-dev gh-pages
```

#### Step 4: Deploy
```bash
npm run deploy
```

Your site will be live at:
`https://YOUR_USERNAME.github.io/vintage-postcard-app/`

---

## 🔒 Important Security Notes

### Protect Your EmailJS Keys
**Never share your keys publicly!**

If deploying, your keys are in the code, which is OK because:
- EmailJS has rate limits (200 emails/month free)
- Public key is designed to be public
- You can add domain restrictions in EmailJS dashboard

#### To Add Domain Restrictions:
1. In EmailJS, go to **"Account"** → **"Security"**
2. Add your domain: `your-app.vercel.app`
3. Only requests from that domain will work

---

## 📊 Monitor Your App

### EmailJS Dashboard
- See how many emails sent
- Check delivery status
- Monitor usage limits

### Vercel/Netlify Analytics
- See visitor count
- Check performance
- View error logs

---

## 🎯 Quick Deployment Comparison

| Platform | Difficulty | Cost | Speed | Best For |
|----------|-----------|------|-------|----------|
| **Vercel** | ⭐ Easy | Free | Fast | Best overall |
| **Netlify** | ⭐ Easy | Free | Fast | Drag & drop |
| **GitHub Pages** | ⭐⭐ Medium | Free | Medium | Learning Git |

**Recommendation:** Start with **Vercel** - it's the easiest!

---

## 🐛 Common Deployment Issues

### "Build failed"
**Fix:** Make sure `npm run build` works locally first

### "Page shows but broken"
**Fix:** Check browser console (F12) for errors

### "Email not sending after deployment"
**Fix:** Double-check EmailJS keys are correct in `emailService.js`

### "404 error on refresh"
**Fix:** Add this to `public` folder as `_redirects`:
```
/*    /index.html   200
```

---

## ✅ Final Checklist

Before going live:

- [ ] EmailJS configured and tested
- [ ] App works locally (`npm run dev`)
- [ ] Build succeeds (`npm run build`)
- [ ] Test on mobile device
- [ ] Add your own photos to samples
- [ ] Update README with your info
- [ ] Test email sending with real address
- [ ] Share with friends! 🎉

---

## 📧 EmailJS Template Variables Reference

When creating your template, use these variables:

| Variable | Description | Example |
|----------|-------------|---------|
| `{{sender_name}}` | Person sending postcard | "John" |
| `{{recipient_name}}` | Person receiving postcard | "Sarah" |
| `{{recipient_email}}` | Recipient's email | "sarah@example.com" |
| `{{postcard_url}}` | Link to view postcard | "https://your-app.com?postcard=..." |
| `{{message_preview}}` | First 100 chars of message | "Dear friend, I hope..." |

---

## 🚀 Quick Start Commands Reference

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Deploy to GitHub Pages (if configured)
npm run deploy

# Stop the server
Ctrl+C (then press Y)
```

---

## 📱 Testing Before Deployment

### Test Locally:
1. Run `npm run dev`
2. Test all features:
   - Upload photo
   - Write message
   - Select stamp
   - Send postcard
   - View animation
   - Text-to-speech

### Test Email:
1. Use your own email as test
2. Check spam folder if not in inbox
3. Click link in email
4. Verify postcard opens correctly

### Test Production Build:
```bash
npm run build
npm run preview
```
This shows how it will work when deployed.

---

## 🎨 Customization Before Deployment

### Update Branding:
1. Change colors in `src/App.css`
2. Update app title in `index.html`
3. Add your own sample photos
4. Customize email template

### Add Analytics (Optional):
1. Sign up for Google Analytics
2. Add tracking code to `index.html`
3. Monitor visitor stats

---

## 💡 Pro Tips

1. **Test email thoroughly** - Send to different email providers (Gmail, Outlook, Yahoo)
2. **Mobile first** - Most users will view on mobile
3. **Add loading states** - Users should see feedback when sending
4. **Error handling** - Show friendly messages when things fail
5. **Keep it simple** - Don't add too many features at once

---

## 🆘 Need Help?

### Common Questions:

**Q: Can I use a different email provider?**
A: Yes! EmailJS supports Gmail, Outlook, Yahoo, and more.

**Q: Is it really free?**
A: Yes! EmailJS free tier: 200 emails/month. Vercel/Netlify: unlimited traffic (free tier).

**Q: Can I add my own domain?**
A: Yes! Both Vercel and Netlify support custom domains (you need to buy domain separately).

**Q: How do I update my deployed app?**
A: Just push to GitHub, Vercel auto-deploys. Or drag new `dist` folder to Netlify.

**Q: Can I see who viewed postcards?**
A: Not by default, but you can add analytics to track page views.

---

## 🎯 Next Steps After Deployment

1. **Share with friends** - Get feedback
2. **Monitor usage** - Check EmailJS dashboard
3. **Add features** - See UX_SUGGESTIONS.md for ideas
4. **Optimize** - Improve based on user feedback
5. **Promote** - Share on social media

---

**You're all set! Good luck with your deployment! 🚀**

If you get stuck, refer back to this guide or check the README.md file.
