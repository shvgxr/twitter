const express = require('express')
const app = express()
const bodyParser = require('body-parser') //middleware to clean up req
const MongoClient = require('mongodb').MongoClient //connect to mongodb
const connectionString = 'mongodb+srv://twitter123:twitter123@twitter0.gze4vvo.mongodb.net/?retryWrites=true&w=majority'

//tidy up the req before we use, urlencoded tells bodyparser to extract data from form and add to body
//reach the db
MongoClient.connect(connectionString, { useUnifiedTopology: true})
    .then(client => {
        console.log('Connected to Database')
        const db = client.db('twitter')
        const tweetsCollection = db.collection('tweets')

        //MIDDLEWARE
        app.set('view engine', 'ejs')
        app.use(bodyParser.urlencoded({extended: true}))
        app.use(bodyParser.json())
        app.use(express.static('public'))

        //ROUTES
        app.get('/', (req,res) => {
            db.collection('tweets').find().toArray()
                .then(results => {
                    res.render('index.ejs', { tweets: results})
                })
                .catch(error => console.error(error))
        })
        app.post('/tweets', (req,res) => {
            tweetsCollection.insertOne({username: req.body.username, tweet: req.body.tweet, likes: 0})
                .then(result => {
                    res.redirect('/')
                })
                .catch(error => console.error(error))
        })
        app.put('/addOneLike', (req,res) => {
            db.collection('tweets').updateOne({username: req.body.usernameS,tweet: req.body.tweetS, likes: req.body.likesS},{
                $set: {
                    likes: req.body.likesS+1
                }
            })
        .then(result => {
            console.log('Added One Like')
            res.json('Like Added')
        })
        .catch(error => console.error(error))
        })
        app.delete('/deleteTweet', (req,res) => {
            db.collection('tweets').deleteOne({username: req.body.usernameS,tweet: req.body.tweetS})
            .then(result => {
                console.log('Tweet Deleted')
                res.json('Tweet Deleted')
            })
            .catch(error => console.error(error))
        })
        app.listen(process.env.PORT, () => console.log(`listening on ${PORT}`))
    })
    .catch(error => console.error(error))