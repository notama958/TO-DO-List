// const app = require('./app');
const connectDb = require('../config/db');
const express = require('express');
const app = express();

// mongo connect
connectDb();

app.use(express.json({ extended: false })); // for route put
app.use('/', require('./app'));
const port = process.env.PORT || 5000;
app.listen(port, () => {
  /* eslint-disable no-console */
  console.log(`Listening: http://localhost:${port}`);
  /* eslint-enable no-console */
});
