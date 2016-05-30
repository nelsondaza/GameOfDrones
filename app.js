var express        = require("express"),
    app            = express(),
    bodyParser     = require("body-parser"),
    methodOverride = require("method-override"),

    sqlite3 = require('sqlite3').verbose(),
    db = new sqlite3.Database('./server/data/data.sqlite'),
    //db = new sqlite3.Database(':memory:'),

    DatabaseController = require('./server/controllers/DatabaseController'),
    PlayerController = require('./server/controllers/PlayerController');

DatabaseController.setDB( db );
PlayerController.setDB( db );

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(methodOverride());

var router = express.Router();

router.get('/', function (req, res) {
	res.send("Hello World!");
});


app.get('/players', PlayerController.index);
app.get('/players/create', PlayerController.create);
app.get('/players/:id', PlayerController.show);
app.get('/players/:id/edit', PlayerController.edit);
app.post('/players', PlayerController.store);
app.put('/players/:id', PlayerController.update);
app.delete('/players/:id', PlayerController.destroy);


app.use(router);

app.listen(3000, function () {
	console.log("Node server running on http://localhost:3000");
});