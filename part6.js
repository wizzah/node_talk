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
    let newUrl = new url(req.body.url, dbo, undefined)
    // newUrl.get_or_create_url().toArray((err, results) => {
    //     console.log(results)
    //     res.send(results)
    // })
    let response

    // Check if it's already in the db
    // newUrl.get_url().toArray((err, results) => {
    //     if(results.length > 0) {
    //         response = results
    //     }
    // })
    response = newUrl.get_url()

    // Otherwise, add it
    if(!response) {
        newUrl.create_shortened_url().toArray((err, results) => {
            console.log(results, "adding")
            // response = results
        })
        console.log("not response")
        // newUrl.create_shortened_url()
        console.log("after create create_shortened_url")
        newUrl.get_url().toArray((err, results) => {
            console.log(results)
            response = results
        })
    }
    res.send(response)
})

// The redirection, moving the user to the 
// longer version of the URL
app.get('/:urlId', function (req, res) {

    let checkUrl = new url(undefined, dbo, req.params.urlId)
    let results = checkUrl.get_url()
    if(results) {
        res.redirect(results[0].url)
    } else {
        // Redirect to the landing page
        res.redirect('/')
    }
})