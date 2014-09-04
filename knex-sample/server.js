var express = require('express'),
    knex = require('knex'),
    bookshelf = require('bookshelf'),
    app = express();
    
var db_config = knex(require('./knexfile').development);
var bs = bookshelf(db_config);

var User = bs.Model.extend({
  tableName: 'users'
});

app.set('bookshelf', bs);

app.get('/new', function(req, res){
  var user = new User({ email: 'foo@bar.com' });
  user.save().then(function(){ res.send(user); });
});

app.get('/', function(req, res){
  User.fetchAll().then(function(data){ res.send(data); });
});

var server = app.listen(process.env.PORT, function(){
    console.log('listening on port %d', process.env.PORT);
});