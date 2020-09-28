const router = require('express').Router();

router.get('/', (req, res, next) => {
  try {
    res.status(200).send('Hi');
  } catch (error) {
    error.status = 500;
    next(error);
  }
});

module.exports = router;
