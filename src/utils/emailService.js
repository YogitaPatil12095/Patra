// Email service using EmailJS
// Setup instructions:
// 1. Sign up at https://www.emailjs.com/
// 2. Create an email service (Gmail, Outlook, etc.)
// 3. Create an email template with these variables (examples):
//    - {{recipient_name}}
//    - {{recipient_email}}
//    - {{sender_name}}
//    - {{postcard_url}}
//    - {{message_preview}}
//    - {{to_email}}, {{to_name}}, {{from_name}}
//    - (optional) {{name}}, {{time}}, {{message}} for richer layout
// 4. Get your Public Key, Service ID, and Template ID
// 5. Replace the placeholder values below

const EMAILJS_CONFIG = {
  publicKey: 'GvxxhtAb-5TtYhsAd', // Replace with your EmailJS public key
  serviceId: 'service_5id6rdm',  // Replace with your service ID
  templateId: 'template_z19mz2d' // Replace with your template ID
};

/**
 * Send postcard via EmailJS
 * @param {Object} postcardData - The postcard data
 * @returns {Promise<Object>} Result with success status
 */
export async function sendPostcard(postcardData) {
  try {
    // Load EmailJS library dynamically
    if (!window.emailjs) {
      await loadEmailJS();
    }

    // Initialize EmailJS with public key
    window.emailjs.init(EMAILJS_CONFIG.publicKey);

    // Validate required fields before making request
    if (!postcardData || !postcardData.recipientEmail) {
      console.error('Missing recipient email in postcardData:', postcardData);
      return { success: false, error: 'Recipient email is empty' };
    }

    // Prepare template parameters
    // EmailJS templates sometimes expect `to_email`, `to_name`, `from_name` etc.
    // Include both our app names and the common EmailJS names to avoid template mismatches.
    const templateParams = {
      // app-specific keys
      recipient_name: postcardData.recipientName,
      recipient_email: postcardData.recipientEmail,
      sender_name: postcardData.senderName,
      postcard_url: postcardData.postcardUrl,
      message_preview: (postcardData.message || '').substring(0, 100) + '...',

      // common EmailJS template keys (ensure template has matching variables)
      to_email: postcardData.recipientEmail,
      to_name: postcardData.recipientName,
      from_name: postcardData.senderName,
      from_email: postcardData.senderEmail || '',

      // additional keys for richer templates
      name: postcardData.senderName,
      time: new Date().toLocaleString(),
      message: postcardData.message || ''
    };

    // Send email
    // Log the params we'll send so you can inspect them in DevTools
    console.log('Sending EmailJS template params:', templateParams);

    try {
      const response = await window.emailjs.send(
        EMAILJS_CONFIG.serviceId,
        EMAILJS_CONFIG.templateId,
        templateParams
      );
      console.log('Email sent successfully (SDK):', response);
      return { success: true, response };
    } catch (sdkError) {
      console.warn('EmailJS SDK send failed, attempting direct REST call', sdkError);

      // Fallback: call EmailJS REST API directly so we control the payload shape
      try {
        const restResult = await directSendEmail(templateParams);
        console.log('Email sent successfully (REST):', restResult);
        return { success: true, response: restResult };
      } catch (restError) {
        console.error('Direct EmailJS REST send failed:', restError);
        throw restError;
      }
    }

  } catch (error) {
    // Provide richer error information for debugging in the UI and console
    console.error('Email send failed (raw):', error);
    const errorText = (error && (error.text || error.message || error.statusText)) || 'Failed to send email';
    const status = error && (error.status || error.statusCode) ;
    return { 
      success: false, 
      error: errorText,
      status: status,
      raw: error
    };
  }
}

/**
 * Load EmailJS library dynamically
 */
function loadEmailJS() {
  return new Promise((resolve, reject) => {
    if (window.emailjs) {
      resolve();
      return;
    }

    const script = document.createElement('script');
    // Use EmailJS browser bundle from CDN. This URL should expose `emailjs` on window.
    script.src = 'https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js';
    script.onload = () => {
      // Some CDNs may load the script but the global may not be set instantly — wait briefly.
      if (window.emailjs) return resolve();
      setTimeout(() => {
        if (window.emailjs) resolve();
        else reject(new Error('EmailJS loaded but `window.emailjs` is not available'));
      }, 50);
    };
    script.onerror = (e) => reject(new Error('Failed to load EmailJS script'));
    document.head.appendChild(script);
  });
}

/**
 * Send directly to EmailJS REST API as a fallback so we can inspect request/response.
 * @param {Object} templateParams
 */
async function directSendEmail(templateParams) {
  const url = 'https://api.emailjs.com/api/v1.0/email/send';
  const body = {
    service_id: EMAILJS_CONFIG.serviceId,
    template_id: EMAILJS_CONFIG.templateId,
    user_id: EMAILJS_CONFIG.publicKey,
    template_params: templateParams
  };

  console.log('Performing direct EmailJS REST POST', body);

  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  });

  const text = await res.text();
  let data;
  try { data = JSON.parse(text); } catch (e) { data = text; }

  if (!res.ok) {
    const err = new Error('EmailJS REST send failed');
    err.status = res.status;
    err.response = data;
    throw err;
  }

  return data;
}

/**
 * Example email template (copy this to EmailJS):
 * 
 * Subject: You received a vintage postcard from {{sender_name}}! 📮
 * 
 * Body:
 * 
 * Hello {{recipient_name}},
 * 
 * {{sender_name}} has sent you a special vintage postcard!
 * 
 * Click the button below to open and view your postcard with a beautiful animation:
 * 
 * [Open Your Postcard]
 * {{postcard_url}}
 * 
 * Message preview:
 * {{message_preview}}
 * 
 * This postcard was created with love using our Vintage Postcard Creator.
 * 
 * Best regards,
 * The Vintage Postcard Team
 */

export default { sendPostcard };
