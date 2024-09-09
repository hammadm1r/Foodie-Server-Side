///// Require /////

const express = require("express");
const dbconnection = require("./db");
const app = express();
const authentication = require("./router/authentication");
const bodyParser = require("body-parser");
const cors = require("cors");
const morgan = require("morgan");
const productRouter = require("./router/productRouter");
const cart = require("./router/cart");
const stripe = require("stripe")(
  "sk_test_51PwtMYKEO6ZlnIFb1YSHlousemfho2QDxLdTtsDcoNIgxCi6lLzpbsdf7jGF9BQarxFlP9NbEskpoTWAuFqoZ7Q200Bm08JGtt"
);
///// Require /////

////  Configuration ////

require("dotenv").config();
dbconnection;

////  Configuration ////

////  Declaration  ////
const PORT = process.env.PORT;

////  Declaration  ////

app.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
    methods: "GET,POST,PUT,DELETE",
    allowedHeaders: "Content-Type,Authorization",
  })
);
app.use((req, res, next) => {
  res.setHeader(
    "Content-Security-Policy",
    "script-src 'self' https://m.stripe.network 'sha256-/5Guo2nzv5n/w6ukZpOBZOtTJBJPSkJ6mhHpnBgm3Ls=' https://www.google-analytics.com/analytics.js"
  );
  next();
});
app.options("*", cors());
app.use("/uploads", express.static("uploads"));
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));
app.use("/products", productRouter);
app.use("/auth", authentication);
app.use("/cart", cart);

app.post("/api/create-checkout-session", async (req, res) => {
  const { products } = req.body;
  console.log(products);
  const lineItems = products.map((el) => ({
    price_data: {
      currency: "usd",
      product_data: {
        name: el.name,
      },
      unit_amount: el.price * 100,
    },
    quantity: el.quantity,
  }));
  const session = await stripe.checkout.sessions.create({
    payment_method_types:['card'],
    line_items: lineItems,
    mode: "payment",
    success_url: "http://localhost:5173/success",
    cancel_url: "http://localhost:5173/cancel",
  });
  // Your existing logic here
  res.json({ id:session.id });
});

app.get("/", (req, res) => {
  res.send("Hello World");
});
app.listen(PORT);
