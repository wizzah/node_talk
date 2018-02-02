const express = require('express')
const app = express()
const url = require('./url_class')
const MongoClient = require('mongodb').MongoClient

let dbo

// Occurs when we re-run the server
MongoClient.connect('mongodb://localhost:27017/', function(err, db) {
    dbo = db.db("mydb")
    let newDoc = { url: "https://www.google.com", shortenedUrl: "exmpl" }

    // make sure that it inserts the document into the collection
    dbo.collection("shortener").insertOne(newDoc)
    dbo.collection("shortener").find({ url: "https://www.google.com" }).toArray(function(err, result) {
        if(err) throw err
        console.log(result)
    })

    app.listen(3000, () => console.log('Listening!'))
})

// Landing page
app.get('/', function (req, res) {
    res.send("Landing page")
})

// We'll do processing here
app.post('/api/url', function (req, res) {

})

// The redirection, moving the user to the 
// longer version of the URL
app.get('/r/:urlId', function (req, res) {

})