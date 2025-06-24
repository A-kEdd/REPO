const express = require("express")
const fs = require("fs")
const path = require("path")
const app = express()

const PORT = process.env.PORT || 3000

app.use(express.json())

const commentsFile = path.join(__dirname, "comments.json")

app.get("/", (req, res) => {
    res.send("Hello World!")
})

app.get("/comments", (req, res) => {
    fs.readFile(commentsFile, "utf8", (err, data) => {
        if (err) {
            // If file doesn't exist, return empty array
            return res.json([])
        }
        res.json(JSON.parse(data))
    })
})

app.post("/comments", (req, res) => {
    const message = req.body.message
    if (!message) {
        return res.status(400).json({ error: "Message is required" })
    }
    fs.readFile(commentsFile, "utf8", (err, data) => {
        let comments = []
        if (!err) {
            comments = JSON.parse(data)
        }
        comments.push({ message: message })
        fs.writeFile(commentsFile, JSON.stringify(comments), (err) => {
            if (err) {
                return res.status(500).json({ error: "Could not save comment" })
            }
            res.status(201).json({ message: "Comment added" })
        })
    })
})

app.listen(PORT, () => {
    console.log("Server running on port " + PORT)
})
