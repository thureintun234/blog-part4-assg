const favouriteBlog = require('../utils/list_helper').favouriteBlog

describe('favourite', () => {
  test('of blog one with most likes', () => {
    const blogs = [
      {
        title: "Canonical string reduction",
        author: "Edsger W. Dijkstra",
        likes: 12
      },
      {
        title: "string reduction",
        author: "Dijkstra",
        likes: 5
      },
      {
        title: "Canonical",
        author: "Edsger",
        likes: 3
      }
    ]
    const result = favouriteBlog(blogs)
    expect(result).toEqual(
      {
        title: "Canonical string reduction",
        author: "Edsger W. Dijkstra",
        likes: 12
      }
    )
  })
});