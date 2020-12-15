const express = require('express');
const router = express.Router();

router.use(express.json());
router.use('/task', require('./task'));

router.get('/', (req, res) => {
  res.json({
    message: 'API - 👋🌎🌍🌏',
  });
});

module.exports = router;
