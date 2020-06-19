const express = require('express');
const router = express.Router();
const crypto = require('crypto');

const multer  = require('multer')

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'static/images/')
  },
  filename: function (req, file, cb) {
    let filename = crypto.randomBytes(12).toString('hex');
    if(file.mimetype == 'image/jpeg'){
      filename += '.jpg'
    }else if(file.mimetype == 'image/png'){
      filename += '.png'
    }
    cb(null, filename)
  }
})

const fileFilter = (req, file, cb) =>{
  if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png'){
    cb(null, true);
  }else{
    cb(null, false);
  }
}
const upload = multer({ storage: storage, fileFilter: fileFilter});

router.post('/uploadImage', upload.single('blogImage'), (req, res, next) => {
  res.status(202).send(req.file.path);
});

router.post('/uploadImage', upload.single('reportImage'), (req, res, next) => {
  res.status(202).send(req.file.path);
});

module.exports = router;
