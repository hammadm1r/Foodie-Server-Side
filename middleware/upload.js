const multer  = require('multer')
const path = require('path');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/products')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.fieldname + '-' + uniqueSuffix)
    }
  })
//   const fileFilterConfig = function(req, file, cb) {
//     if (file.mimetype === "image/jpeg"
//         || file.mimetype === "image/png") {
//         // calling callback with true
//         // as mimetype of file is image
//         cb(null, true);
//     } else {
//         // false to indicate not to store the file
//         cb(null, false);
//     }
// };
  const upload = multer({ storage: storage ,
    limits: {
        // limits file size to 5 MB
        fileSize: 1024 * 1024 * 5
    }
    // ,fileFilter: fileFilterConfig,
});
  module.exports = upload;