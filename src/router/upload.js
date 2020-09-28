const router = require('express').Router();
const multer = require('multer');
const fs = require('fs');

const Storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, `${__dirname}/../../uploads/`);
  },
  filename(req, file, cb) {
    const mime = file.mimetype.split('/');
    cb(null, `upload-${Date.now()}-${Math.floor(Math.random() * 1000)}.${mime[1]}`);
  },
});
const upload = multer({ storage: Storage });

router.post('/upload', upload.any(), (req, res, next) => {
  try {
    res.status(200).send({
      message: 'success',
      data: {
        files: req.files.map((item) => ({ url: `/upload/${item.filename}` })),
      },
    });
  } catch (error) {
    error.status = 500;
    next(error);
  }
});

router.post('/ckeditor/upload', upload.any(), (req, res) => {
  try {
    res.send({
      uploaded: true,
      url: `${process.env.baseAPI}/upload/${req.files[0].filename}`,
    });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('ckeditor err', error);
    res.send({
      upload: false,
      error: {
        message: error.message,
      },
    });
  }
});

router.get('/upload/:name', async (req, res, next) => {
  const { name } = req.params;
  const path = `./uploads/${name}`;

  if (fs.existsSync(path)) {
    res.download(path);
  } else {
    const err = new Error('not found that file');
    next(err);
  }
});

module.exports = router;
