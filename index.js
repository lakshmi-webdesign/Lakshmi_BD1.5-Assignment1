let express = require("express");
let cors = require("cors");

const app = express();
app.use(cors());

const taxRate = 5;
const discountedPercentage = 10;
const loyalRate = 2;

function calculteCartTotal(newItemPrice, cartTotal) {
  return newItemPrice + cartTotal;
}

app.get("/cart-total", (req, res) => {
  let newItemPrice = parseFloat(req.query.newItemPrice);
  let cartTotal = parseFloat(req.query.cartTotal);
  res.send(calculteCartTotal(newItemPrice, cartTotal).toString());
});

function applyDiscount(cartTotal, isMember) {
  if (isMember === "true") {
    return cartTotal - (cartTotal * discountedPercentage) / 100;
  } else {
    return cartTotal;
  }
}

app.get("/membership-discount", (req, res) => {
  let cartTotal = parseFloat(req.query.cartTotal);
  let isMember = req.query.isMember;
  res.send(applyDiscount(cartTotal, isMember).toString());
});

app.get("/calculate-tax", (req, res) => {
  let cartTotal = parseFloat(req.query.cartTotal);
  let tax = (cartTotal * taxRate) / 100;
  res.send(tax.toString());
});

function estimateDelivery(shippingMethod, distance) {
  if (shippingMethod === "express") {
    return distance / 100;
  } else {
    return distance / 50;
  }
}

app.get("/estimate-delivery", (req, res) => {
  let shippingMethod = req.query.shippingMethod;
  let distance = parseFloat(req.query.distance);
  res.send(estimateDelivery(shippingMethod, distance).toString());
});

app.get("/shipping-cost", (req, res) => {
  let weight = parseFloat(req.query.weight);
  let distance = parseFloat(req.query.distance);
  let shippingCost = weight * distance * 0.1;
  res.send(shippingCost.toString());
});

app.get("/loyalty-points", (req, res) => {
  let purchaseAmount = parseFloat(req.query.purchaseAmount);
  let loyaltyPoints = purchaseAmount * loyalRate;
  res.send(loyaltyPoints.toString());
});

app.listen(3000, () => {
  console.log(`Server is running on port 3000`);
});
