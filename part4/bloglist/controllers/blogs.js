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

module.exports = blogsRouter
