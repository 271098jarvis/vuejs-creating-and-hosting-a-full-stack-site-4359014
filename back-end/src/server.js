import express from 'express';
import { MongoClient } from 'mongodb';
import {cartItems as cartItemsRaw, products as productsRaw} from './temp-data.js'

async function start() {
  const mongoUrl = `mongodb+srv://root:exalead@cluster0.fkvgkmc.mongodb.net/?retryWrites=true&w=majority`
  const client = new MongoClient(mongoUrl)

  const app = express();
  app.use(express.json());

  await client.connect();
  const db = client.db('vueDB');

  app.get('/products', async (req, res) => {
    const products = await db.collection('oilproducts').find({}).toArray()
    res.json(products)
  });

  app.get('/users/:userId/cart', async (req, res) => {
    const user = await db.collection('users').findOne({ id: req.params.userId })
    const populatedCart = await populateCartIds(user.cart);
    res.json(populatedCart);
  });

  app.get('/products/:productId', async (req, res) => {
    const product = await db.collection('oilproducts').findOne({ id: req.params.productId })
    res.json(product)
  });

  app.post('/users/:userId/cart', async (req, res) => {
    const userId = req.params.userId;
    const productId = req.body.id;
    await db.collection('users').updateOne({ id: userId }, {
      $addToSet: { cart: productId }
    });
    
    const user = await db.collection('users').findOne({ id: req.params.userId })
    const populatedCart = await populateCartIds(user.cart);
    res.json(populatedCart);
  })

  app.delete('/users/:userId/cart/:productId', async (req, res) => {
    const userId = req.params.userId;
    const productId = req.params.productId;
    await db.collection('users').updateOne({ id: userId }, {
      $pull: { cart: productId }
    });
    
    const user = await db.collection('users').findOne({ id: req.params.userId })
    const populatedCart = await populateCartIds(user.cart);
    res.json(populatedCart);
  })

  app.listen(8000, () => {
    console.log("Server is running at port 8000");
  });

  //Helper Functions
  async function populateCartIds(ids){
    await client.connect();
    const db = client.db('vueDB');
    return Promise.all(ids.map(id => db.collection('oilproducts').findOne({ id })));
  }
}

start();