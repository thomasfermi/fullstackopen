const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)
const User = require('../models/user')

describe('User creation', () => {
  beforeEach(async () => {
    await User.deleteMany({})
  })

  test('works with good input', async () => {
    const newUser = {
      username: 'testuser',
      name: 'Test User',
      password: 'password123',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const usersInDb = await User.find({})
    expect(usersInDb).toHaveLength(1)
  })

  test('returns error when username is missing', async () => {
    const newUser = {
      name: 'Test User',
      password: 'password123',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    const usersInDb = await User.find({})
    expect(usersInDb).toHaveLength(0)
  })

  test('returns error when username too short', async () => {
    const newUser = {
      username: 'us',
      name: 'Test User',
      password: 'password123',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    const usersInDb = await User.find({})
    expect(usersInDb).toHaveLength(0)
  })

  test('returns error when password is missing', async () => {
    const newUser = {
      username: 'testuser',
      name: 'Test User',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    const usersInDb = await User.find({})
    expect(usersInDb).toHaveLength(0)
  })

  test('returns error when password too short', async () => {
    const newUser = {
      username: 'testuser',
      name: 'Test User',
      password: 'pw',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    const usersInDb = await User.find({})
    expect(usersInDb).toHaveLength(0)
  })
})

afterAll(async () => {
  await mongoose.connection.close()
}, 10000)
