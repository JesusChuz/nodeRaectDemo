const express = require('express');

const path = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const index = require('./routes/index');

const app = express();

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'build')));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use('/api', index);
app.get('*', (req, res) => {
  res.sendFile('build/index.html', { root: global });
});

/*const multipartMiddleware = multipart();
console.log("Hooking in");
app.post('/file-upload', multipartMiddleware, fileUpload);
app.get('/feedbacklist', function (request, response){
  response.sendFile(path.join(__dirname, 'build'));
})
app.get('/feedback', (req, res) =>{
  var feedbackModel = new FeedBack({});
  FeedBack.find({}).then(function (feedback) {
   return res.send({"feedback":feedback});
  });
  
});

app.get('/productref/:id', (req, res) =>{
  ProductReference.find({productid:req.params.id}).then(function (productref) {
   return res.send({"productref":productref});
  });
});*/
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
