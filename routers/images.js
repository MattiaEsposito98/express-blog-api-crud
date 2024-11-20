const express = require('express')
const router = express.Router()
const posts = require('../data/posts')


//index 
router.get('/', (req, res) => {
  const title = posts.map(post => post.title);
  console.log(`Elenco dolci: ${title}`)
  //  res.json({ posts })
  let filteredPosts = posts
  const tag = req.query.tag

  if (tag) {
    filteredPosts = posts.filter((post) => {
      return post.tags.includes(tag)
    })

  }

  res.json({ filteredPosts })
})

//show
router.get('/:identifier', (req, res) => {
  let identifier = req.params.identifier
  console.log(`Parametro dinamico: ${identifier}`)
  let post = posts

  if (!isNaN(identifier)) {
    identifier = parseInt(identifier); // Converto in numero
    post = posts.find(post => post.id === identifier); // Cerco per ID
  } else {
    post = posts.find(post => post.slug === identifier); // Cerco per slug
  }

  // Risposta se il post è stato trovato
  if (post) {
    return res.json({
      Dolce: post
    });
  }

  // Dolce non trovato
  console.log('Dolce non trovato');
  return res.status(404).json({
    error: 'Dolce non trovato',
    message: 'Il dolce richiesto non è presente nel database.'
  });
})



//Store
router.post('/', (req, res) => {
  console.log(`Creo dolce:`)
  res.send('Creo un nuovo dolce')
})



// Update
router.put('/:slug', (req, res) => {
  const slug = req.params.slug
  console.log(`Aggiorno dolce: ${slug}`)
  res.send(`Aggiorno il dolce: ${slug}`)
})



// modify
router.patch('/:slug', (req, res) => {
  const slug = req.params.slug
  console.log(`Modifico dolce: ${slug}`)
  res.send(`Modifico il dolce: ${slug}`)
})



// destroy
router.delete('/:slug', (req, res) => {
  const slug = req.params.slug
  console.log(`Elimino dolce: ${slug}`)
  res.send(`Elimino il dolce: ${slug}`)
})

module.exports = router