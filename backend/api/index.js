import express from 'express';
import axios from 'axios';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Endpoint untuk mengirim WhatsApp
// Menggunakan /api prefix untuk kompatibilitas dengan Vercel Rewrites
app.post('/api/send-wa', async (req, res) => {
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
    const response = await axios.post('https://bdg.wablas.com/api/send-message', payload, {
      headers: {
        'Authorization': process.env.WABLAS_API_KEY,
        'Content-Type': 'application/json'
      }
    });

    // Wablas API biasanya mengembalikan status true/false di dalam data
    console.log('--- Wablas Response ---');
    console.log('Status:', response.status);
    console.log('Data:', JSON.stringify(response.data, null, 2));

    if (response.data.status) {
      res.json({
        success: true,
        data: response.data
      });
    } else {
      console.error('Wablas Error:', response.data);
      res.status(500).json({
        success: false,
        message: 'Failed to send WhatsApp message',
        details: response.data
      });
    }

  } catch (error) {
    console.error('Server Error:', error.message);
    if (error.response) {
        console.error('Wablas Error Response:', error.response.data);
        console.error('Status:', error.response.status);
        console.error('Headers:', error.response.headers);
    }
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message,
      details: error.response ? error.response.data : null
    });
  }
});

// Root route for testing
app.get('/api', (req, res) => {
  res.json({ message: 'Backend is running!' });
});

export default app;
