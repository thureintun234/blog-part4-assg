const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  if (blogs.length === 0) return 0
  if (blogs.length === 1) return blogs[0].likes
  let sum = 0
  blogs.map(blog => {
    sum += blog.likes
  })
  return sum
}


const favouriteBlog = (blogs) => {
  let blogHash = {}
  let mostLikes = 0

  blogs.map(blog => {
    if (blog.likes > mostLikes) {
      mostLikes = blogs.likes
      blogHash = blog
    }
  })
  return blogHash
}


module.exports = {
  dummy,
  totalLikes,
  favouriteBlog
}