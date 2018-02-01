module.exports = class Url {

    constructor(url, db, shortenedUrl) {
        this.url = url;
        this.db = db;
        this.shortenedUrl = shortenedUrl
    }

    // Get shortened url from the DB
    get_shortened_url() {
        return this.db.collection("shortener").find({ url: this.url })
    }

    // Get URL from the DB
    get_url() {
        // return this.db.collection("shortener").find({ shortenedUrl: this.shortenedUrl })
        this.db.collection("shortener").find({ shortenedUrl: this.shortenedUrl }).toArray(function(err, result) {
            console.log("result from get_url", result)
            return result
        })
    }

    // Get or create URL
    get_or_create_url() {
        // If the URL doesn't exist
        if(this.get_shortened_url().length < 1) {
            // Generate a new url, add to db
            let newDoc = { url: this.url, shortenedUrl: "exmpl" }
            this.db.collection("shortener").insertOne(newDoc, function(err, res) {
                console.log("inserted", res)
            })
        }
        return this.get_shortened_url()
    }

    // Create new shortened url
    create_shortened_url() {
        let newDoc = { url: this.url, shortenedUrl: "exmpl" }
        this.db.collection("shortener").insertOne(newDoc, function(err, res) {
            console.log("inserted", res.ops[0].shortenedUrl)
            return res.ops[0].shortenedUrl
        })
    }
}