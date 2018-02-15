const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

const formatBlog = (blog) => {
  return {
    id: blog._id,
    title: blog.title,
    author: blog.author,
    url: blog.url,
    likes: blog.likes,
    user: blog.user
  }
}

blogsRouter.get('/', async (request, response) => {


  const blogs = await Blog
    .find({})
    .populate('user', { username: 1, name: 1 })

  response.json(blogs.map(formatBlog))
})

blogsRouter.get('/:id', async (request, response) => {
  try {
    const blog = await Blog.findById(request.params.id)
    const addedUser = await User.findById(blog.user)

    const token = request.token
    const decodedToken = jwt.verify(request.token, process.env.SECRET)

    const deletingUser = await User.findById(decodedToken.id)

    console.log(addedUser)
    console.log(deletingUser)

    if (blog) {
      response.json(formatBlog(blog))
    } else {
      response.status(404).end()
    }
  } catch (exception) {
    console.log(exception)
    response.status(400).send({ error: 'malformatted id' })
  }
})

blogsRouter.post('/', async (request, response) => {
  try {
    const body = request.body
    const token = request.token
    const decodedToken = jwt.verify(request.token, process.env.SECRET)

    if (!token || !decodedToken.id) {
      return response.status(401).json({ error: 'token missing or invalid' })
    }

    if (body.title === undefined || body.url === undefined) {
      return response.status(400).json({ error: 'content missing' })
    }

    if (body.likes === undefined) {
      body.likes = 0
    }

    const user = await User.findById(decodedToken.id)

    const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes,
      user: user._id
    })

    const savedBlog = await blog.save()

    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()

    response.json(formatBlog(savedBlog))
  } catch (exception) {
    if (exception.name === 'JsonWebTokenError') {
      response.status(401).json({ error: exception.message })
    } else {
      console.log(exception)
      response.status(500).json({ error: 'Blondit <3' })
    }
  }
})

blogsRouter.delete('/:id', async (request, response) => {
  try {
    
    const blog = await Blog.findById(request.params.id)
    const addedUser = await User.findById(blog.user)

    const token = request.token
    const decodedToken = jwt.verify(request.token, process.env.SECRET)

    if (!token || !decodedToken.id) {
      return response.status(401).json({ error: 'token missing or invalid' })
    }

    const deletingUser = await User.findById(decodedToken.id)
    console.log(addedUser)
    console.log(deletingUser)
    console.log(addedUser === deletingUser, 'tässä totuus')

    if (addedUser.toString() === deletingUser.toString()) {
      await Blog.findByIdAndRemove(request.params.id)
      response.status(204).end()
    } else {
      response.status(400).send({ error: 'You can only delete your own blogs' })
    }

  } catch (exception) {
    console.log(exception)
    response.status(400).send({ error: 'väärä id' })
  }
})

blogsRouter.put('/:id', async (request, response) => {

  try {
    const body = request.body

    const blog = {
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes
    }

    await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
    response.status(204).end()
  } catch (exception) {
    console.log(exception)
    response.status(400).send({ error: 'väärä id' })
  }
  console.log('toimiiko')
})

module.exports = blogsRouter