const express = require("express");
const Stripe = require('stripe')

const paymentRouter = express.Router();


const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

paymentRouter.post("/create-checkout-session", async (req, res) => {
    try {
      const { name, price,courseId, img, userId } = req.body;
  
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: [
          {
            price_data: {
              currency: "inr",
              product_data: { 
                name: name,
                images:[img]
             },
              unit_amount: price,
            },
            quantity: 1,
          },
        ],
        mode: "payment",
        success_url: `http://localhost:3000/success?session_id={CHECKOUT_SESSION_ID}&courseId=${courseId}&userId=${userId}`,
        cancel_url: "http://localhost:3000/learnlink",
      });
  
      res.json({ id: session.id });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

module.exports = {
    paymentRouter,
  };
  