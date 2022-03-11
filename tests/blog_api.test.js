const mongoose = require('mongoose')
const supertest = require('supertest')
const Blog = require('../models/blog')
const User = require('../models/user')
const app = require('../app')
const helper = require('./test_helper')
const user = require('../models/user')
const api = supertest(app)

beforeEach(async () => {
  await Blog.deleteMany()
  await Blog.insertMany(helper.initialBlogs)
})

describe('when there is initial some blogs save', () => {
  test('return all blogs as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('a specific blog id must be defined', async () => {
    const blogsToStart = await helper.blogsInDB()
    const blogToView = blogsToStart[0]

    expect(blogToView.id).toBeDefined()
  })
})

describe('adding a new note', () => {
  test('a valid blog can be added', async () => {
    const newBlog = {
      title: 'testing',
      author: 'facebook',
      url: 'www.jest.com',
      likes: 8
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDB()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

    const titles = blogsAtEnd.map(b => b.title)
    expect(titles).toContain('testing')
  })

  test('a blog withor title,url is not added', async () => {
    const newBlog = {
      author: 'some',
      likes: 8
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)

    const blogsAtEnd = await helper.blogsInDB()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
  })
})

describe('a specific blog for view', () => {
  test('viewing a specific blog', async () => {
    const blogsToStart = await helper.blogsInDB()

    const blogToView = blogsToStart[0]

    const resultBlog = await api
      .get(`/api/blogs/${blogToView.id}`)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const processedNoteToView = JSON.parse(JSON.stringify(blogToView))
    expect(resultBlog.body).toEqual(processedNoteToView)
  })
})

describe('deleting a specific view', () => {
  test('successfully delete an blog', async () => {
    const blogsToStart = await helper.blogsInDB()

    const blogToDelete = blogsToStart[0]

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .expect(204)

    const blogsAtEnd = await helper.blogsInDB()

    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length - 1)
  })
})

describe('when inital users', () => {
  beforeEach(async () => {
    await User.deleteMany()
    await user.insertMany(helper.initialUsers)
  })

  test('create a user', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'test',
      name: 'Testing',
      password: 'Haha123'
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()

    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

    const usernames = usersAtEnd.map(u => u.username)
    expect(usernames).toContain('test')

  })
})

// describe('when inital get users', () => {
//   beforeEach(async () => {
//     await User.deleteMany({})
//     await User.insertMany()
//   })
// })

afterAll(() => {
  mongoose.connection.close()
})



