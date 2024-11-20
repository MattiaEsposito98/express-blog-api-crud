const posts = require ('../data/posts')


//index 
function index (req, res) {
  const title = posts.map((post) => post.title)
  console.log(`Elenco dolci: ${title}`)
  let filteredPosts = posts
  const tag = req.query.tag

  if (tag) {
    filteredPosts = posts.filter((post) => {
      return post.tags.includes(tag)
    })

  }

  res.json({ filteredPosts })
  const tagPost = filteredPosts.map((tag) => tag.title)
  console.log (`Dolci con tag ${tag}: ${tagPost}`)
}


//show
function show (req, res) {
  let identifier = req.params.identifier
  console.log(`Parametro dinamico: ${identifier}`)
  let post = posts

  if (!isNaN(identifier)) {
    identifier = parseInt(identifier); // Converto in numero
    post = posts.find((post) => post.id === identifier); // Cerco per ID
  } else {
    post = posts.find((post) => post.slug === identifier); // Cerco per slug
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
}


//Store
function store (req, res) {
  console.log(`Creo dolce:`)
  res.send('Creo un nuovo dolce')
}



// Update
function update(req, res) {
  const slug = req.params.slug
  console.log(`Aggiorno dolce: ${slug}`)
  res.send(`Aggiorno il dolce: ${slug}`)
}



// modify
function modify (req, res) {
  const slug = req.params.slug
  console.log(`Modifico dolce: ${slug}`)
  res.send(`Modifico il dolce: ${slug}`)
}



// destroy
function destroy (req, res) {
  let identifier = req.params.identifier
  console.log(`Elimino dolce: ${identifier}`)
  let post = posts

  if (!isNaN(identifier)) {
    identifier = parseInt(identifier); // Converto in numero
    postIndex = posts.findIndex((post) => post.id === identifier); // Cerco per ID
  } else {
    postIndex = posts.findIndex((post) => post.slug === identifier); // Cerco per slug
  }

  // Risposta 
  if (postIndex === -1) {
		res.status(404)

		return res.json({
			error: 'Post not found',
			message: 'Post non trovato.',
		})
	}

  posts.splice(postIndex, 1)

	res.sendStatus(204)
  console.log (`${identifier} eliminato`)
  const remainingSweet = posts.map((post) => post.title);
  console.log(`Elenco dolci rimasti: ${remainingSweet}`)
}

module.exports = { index, show, store, update, modify, destroy }
