import express from 'express';
import mysql from 'mysql';
import bodyParser from 'body-parser';

var urlencodedParser = bodyParser.urlencoded({ extended: false });
var uidEncoding = 'hex';
var app = express();
app.set('view engine', 'pug');

var connection = mysql.createConnection({host: 'localhost', user: 'root',password: 'root', database: 'test_node'});

app.get('/', (req, res) => {
	res.render('index');
})

app.post('/', urlencodedParser, (req, res) => {
	var url = req.body.url;
	connection.query('INSERT INTO node_url SET URL = ?', [url], function (error, results, fields) {
  		if (error) throw error;
  		var encodedId = new Buffer(results.insertId.toString(), 'utf-8').toString(uidEncoding);
  		res.render('posted', { title: 'Hey Hey Hey posted!', message: "http://localhost:3000/" + encodedId, lien: req.body.url});
	});
})

app.get('/:id', (req, res) => {
  var decodecId = new Buffer(req.params.id, uidEncoding).toString('utf-8');
  connection.query('SELECT * from node_url WHERE ID = ?', [decodecId], (error, results, fields) => {
	 if (error) throw error; 
	 res.redirect(results[0].URL)
	});
});

pp.get('/WTFIsThisShitAgain/:id', (req, res) => {
  var decodecId = new Buffer(req.params.id, uidEncoding).toString('utf-8');
  connection.query('SELECT * from node_url WHERE ID = ?', [decodecId], (error, results, fields) => {
	 if (error) throw error; 
	 res.end(results[0].URL)
	});
});

app.listen(3000, () => console.log('Example app listening on port 3000!'));