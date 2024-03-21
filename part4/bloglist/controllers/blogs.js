const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const log = require('../utils/logger')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', {
    username: 1,
    name: 1,
    id: 1,
  })
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
  const user = (await User.find({}))[0]
  submittedBlog.user = user._id
  log.info('submittedBlog:')
  log.info(submittedBlog)
  const blog = new Blog(submittedBlog)
  const savedBlog = await blog.save()

  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  response.status(201).json(savedBlog)
})

blogsRouter.delete('/:id', async (request, response) => {
  const deletedBlog = await Blog.findByIdAndDelete(request.params.id)
  if (!deletedBlog) {
    // If no document was found for deletion, return 404
    return response.status(404).json({ error: 'Blog not found' })
  }
  response.status(204).end()
})

blogsRouter.put('/:id', async (request, response) => {
  const updatedBlog = request.body
  const blog = await Blog.findByIdAndUpdate(request.params.id, updatedBlog, {
    new: true,
  })
  if (!blog) {
    return response.status(404).json({ error: 'Blog not found' })
  }
  response.json(blog)
})

module.exports = blogsRouter
