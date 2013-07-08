
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , actions = require('./routes/action')
  , observer = require('./routes/observer')
  , http = require('http')
, path = require('path');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/users', user.list);
app.all('/observer/:content/', observer.action);
app.all('/:action/:content/', actions.action);




var server = http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});


// socket.io
//var server = require('http').createServer(app);
var io = require('socket.io').listen(server);
app.get('/hello', function(req, res){
    res.render('sio_test', {});
});

var sio = require('./routes/sio');
sio.mysio(io);