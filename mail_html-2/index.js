
const { generateHTML } = require("./emailHtml.js")
const express = require('express')
let app = express()

app.use(express.json())

let port = 8000

app.get("/", (req, res) => {
    // bitcoin_to_euro bitcoin_to_euro_commission
    let html = generateHTML("test", 100, 0.52, "asdasdasd", "test123", "test12", "test", "bitcoin_to_euro", "bitcoin_to_euro_commission", "https://amecacoin.com")

    html.then((value) => {
        res.send(value)
    })
})


app.listen(port, function () {
    console.log(`CORS-enabled web server listening on port ${port}`)
})

