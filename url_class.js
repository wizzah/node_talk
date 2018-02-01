module.exports = class Url {

    constructor(url, db, shortenedUrl) {
        this.url = url
        this.db = db
        this.shortenedUrl = shortenedUrl
    }

    // Get shortened url from the DB
    get_shortened_url() {
        return this.db.collection("shortener").find({ url: this.url })
    }

    // Get URL from the DB
    get_url(callback) {
        const collection = this.db.collection("shortener")
        collection
            .findOne({ shortenedUrl: this.shortenedUrl }, (err, item) => {
                if (err) { return }

                if (item) {
                    callback([item])
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
                    callback([item])
                } else {
                    let random_string = Math.random().toString(36).substr(2,5)
                    // otherwise create a new one
                    const newDoc = {
                        url: this.url,
                        shortenedUrl: "r/" + random_string
                    } 
                    collection.insert(newDoc)
                    callback([newDoc])
                }
            })
    }

    // Generate random numbers and letters
    generate_rand_chars() {
        return Math.random().toString(36).subst(2,5)
    }
}