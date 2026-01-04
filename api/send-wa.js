const axios = require("axios");

module.exports = async (req, res) => {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ message: "Data tidak lengkap" });
    }

    const text = `
📩 PESAN BARU DARI PORTOFOLIO

Nama  : ${name}
Email : ${email}

Pesan:
${message}
    `.trim();

    const response = await axios.post(
      "https://api.wablas.com/v2/send-message",
      {
        phone: process.env.WA_TARGET,
        message: text,
      },
      {
        headers: {
          Authorization: process.env.WABLAS_API_KEY,
          "Content-Type": "application/json",
        },
      }
    );

    return res.status(200).json({
      success: true,
      data: response.data,
    });
  } catch (error) {
    console.error(error.response?.data || error.message);
    return res.status(500).json({
      success: false,
      error: error.response?.data || error.message,
    });
  }
};
