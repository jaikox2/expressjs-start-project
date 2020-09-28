const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const logger = require('morgan');
require('dotenv').config();

// require router
const routeIdx = require('./router/index');
const routeUpload = require('./router/upload');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(logger('dev'));
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

app.use('/api/uploads', express.static(path.join(`${__dirname}/../uploads`)));

// log req and res handler
app.use(async (req, res, next) => {
  // request
  // eslint-disable-next-line no-console
  console.log(req.originalUrl);

  // responses
  res.on('finish', async () => {
    if (res.statusCode === 200) {
      // eslint-disable-next-line no-console
      console.log(res.statusCode, req.originalUrl);
    }
  });

  next();
});

// router use
app.use('/api', routeIdx);
app.use('/api', routeUpload);

// error handler
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  if (err.status === 500) {
    // eslint-disable-next-line no-console
    console.error(err);
    res.status(500).send({
      message: 'server error',
    });
  } else {
    res.status(500).send({
      message: err.message,
    });
  }
});

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`server runs on port ${PORT}`);
});
