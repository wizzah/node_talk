module.exports = class Url {

    constructor(url, db, shortenedUrl) {
        this.url = url
        this.db = db
        this.shortenedUrl = shortenedUrl
    }

    // Get URL from the DB
    get_url(callback) {
        const collection = this.db.collection("shortener")
        collection
            .findOne({ shortenedUrl: this.shortenedUrl }, (err, item) => {
                if (err) { return }

                if (item) {
                    callback(item)
                } else {
                    callback()
                }
            })
    }

    // Get or create URL
    get_or_create(callback) {
        const collection = this.db.collection("shortener")

        collection
            .findOne({ url: this.url }, (err, item) => {
                if (err) { return }

                // if we have an item, send that back
                if (item) {
                    callback(item)
                } else {
                    let random_string = Math.random().toString(36).substr(2,5)
                    // otherwise create a new one
                    const newDoc = {
                        url: this.url,
                        shortenedUrl: "r/" + random_string
                    } 
                    collection.insert(newDoc)
                    callback(newDoc)
                }
            })
    }
}