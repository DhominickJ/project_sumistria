
const express = require('express')
const {connectDatabase, getDB} = require('./dbConnect')
const router = require('./router')
const path = require('path')

const app = express()

// Setting up the environment variables for the express client
app.set('views', 'client')
app.set('view engine', 'ejs')
app.use(express.static('client'))

// Linking the different dependencies 
app.use('pages', express.static(path.join(__dirname, 'client/pages')))

// Serving the different static files such as css, etc.
app.use(express.static(path.join(__dirname, 'client/assets')))
app.use(express.static(path.join(__dirname, '/node_modules')))

// Specifying the routing system of the application
app.use('/', router)

let database
let PORT = process.env.PORT || 3000

connectDatabase((err) => {
    if(!err){
        app.listen(PORT, () => {
            console.log(`App listening on port ${PORT}`)
        })

        // Fetch and update data on the different function
        database = getDB()
    }
    else {
        console.log(err)
    }
})

app.get('/', (req, res) => {
    res.render('index')
})

// app.get('/shop', (req, res) => {
//     res.render('/client/pages/shop')
// })

app.get('/movies', (req, res) => {

    let entries = []

    database.collection('movies')
        .find() // Finding certain values in the database
        .forEach(movie => entries.push(movie))
        // .toArray()
        .then(() => {
            res.status(200).json(entries)
        })
        .catch(() => {
            res.status(500).json({
                error: 'Failed to Fetch Documents'
            })
        })
})

// Creating a search queries for the application
app.post('/search', (req, res) => {
    const searchQuery = req.query.query;

    const regex = new RegExp(searchQuery, 'i');

    database.collection('movies')
        .find(
            {title: regex})
        .toArray()
        .then(results => {
            res.json(results)
            // console.log(results)
        })
        .catch(error => {
            console.error('Error:', error);
            res.status(500).json({error: 'Internal Server Error'})
        })
})





