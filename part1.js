// Express
const express = require('express')
const app = express()

// Landing page
app.get('/', function (req, res) {
    res.send("Hello world!")
})

app.listen(3000, () => console.log('Listening!'))