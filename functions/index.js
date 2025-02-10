const functions = require("firebase-functions");
const admin = require("firebase-admin");
const stripe = require("stripe")("sk_test_YourSecretKeyHere");

admin.initializeApp();

exports.createCheckoutSession = functions.https.onRequest(async (req, res) => {
  try {
    const { cartItems } = req.body;

    const line_items = cartItems.map(item => ({
      price_data: {
        currency: "usd",
        product_data: {
          name: item.title,
        },
        unit_amount: item.price * 100,
      },
      quantity: 1,
    }));

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items,
      mode: "payment",
      success_url: "https://yourwebsite.com/success",
      cancel_url: "https://yourwebsite.com/cancel",
    });

    res.json({ id: session.id });
  } catch (error) {
    console.error("❌ Stripe error:", error);
    res.status(500).json({ error: error.message });
  }
});
