const express = require('express')
const app = express()
const url = require('./url_class')
const MongoClient = require('mongodb').MongoClient;
const bodyParser = require('body-parser')

app.use(bodyParser.json());

let dbo

// Occurs when we re-run the server
MongoClient.connect('mongodb://localhost:27017/', function(err, db) {
    dbo = db.db("mydb")
    app.listen(3000, () => console.log('Listening!'))
})

// Landing page
app.get('/', function (req, res) {
      res.sendFile(__dirname+'/index.html');
})

// We'll do processing here
app.post('/api/url', function (req, res) {

    let newUrl = new url(req.body.url, dbo)

    newUrl.get_or_create((results) => {
        res.send(results);
    });
})

// The redirection, moving the user to the 
// longer version of the URL
app.get('/r/:urlId', function (req, res) {

    let checkUrl = new url(undefined, dbo, "r/" + req.params.urlId)

    checkUrl.get_url((results) => {
        if(results) {
            res.redirect(results.url)
        } else {
            // Redirect to the landing page
            res.redirect('/')
        }
    })
})