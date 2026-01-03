const axios = require('axios');
require('dotenv').config();

const domains = [
  'https://jogja.wablas.com',
  'https://solo.wablas.com',
  'https://tx.wablas.com',
  'https://kudus.wablas.com',
  'https://pati.wablas.com',
  'https://console.wablas.com',
  'https://eu.wablas.com',
  'https://us.wablas.com'
];

async function testDomain(domain) {
  const url = `${domain}/api/send-message`;
  console.log(`Testing: ${domain}...`);

  try {
    const response = await axios.post(url, {
      phone: process.env.WA_TARGET,
      message: `Test from domain check: ${domain}`,
    }, {
      headers: {
        'Authorization': process.env.WABLAS_API_KEY,
        'Content-Type': 'application/json'
      },
      timeout: 5000 // 5 seconds timeout
    });

    if (response.data.status) {
      console.log(`✅ SUCCESS on ${domain}!`);
      console.log('Response:', response.data);
      return true;
    } else {
      console.log(`❌ Failed on ${domain}:`, response.data.message);
      return false;
    }
  } catch (error) {
    if (error.response) {
      console.log(`❌ Error on ${domain}: ${error.response.status} - ${JSON.stringify(error.response.data)}`);
    } else {
      console.log(`❌ Connection Error on ${domain}: ${error.message}`);
    }
    return false;
  }
}

async function runTests() {
  console.log('Starting Wablas Domain Discovery...');
  console.log('Target Phone:', process.env.WA_TARGET);
  
  let successDomain = null;

  for (const domain of domains) {
    const success = await testDomain(domain);
    if (success) {
      successDomain = domain;
      break; // Stop after first success
    }
  }

  if (successDomain) {
    console.log('\n🎉 FOUND WORKING DOMAIN:', successDomain);
    console.log('Please update your server.js to use this domain.');
  } else {
    console.log('\n⚠️ All domains failed. Please check your API Key and Device Status again.');
  }
}

runTests();