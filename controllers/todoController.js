var bodyParser = require('body-parser');

var data = [{item: 'get milk'}, {item: 'walk dog'}, {item: 'make a saree'}];
var urlencodedParser = bodyParser.urlencoded({extended: false});

module.exports = function(app) {
  app.get('/todo', function(req, res) {
    res.render('todo', {todos: data});
  });
  
  app.post('/todo', urlencodedParser, function(req, res) {
    data.push(req.body);
    res.json(data);
  });

  // IMPORTANT - use '/todo/:item' instead of /todo
  app.delete('/todo/:item', function(req, res) {
    data = data.filter(function(todo){
      return todo.item.replace(/ /g, "-") !== req.params.item;
    });
    res.json(data);
  })
};