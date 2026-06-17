export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { name, phone, email, service, area, description, timeline, budget, to, subject } = req.body;

    // Validate required fields
    if (!name || !email || !description) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Here you would typically:
    // 1. Send email using a service like SendGrid, Resend, or AWS SES
    // 2. Store in a database
    // 3. Send notification to Slack/Discord
    
    // For now, we'll just log and return success
    console.log('Quote form submission:', {
      to: to || 'enquiries@jm2tilingco.com',
      subject: subject || `Quote Request from ${name}`,
      data: { name, phone, email, service, area, description, timeline, budget }
    });

    // Example email sending with Resend (you'd need to add your API key)
    // const resend = new Resend(process.env.RESEND_API_KEY);
    // await resend.emails.send({
    //   from: 'noreply@jm2tilingco.com',
    //   to: to || 'enquiries@jm2tilingco.com',
    //   subject: subject || `Quote Request from ${name}`,
    //   html: `
    //     <h2>New Quote Request</h2>
    //     <p><strong>Name:</strong> ${name}</p>
    //     <p><strong>Phone:</strong> ${phone}</p>
    //     <p><strong>Email:</strong> ${email}</p>
    //     <p><strong>Service:</strong> ${service}</p>
    //     <p><strong>Area:</strong> ${area} m²</p>
    //     <p><strong>Description:</strong></p>
    //     <p>${description}</p>
    //     <p><strong>Timeline:</strong> ${timeline}</p>
    //     <p><strong>Budget:</strong> ${budget}</p>
    //   `
    // });

    res.status(200).json({ success: true, message: 'Quote submitted successfully' });
  } catch (error) {
    console.error('Quote form error:', error);
    res.status(500).json({ error: 'Failed to submit quote' });
  }
}
