const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const logger = require('../utils/logger')
require('express-async-errors')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})

  response.json(blogs)

})

blogsRouter.post('/', async (request, response, next) => {
  const body = request.body

  if (!body.title || !body.url) {
    return response.status(400).json({ error: "title or url is missing"})
  }

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes
  })

  const savedBlog = await blog.save()
  
  response.status(201).json(savedBlog)

})

blogsRouter.delete('/:id', async (request, response) => {
  await Blog.findByIdAndRemove(request.params.id)
  response.status(204).end()
})

blogsRouter.put('/:id', async (request, response, next) => {
  const body = request.body

  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes
  }

  const updatedNote = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
  response.json(updatedNote)
})

module.exports = blogsRouter