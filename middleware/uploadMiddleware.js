const multer = require('multer');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    console.log('File mimetype:', file.mimetype);
    let folder;
    if (file.mimetype.includes('image')) {
      folder = 'uploads/images';
    } else if (file.mimetype.includes('pdf') || file.mimetype.includes('msword')) {
      folder = 'uploads/documents';
    } else if (
      file.mimetype === 'application/zip' ||
      file.mimetype === 'application/x-zip-compressed' ||
      file.mimetype === 'multipart/x-zip'
    ) {
      folder = 'uploads/sourceCodes';
    }
     else {
      return cb(new Error('Invalid file type'), false);
    }
    cb(null, folder);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

module.exports = upload;
