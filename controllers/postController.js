const posts = require('../data/posts')
let lastIndex = posts.at(-1).id


//index 
function index(req, res) {
  const title = posts.map((post) => post.title)
  console.log(`Elenco dolci: ${title}`)

  let filteredPosts = posts
  const tag = req.query.tags

  if (tag) {
    filteredPosts = posts.filter((post) => {
      return post.tags.includes(tag)
    })

  }

  res.json({
    results: filteredPosts
  })
  const tagPost = filteredPosts.map((tag) => tag.title)
  console.log(`Dolci con tag ${tag}: ${tagPost}`)
}


//show
function show(req, res) {
  let identifier = req.params.identifier
  console.log(`Parametro dinamico: ${identifier}`)
  //Funzione per convertire identifier
  const post = converter(identifier,posts)

  if (post) {
    return res.json(post)
  }
else {
  console.log('Dolce non trovato');
  return res.status(404).json({
    error: 'Dolce non trovato',
    message: 'Il dolce richiesto non è presente nel database.'
  });
}
}
  // Dolce non trovato
  


//Store
function store(req, res) {
  console.log(req.body)
  const { title, slug, content, image, tags } = req.body
  const errors = validate(req)


  if (errors.length) {
    res.status(400)

    return res.json({
      error: 'Invalid request',
      messages: errors,
    })
  }
  lastIndex++

  const post = {
    id: lastIndex,
    title,
    slug,
    content,
    image,
    tags
  }

  posts.push(post)

  res.status(201).send(post)
}



// Update
function update(req, res) {
  let identifier = req.params.identifier
  console.log(`Parametro dinamico per modifica: ${identifier}`)
  //Funzione per convertire identifier
  const post = converter(identifier,posts)

  // Risposta se il post non è stato trovato
  if (!post) {
    res.status(404)

    // Dolce non trovato
    console.log('Dolce non trovato');
    return res.status(404).json({
      error: 'Dolce non trovato',
      message: 'Il dolce richiesto non è presente nel database.'
    })
  }

  const errors = validate(req)

  if (errors.length) {
    res.status(400)

    return res.json({
      error: 'Invalid request',
      messages: errors,
    })
  }
  console.log(`Aggiorno dolce: ${identifier}`)


  const { title, slug, content, image, tags } = req.body
  post.title = title
  post.slug = slug
  post.content = content
  post.image = image
  post.tags = tags


  res.json(post)
}



// modify
function modify(req, res) {
  const slug = req.params.slug
  console.log(`Modifico dolce: ${slug}`)
  res.send(`Modifico il dolce: ${slug}`)
}



// destroy
function destroy(req, res) {
  let identifier = req.params.identifier
  console.log(`Elimino dolce: ${identifier}`)
//Funzione per convertire identifier
const postIndex = converterForDestroy(identifier,posts)

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
  console.log(`${identifier} eliminato`)
  const remainingSweet = posts.map((post) => post.title)
  console.log(`Elenco dolci rimasti: ${remainingSweet}`)
}

module.exports = { index, show, store, update, modify, destroy }



function validate(req) {
  const { title, slug, content, image, tags } = req.body

  // VALIDAZIONE DEI DATI
  const errors = []

  if (!title) {
    errors.push('Title is required')
  }

   if (!slug) {
  	errors.push('Slug is required')
  }

  if (!content) {
  	errors.push('Content is required')
  }

  if (!image) {
  	errors.push('Image is required')
  }

  if (!tags) {
  	errors.push('Tags is required')
  }

  return errors
}


//Funzione per covertire identifier
function converter(identifier, arrayMain) {
  if (!isNaN(identifier)) {
    identifier = parseInt(identifier)
    return arrayMain.find((el) => el.id === identifier)  //Cerco per ID
  } else {
    return arrayMain.find((el) => el.slug === identifier) //Cerco per slug
  }
}


function converterForDestroy(identifier, arrayMain) {
  if (!isNaN(identifier)) {
    identifier = parseInt(identifier)
    return arrayMain.findIndex((el) => el.id === identifier)  //Cerco per ID
  } else {
    return arrayMain.findIndex((el) => el.slug === identifier) //Cerco per slug
  }
}