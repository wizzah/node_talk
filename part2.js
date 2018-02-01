// Express
const express = require('express')
const app = express()

// Landing page
app.get('/', function (req, res) {
    res.send("Landing page")
})

// We'll do processing here
app.post('/api/url', function (req, res) {

})

// The redirection, moving the user to the longer version of the URL
app.get('/:urlId', function (req, res) {

})

app.listen(3000, () => console.log('Listening!'))