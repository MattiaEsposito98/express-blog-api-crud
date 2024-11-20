const express = require ('express')
const router = express.Router()
const posts = require ('../posts')

//index 
router.get ('/', (req,res) => {
  const title = posts.map(post => post.title);
  console.log (title)
  res.json ({posts})
})

//show
router.get ('/:slug', (req,res) => {
  const slug = req.params.slug
  const post = posts.find((dolce) => dolce.slug === slug)
  console.log (`Nome dolce: ${slug}`)
  res.json ({
    Dolce: post
  })
}) 

//Store
router.post ('/', (req,res) => {
  console.log (`Creo dolce:`)
  res.send ('Creo un nuovo dolce')
})

// Update
router.put('/:slug', (req, res) => {
	const slug = req.params.slug
  console.log (`Aggiorno dolce: ${slug}`)
	res.send(`Aggiorno il dolce: ${slug}`)
})

// modify
router.patch('/:slug', (req, res) => {
	const slug = req.params.slug
  console.log (`Modifico dolce: ${slug}`)
	res.send(`Modifico il dolce: ${slug}`)
})

// destroy
router.delete('/:slug', (req, res) => {
	const slug = req.params.slug
  console.log (`Elimino dolce: ${slug}`)
	res.send(`Elimino il dolce: ${slug}`)
})

module.exports = router