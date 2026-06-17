import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { name, phone, email, service, message, to, subject } = req.body;

    // Validate required fields
    if (!name || !email || !message) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const emailData = {
      from: 'JM² Tiling Co <noreply@jm2tilingco.com>',
      to: to || 'enquiries@jm2tilingco.com',
      subject: subject || `New Enquiry from ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #c9a84c; border-bottom: 2px solid #c9a84c; padding-bottom: 10px;">
            New Contact Form Submission
          </h2>
          <div style="background: #f8f8f8; padding: 20px; border-radius: 5px; margin: 20px 0;">
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Service:</strong> ${service || 'Not specified'}</p>
          </div>
          <div style="margin: 20px 0;">
            <h3 style="color: #333;">Message:</h3>
            <p style="background: #fff; padding: 15px; border-left: 4px solid #c9a84c; white-space: pre-wrap;">${message}</p>
          </div>
          <p style="color: #666; font-size: 12px; margin-top: 30px;">
            This email was sent from the contact form at www.jm2tilingco.com
          </p>
        </div>
      `,
    };

    // Send email using Resend
    const { data, error } = await resend.emails.send(emailData);

    if (error) {
      console.error('Resend error:', error);
      throw new Error('Failed to send email');
    }

    console.log('Email sent successfully:', data);
    res.status(200).json({ success: true, message: 'Form submitted successfully' });
  } catch (error) {
    console.error('Contact form error:', error);
    res.status(500).json({ error: 'Failed to submit form' });
  }
}
