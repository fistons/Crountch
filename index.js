import express from 'express';
import bodyParser from 'body-parser';
import sqlite3 from 'sqlite3';

const urlencodedParser = bodyParser.urlencoded({ extended: false });
const uidEncoding = 'hex';
const db = new sqlite3.Database("crountch.db");
const port = 3000;
const getRequest = "SELECT * from url WHERE ID = ?";
const insertRequest = "INSERT INTO url VALUES (NULL, ?)";
const regex = new RegExp("^(http[s]?:\\/\\/(www\\.)?|ftp:\\/\\/(www\\.)?|www\\.){1}([0-9A-Za-z-\\.@:%_\+~#=]+)+((\\.[a-zA-Z]{2,3})+)(/(.)*)?(\\?(.)*)?");

const app = express();
app.set('view engine', 'pug');
app.use(express.static('public'));

app.get('/', (req, res) => {
	res.render('index');
})

app.post('/', urlencodedParser, (req, res) => {
	let postedUrl = req.body.url;
	if (!regex.test(postedUrl)) {
		res.end('Check your privileges! (and your URL)');
		return;
	}
	db.run(insertRequest, [postedUrl], function (error) {
		if (error) throw error;
		let encodedId = new Buffer(this.lastID.toString(), 'utf-8').toString(uidEncoding);
		console.log("Url posted: " + postedUrl + " - Id created: " + encodedId);	
		res.render('posted', { url: req.protocol + '://' + req.get('host') + "/" + encodedId, lien: req.body.url });
	});
})

app.get('/:id', (req, res) => {
	let decodedId = new Buffer(req.params.id, uidEncoding).toString('utf-8');
	db.get(getRequest, [decodedId], (error, results) => {
		if (error) throw error;
		if (!results) {
			res.end("Unknown.");
		} else {
			res.redirect(results.URL);
		}
	});
});

app.get('/q/:id', (req, res) => {
	let decodecId = new Buffer(req.params.id, uidEncoding).toString('utf-8');
	db.get(getRequest, [decodecId], (error, results) => {
		if (error) throw error;
		if (!results) {
			res.end("Unknown.");
		} else {
			res.end(results.URL);
		}
	});
});

db.serialize(() => db.run("CREATE TABLE IF NOT EXISTS url (ID INTEGER PRIMARY KEY, URL TEXT NOT NULL)"));
app.listen(port, () => console.log('Crountch listening on port ' + port));