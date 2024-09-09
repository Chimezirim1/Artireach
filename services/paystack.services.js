import axios from 'axios';

const PaystackService = {
  initializePayment: async (email, amount) => {
    const headers = {
      Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
      'Content-Type': 'application/json',
    };
    const data = {
      email: email,
      amount: amount * 100, // Paystack expects amount in kobo
    };

    try {
      const response = await axios.post(
        'https://api.paystack.co/transaction/initialize',
        data,
        { headers }
      );
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : error;
    }
  },

  verifyPayment: async (reference) => {
    const headers = {
      Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
    };

    try {
      const response = await axios.get(
        `https://api.paystack.co/transaction/verify/${reference}`,
        { headers }
      );
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : error;
    }
  },
};

export default PaystackService;
