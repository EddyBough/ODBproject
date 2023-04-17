const multer = require('multer');

const MIMETYPES = {
  'image/jpg': 'jpg',
  'image/jpeg': 'jpg',
  'image/png': 'png'
};

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, './assets/uploads/');
  },
  filename: (req, file, callback) => {
    const name = file.originalname.split(' ').join('');
    const extension = MIMETYPES[file.mimetype];
    callback(null, name + Date.now() + '.' + extension);
  }
});

const upload = multer({ 
  storage: storage, 
  limits:{
    fieldSize:102410243
  }
})

module.exports = upload