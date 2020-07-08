const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const multerS3 = require('multer-s3');
const aws = require('aws-sdk');
const productController = require("./controllers/ProductController");
const xss = require('xss-clean');
const mongoSanitize = require('express-mongo-sanitize');
const cors = require('cors');

// DB instance Connection
require("./config/db");

// Credentials
const creds = require('./config/aws');

const app = express();
app.use(cors());

const s3 = new aws.S3({
  accessKeyId: creds.accessKeyId,
  secretAccessKey: creds.secretAccessKey
});

const upload = multer({
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB file size limit
  storage: multerS3({
    s3: s3,
    bucket: creds.bucketName,
    contentType: multerS3.AUTO_CONTENT_TYPE,
    acl: creds.acl,
    key: function (req, file, cb) {
      cb(null, Date.now().toString())
    },
  })
}).array('file')

const port = process.env.PORT || 5000;
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// Protect API
app.use(express.json({ limit : '10kb' })); //DOS Protection, body limit is 10
app.use(xss());
app.use(mongoSanitize());


// POST route to upload files
app.post('/upload', (req, res) => {
  upload(req, res, (err) => {
    if (err instanceof multer.MulterError) {
        return res.status(500).json(err)
    } else if (err) {
        return res.status(500).json(err)
    }
    return res.status(200).send(req.file);
  })
});


app
  .route('/products')
  .get(productController.listAllProducts)
  .post(productController.createNewProduct)

app
  .route("/products/:_id")
  .get(productController.readProduct)
  .put(productController.updateProduct)
  .delete(productController.deleteProduct)

app
  .route("/memoid/:_id")
  .put(productController.addMemoId)

app
  .route("/memoidrm/:_id")
  .put(productController.removeMemoId)

app
  .route("/pk")
  .get(productController.getAllPubKey)

  // ERROR handling to catch all others
  app.use((req, res, next) => {
    const error = new Error('Not Found');
    error.status = 404;
    next(error);
  });
  app.use((error, req, res, next) =>{
    res.status(error.status || 500);
    res.json({
      error: {
        message: error.message
      }
    });
  });

app.listen(port, () => {
  console.log(`Server has started at ${port}`)
});
