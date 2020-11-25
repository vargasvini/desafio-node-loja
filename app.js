const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const catalogRoutes = require('./routes/catalog');
const authRoutes = require('./routes/auth');
const compression = require('compression')

const app = express();
app.use(bodyParser.json());
app.use(compression());

app.get('/', (req, res)=>{
    res.status(200).send('Root da API - Desafio Loja')
});

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Methods',
    'OPTIONS, GET, POST, PUT, PATCH, DELETE'
  );
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

app.use('/auth', authRoutes);
app.use('/catalog', catalogRoutes);

app.use((error, req, res, next) => {
  console.log(error);
  const status = error.statusCode || 500;
  const message = error.message;
  const data = error.data;
  res.status(status).json({ message: message, data: data });
});

const port = process.env.PORT || 3000;
const connection_url = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.f6tex.mongodb.net/${process.env.MONGO_DATABASE}?retryWrites=true&w=majority`;

mongoose
  .connect(connection_url, {
      useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true
  })
  .then(result => {
      app.listen(port, ()=>{
          console.log(`Listening on localhost:${port}`)
      });
  })
  .catch(err => console.log(err));