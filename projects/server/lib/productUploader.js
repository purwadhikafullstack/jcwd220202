const multer = require("multer");

const uploadProduct = ({
  // filename = Date.now(),
  // filePrefix = "FILE",
  acceptedFileTypes = [],
}) => {
  const diskStorage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, `public`);
    },
    // filename: (req, file, cb) => {
    //   cb(null, `${filePrefix}-${filename}.${file.mimetype.split("/")[1]}`);
    // },
    filename: function (req, file, cb) {
      images = `${Date.now()}.${file.mimetype.split("/")[1]}`;
      cb(null, images);
    },
  });

  const fileFilter = (req, file, cb) => {
    const extension = file.mimetype.split("/")[1];
    // const fileSize = parseInt(req.headers["content-length"]);
    if (acceptedFileTypes.includes(extension)) {
      if (
        file.mimetype === "image/png" ||
        file.mimetype === "image/jpg" ||
        file.mimetype === "image/jpeg"
      ) {
        cb(null, true);
      }
      cb(null, true);
    } else {
      cb(new Error("invalid file type"));
    }
  };

  return multer({
    storage: diskStorage,
    fileFilter,
  });
};

module.exports = {
  uploadProduct,
};
