// const app = require('./app');
const connectDb = require('../config/db');
const express = require('express');
const app = express();
const path = require('path');
// mongo connect
connectDb();

app.use(express.json({ extended: false })); // for route put
app.use('/', require('./app'));

// serve static assets in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('../../frontend/build')),
    app.get('*', (req, res) => {
      res.sendFile(
        path.resolve(__dirname, '../../frontend', 'build', 'index.html')
      );
    });
}

const port = process.env.PORT || 5000;
app.listen(port, () => {
  /* eslint-disable no-console */
  console.log(`Listening: http://localhost:${port}`);
  /* eslint-enable no-console */
});
