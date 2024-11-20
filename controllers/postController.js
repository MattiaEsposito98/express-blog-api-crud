const posts = require ('../data/posts')



//index 
function index (req,res) {
    const title = posts.map(post => post.title);
    console.log(title)

    let filterPosts = posts
    if (req.query.tag) {
      filterPosts = posts.filter ((post)=> {
        return post.tags.includes(req.query.tag.toLoerCase())
      })

    }

    res.json({ filterPosts })

}





//show
router.get('/:identifier', (req, res) => {
  let identifier = req.params.identifier

  if (!isNaN(identifier)) {
    identifier = parseInt(identifier)
    const post = posts.find((post) => post.id === identifier)
    res.json({
      Dolce: post
    });
  }
  else {
    const post = posts.find((post) => post.slug === identifier)
    res.json({
      Dolce: post
    });
  }

  console.log(`Parametro dinamico: ${identifier}`)

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