import express from 'express';
import bodyParser from 'body-parser';
import sqlite3 from 'sqlite3';

let file = "crountch.db";
let urlencodedParser = bodyParser.urlencoded({ extended: false });
let uidEncoding = 'hex';
let db = new sqlite3.Database(file);
let port = 3000;

let app = express();
app.set('view engine', 'pug');

app.get('/', (req, res) => {
	res.render('index');
})

// TODO Check if this a real url
app.post('/', urlencodedParser, (req, res) => {
	let postedUrl = req.body.url;
	db.run('INSERT INTO url VALUES (NULL, ?)', [postedUrl], function (error) {
		if (error) throw error;
		let encodedId = new Buffer(this.lastID.toString(), 'utf-8').toString(uidEncoding);
		res.render('posted', { url: "http://localhost:3000/" + encodedId, lien: req.body.url });		
	});
})

// TODO Check if id exist
app.get('/:id', (req, res) => {
	let decodedId = new Buffer(req.params.id, uidEncoding).toString('utf-8');
	db.get('SELECT * from url WHERE ID = ?', [decodedId], (error, results) => {
		if (error) throw error;
		res.redirect(results.URL)
	});
});

// TODO Check if id exist
app.get('/WTFIsThisShitAgain/:id', (req, res) => {
	let decodecId = new Buffer(req.params.id, uidEncoding).toString('utf-8');
	db.get('SELECT * from url WHERE ID = ?', [decodecId], (error, results) => {
		if (error) throw error;
		res.end(results.URL)
	});
});

db.serialize(() => 	db.run("CREATE TABLE IF NOT EXISTS url (ID INTEGER PRIMARY KEY, URL TEXT NOT NULL)"));
app.listen(port, () => console.log('Crountch listening on port ' + port));