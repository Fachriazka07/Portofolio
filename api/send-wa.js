// Backend Serverless Function for Vercel
module.exports = async (req, res) => {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*'); // Allow all origins
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  // Handle OPTIONS request
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // Only allow POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  console.log('--- Incoming Request to /api/send-wa ---');
  console.log('Body:', req.body);

  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ 
        success: false, 
        message: 'Name, email, and message are required' 
      });
    }

    const currentDate = new Date().toLocaleString('id-ID', {
      dateStyle: 'full',
      timeStyle: 'medium'
    });

    const formattedMessage = `
📩 *Pesan Baru dari Website*

*Nama*  : ${name}
*Email* : ${email}
*Waktu* : ${currentDate}

*Pesan*:
${message}
    `.trim();

    const payload = {
      phone: process.env.WA_TARGET,
      message: formattedMessage,
      secret: 'rzN3WXD8', // Secret Key untuk bypass IP Whitelist
      retry: false,
      isGroup: false,
    };

    // Ganti domain sesuai server Wablas user (misal: https://bdg.wablas.com)
    const wablasResponse = await fetch('https://bdg.wablas.com/api/send-message', {
      method: 'POST',
      headers: {
        'Authorization': process.env.WABLAS_API_KEY,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    const responseData = await wablasResponse.json();

    // Wablas API biasanya mengembalikan status true/false di dalam data
    console.log('--- Wablas Response ---');
    console.log('Status:', wablasResponse.status);
    console.log('Data:', JSON.stringify(responseData, null, 2));

    if (responseData.status) {
      res.status(200).json({
        success: true,
        data: responseData
      });
    } else {
      console.error('Wablas Error:', responseData);
      res.status(500).json({
        success: false,
        message: 'Failed to send WhatsApp message',
        details: responseData
      });
    }

  } catch (error) {
    console.error('Server Error:', error.message);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message
    });
  }
};
