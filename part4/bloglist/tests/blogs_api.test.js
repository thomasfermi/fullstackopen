const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

const Blog = require('../models/blog')

const initialBlogs = [
  {
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
  },
  {
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
  },
]

beforeEach(async () => {
  await Blog.deleteMany({})
  let BlogObject = new Blog(initialBlogs[0])
  await BlogObject.save()
  BlogObject = new Blog(initialBlogs[1])
  await BlogObject.save()
})

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
}, 100000)

test('blogs have an id field', async () => {
  const response = await api.get('/api/blogs')
  response.body.map((blog) => expect(blog.id).toBeDefined())
}, 100000)

test('all blogs are returned', async () => {
  const response = await api.get('/api/blogs')

  expect(response.body).toHaveLength(initialBlogs.length)
}, 100000)

test('adding a blog works', async () => {
  // add blog
  const newBlog = {
    title: 'Cheese is tasty',
    author: 'Mickey Mouse',
    url: 'https://cheese.com/',
    likes: 77,
  }
  await api.post('/api/blogs').send(newBlog)

  // get blogs and check if we get one more
  const response = await api.get('/api/blogs')
  expect(response.body).toHaveLength(initialBlogs.length + 1)
}, 100000)

test('omitting likes works', async () => {
  // add blog
  const newBlog = {
    title: 'Cheese is tasty',
    author: 'Mickey Mouse',
    url: 'https://cheese.com/',
  }
  await api.post('/api/blogs').send(newBlog)

  // get blogs and check if we get one more
  const response = await api.get('/api/blogs')
  expect(response.body[2].likes).toEqual(0)
}, 100000)

afterAll(async () => {
  await mongoose.connection.close()
}, 100000)
