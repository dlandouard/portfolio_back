const express = require('express');

const cors = require('cors');
const mainRouter = require('./routes');


const app = express();

app.use(
    cors({
      origin: process.env.CLIENT_URL,
      credentials: true,
    }),
  );

app.use(express.json());

app.use('/image', express.static('public/image'));

app.get('/', (req, res) => {
    res.status(200).json({ foo: 'Hello World, welcome in my portfolio backend API' });
  });

app.use('/api', mainRouter);


module.exports = app;