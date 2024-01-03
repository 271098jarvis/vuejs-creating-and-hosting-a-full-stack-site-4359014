import express from 'express';
import { MongoClient } from 'mongodb';
import {cartItems as cartItemsRaw, products as productsRaw} from './temp-data.js'

const mongoUrl = `mongodb+srv://root:exalead@cluster0.fkvgkmc.mongodb.net/?retryWrites=true&w=majority`
const client = new MongoClient(mongoUrl)

let cartItems = cartItemsRaw;
let products = productsRaw;

const app = express();

app.use(express.json());

app.get('/hello', (req, res) => {
  res.json(req)
});

app.get('/products', (req, res) => {
  res.json(products)
});

app.get('/cart', (req, res) => {
  const populatedCart = populateCartIds(cartItems);
  res.json(populatedCart);
});

app.get('/products/:productId', (req, res) => {
  const product = products.find(product => product.id === req.params.productId);
  res.json(product)
});

app.post('/cart', (req, res) => {
  const productId = req.body.id;
  cartItems.push(productId);
  const populatedCart = populateCartIds(cartItems);
  res.json(populatedCart);
})

app.delete('/cart/:productId', (req, res) => {
  const productId = req.params.productId;
  cartItems = cartItems.filter(id => id !== productId);
  const populatedCart = populateCartIds(cartItems);
  res.json(populatedCart);
})

app.listen(8000, () => {
  console.log("Server is running at port 8000");
});

//Helper Functions
function populateCartIds(ids){
  return ids.map(id => products.find(product => product.id === id));
}