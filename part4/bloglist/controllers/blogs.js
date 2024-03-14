const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
  const submittedBlog = request.body
  if (!('likes' in submittedBlog)) {
    submittedBlog.likes = 0
  }
  if (!('url' in submittedBlog)) {
    return response.status(400).json({ error: 'URL is required' })
  }
  if (!('title' in submittedBlog)) {
    return response.status(400).json({ error: 'title is required' })
  }
  const blog = new Blog(submittedBlog)

  const result = await blog.save()
  response.status(201).json(result)
})

blogsRouter.delete('/:id', async (request, response, next) => {
  try {
    await Blog.findByIdAndDelete(request.params.id)
    response.status(204).end()
  } catch (exception) {
    next(exception)
  }
})

blogsRouter.put('/:id', async (request, response) => {
  try {
    const updatedBlog = request.body
    const blog = await Blog.findByIdAndUpdate(request.params.id, updatedBlog, {
      new: true,
    })
    if (!blog) {
      return response.status(404).json({ error: 'Blog not found' })
    }
    response.json(blog)
  } catch (error) {
    response.status(500).json({ error: error.message })
  }
})

module.exports = blogsRouter
