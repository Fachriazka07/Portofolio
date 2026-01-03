const axios = require('axios');
require('dotenv').config();

async function testWablas() {
  console.log('Testing Wablas Connection...');
  console.log('API Key:', process.env.WABLAS_API_KEY ? 'Present' : 'Missing');
  console.log('Target:', process.env.WA_TARGET);

  const payload = {
    phone: process.env.WA_TARGET,
    message: 'Test message from Backend Direct Test',
    secret: 'rzN3WXD8', // Secret Key untuk bypass IP Whitelist
    retry: false,
    isGroup: false,
  };

  try {
    const response = await axios.post('https://bdg.wablas.com/api/send-message', payload, {
      headers: {
        'Authorization': process.env.WABLAS_API_KEY,
        'Content-Type': 'application/json'
      }
    });

    console.log('--- Success ---');
    console.log('Status:', response.status);
    console.log('Data:', response.data);
  } catch (error) {
    console.error('--- Error ---');
    if (error.response) {
      console.error('Status:', error.response.status);
      console.error('Data:', error.response.data);
    } else {
      console.error(error.message);
    }
  }
}

testWablas();