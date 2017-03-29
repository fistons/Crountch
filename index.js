import express from 'express';
import bodyParser from 'body-parser';
import fs from 'fs';

var file = "crountch.db";
var exists = fs.existsSync(file);
var urlencodedParser = bodyParser.urlencoded({ extended: false });
var uidEncoding = 'hex';

var sqlite3 = require("sqlite3").verbose();
var db = new sqlite3.Database(file);

db.serialize(() => {
	db.run("CREATE TABLE IF NOT EXISTS url (ID INTEGER PRIMARY KEY AUTOINCREMENT, URL TEXT NOT NULL)");
});

var app = express();
app.set('view engine', 'pug');

app.get('/', (req, res) => {
	res.render('index');
})

app.post('/', urlencodedParser, (req, res) => {
	var url = req.body.url;
	db.run('INSERT INTO url (URL) VALUES (?)', [url], (error, results) => {
		if (error) throw error;
		var encodedId = new Buffer(db.lastID, 'utf-8').toString(uidEncoding);
		res.render('posted', { title: 'Hey Hey Hey posted!', message: "http://localhost:3000/" + encodedId, lien: req.body.url });
	});
})

app.get('/:id', (req, res) => {
	var decodecId = new Buffer(req.params.id, uidEncoding).toString('utf-8');
	db.run('SELECT * from url WHERE ID = ?', [decodecId], (error, results) => {
		if (error) throw error;
		res.redirect(results[0].URL)
	});
});

app.get('/WTFIsThisShitAgain/:id', (req, res) => {
	var decodecId = new Buffer(req.params.id, uidEncoding).toString('utf-8');
	db.run('SELECT * from url WHERE ID = ?', [decodecId], (error, results) => {
		if (error) throw error;
		res.end(results[0].URL)
	});
});

app.listen(3000, () => console.log('Example app listening on port 3000!'));