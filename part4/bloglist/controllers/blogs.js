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
  const blog = new Blog(submittedBlog)

  const result = await blog.save()
  response.status(201).json(result)
})

module.exports = blogsRouter
