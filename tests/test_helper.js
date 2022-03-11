const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlogs = [
  {
    title: 'javascript',
    author: 'mpj',
    url: 'www.javascript.info',
    likes: 10
  },
  {
    title: 'node',
    author: 'andrew',
    url: 'www.mead.io',
    likes: 13
  }
]

const initialUsers = [
  {
    username: 'root',
    name: 'Superuser',
    password: 'Haha123'
  },
  {
    username: 'shadow',
    name: 'ShadowFree',
    password: 'Haha123'
  }
]


const blogsInDB = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(user => user.toJSON())
}

module.exports = {
  initialBlogs,
  initialUsers,
  blogsInDB,
  usersInDb
}