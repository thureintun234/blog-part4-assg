const dummy = require('../utils/list_helper').dummy

describe('dummy', () => {
  test('dummy return one', () => {
    const blogs = []
    const result = dummy(blogs)
    expect(result).toBe(1)
  })
})