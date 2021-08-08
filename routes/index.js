var express = require('express');
var router = express.Router();
var productService = require('../product-service')
const multipart   = require('connect-multiparty');
const FeedBack = require('../feedback-model');
const fileUpload = require('../file-upload');

const multipartMiddleware = multipart();
router.get('/productref/:id', function(req, res, next) {
  productService.get(req,res);
});

router.post('/file-upload', multipartMiddleware, fileUpload);
router.get('/feedbacklist', function (req, res, next){
  res.sendFile(path.resolve('/../build'));
})
router.get('/feedback', (req, res, next) =>{
  //var feedbackModel = new FeedBack({});
  FeedBack.find({}).then(function (feedback) {
   return res.send({"feedback":feedback});
  });
  
});


module.exports = router;
