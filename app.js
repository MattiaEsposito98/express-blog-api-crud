console.log("Blog")
const express = require('express')
const app = express()
const port = 3000
const posts = require('./posts')
const imagesRouter = require ('./routers/images')


app.use(express.static('pubblic'))


app.get('/', (req, res) => {
  res.send('Server del mio blog')
})

//importo Router tramite funzione use
app.use ("/images", imagesRouter)

app.get('/bacheca', (req, res) => {
  res.json({
    count: posts.length,
    posts: posts
  })
})


app.listen(port, () => {
  console.log(`Porta in ascolto ${port}`)
})
