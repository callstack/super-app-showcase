const express = require('express')

const host = require('./data/host.json')
const booking = require('./data/booking.json')
const shopping = require('./data/shopping.json')
const dashboard = require('./data/dashboard.json')

const app = express()
const port = 3000

app.get('/host', (req, res) => {
    const platform = req.query.platform
    const appVersion = req.query.appVersion

    res.send(host[platform][appVersion])
})
app.get('/booking', (req, res) => {
    const platform = req.query.platform
    const appVersion = req.query.appVersion

    res.send(booking[platform][appVersion])
})
app.get('/shopping', (req, res) => {
    const platform = req.query.platform
    const appVersion = req.query.appVersion

    res.send(shopping[platform][appVersion])
})
app.get('/dashboard', (req, res) => {
    const platform = req.query.platform
    const appVersion = req.query.appVersion

    res.send(dashboard[platform][appVersion])
})

app.listen(port, () => {
    console.log(`[CatalogServer] Server listening at port ${port} `)
})