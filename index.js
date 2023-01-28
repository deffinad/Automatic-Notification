var express = require('express');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var router = require('./src/routes/routes');

var app = express();
var PORT = process.env.PORT || 3001;

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.listen(PORT, () => console.log(`Server is running is port ${PORT}`))

app.use('/v1', router);

module.exports = app;
