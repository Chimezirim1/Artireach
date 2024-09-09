import PaystackService from '../services/paystack.services.js';

const PaystackController = {
  initializePayment: async (req, res) => {
    const { email, amount } = req.body;

    try {
      const paymentData = await PaystackService.initializePayment(email, amount);
      res.status(200).json({
        success: true,
        message: 'Payment initialized successfully',
        data: paymentData,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Failed to initialize payment',
        error: error.message || error,
      });
    }
  },

  verifyPayment: async (req, res) => {
    const { reference } = req.params;

    try {
      const paymentData = await PaystackService.verifyPayment(reference);
      res.status(200).json({
        success: true,
        message: 'Payment verified successfully',
        data: paymentData,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Failed to verify payment',
        error: error.message || error,
      });
    }
  },
};

export default PaystackController;
