const listHelper = require('../utils/list_helper')

test('dummy is called', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  expect(result).toBe(1)
})

const listWithOneBlog = [
    {
      id: "5a730c9bd8567d407da7086b",
      title: "Ranskan Railakkaat",
      author: "Ranskan Railakkaat",
      url: "www.habbohotel.fi",
      likes: 18
    },
    {
      id: "5a730cd9d8567d407da7086c",
      title: "Kiinan Kiitokset",
      author: "Kiinan Kiitokset",
      url: "www.ingman.fi",
      likes: 55
    },
    {
      id: "5a730d14d8567d407da7086d",
      title: "Argentinan Aavikot",
      author: "Argentinan Aavikot",
      url: "www.poliisi.fi",
      likes: 996
    },
    {
      id: "5a731fa724d08552b5b58f90",
      title: "Argentinan Latikot=?avikot",
      author: "Argentinan Latikot=?avikot",
      url: "www.poliisi.fi",
      likes: 996
    }
  ]

describe('total likes', () => {

  const listWithOneBlog = [
    {
      id: "5a730c9bd8567d407da7086b",
      title: "Ranskan Railakkaat",
      author: "Ranskan Railakkaat",
      url: "www.habbohotel.fi",
      likes: 18
    },
    {
      id: "5a730cd9d8567d407da7086c",
      title: "Kiinan Kiitokset",
      author: "Kiinan Kiitokset",
      url: "www.ingman.fi",
      likes: 55
    },
    {
      id: "5a730d14d8567d407da7086d",
      title: "Argentinan Aavikot",
      author: "Argentinan Aavikot",
      url: "www.poliisi.fi",
      likes: 996
    },
    {
      id: "5a731fa724d08552b5b58f90",
      title: "Argentinan Latikot=?avikot",
      author: "Argentinan Latikot=?avikot",
      url: "www.poliisi.fi",
      likes: 996
    }
  ]


  test('when list has only one blog equals the likes of that', () => {
    const result = listHelper.totalLikes(listWithOneBlog)
    expect(result).toBe(2065)
  })
})

describe('most likes', () => {

  const listWithOneBlog = [
    {
      id: "5a730c9bd8567d407da7086b",
      title: "Ranskan Railakkaat",
      author: "Ranskan Railakkaat",
      url: "www.habbohotel.fi",
      likes: 18
    },
    {
      id: "5a730cd9d8567d407da7086c",
      title: "Kiinan Kiitokset",
      author: "Kiinan Kiitokset",
      url: "www.ingman.fi",
      likes: 55
    },
    {
      id: "5a730d14d8567d407da7086d",
      title: "Argentinan Aavikot",
      author: "Argentinan Aavikot",
      url: "www.poliisi.fi",
      likes: 998
    },
    {
      id: "5a731fa724d08552b5b58f90",
      title: "Argentinan Latikot=?avikot",
      author: "Argentinan Latikot=?avikot",
      url: "www.poliisi.fi",
      likes: 996
    }
  ]


  test('the blog with most likes', () => {
    const result = listHelper.favoriteBlog(listWithOneBlog)
    expect(result).toEqual({
      title: "Argentinan Aavikot",
      author: "Argentinan Aavikot",
      likes: 998
    })
  })
})

describe('author with most blogs', () => {

  const listWithOneBlog = [
    {
      id: "5a730c9bd8567d407da7086b",
      title: "Ranskan Railakkaat",
      author: "Ranskan Railakkaat",
      url: "www.habbohotel.fi",
      likes: 18
    },
    {
      id: "5a730cd9d8567d407da7086c",
      title: "Kiinan Kiitokset",
      author: "Kiinan Kiitokset",
      url: "www.ingman.fi",
      likes: 55
    },
    {
      id: "5a730d14d8567d407da7086d",
      title: "Argentinan Aavikot",
      author: "Argentinan Aavikot",
      url: "www.poliisi.fi",
      likes: 998
    },
    {
      id: "5a731fa724d08552b5b58f90",
      title: "Argentinan Aavikot",
      author: "Argentinan Aavikot",
      url: "www.poliisi.fi",
      likes: 996
    }
  ]


  test('the author with most blogs', () => {
    const result = listHelper.mostBlogs(listWithOneBlog)
    expect(result).toEqual({
      author: "Argentinan Aavikot",
      blogs: 2
    })
  })
})

describe('author with most likes', () => {

  const listWithOneBlog = [
    {
      id: "5a730c9bd8567d407da7086b",
      title: "Ranskan Railakkaat",
      author: "Ranskan Railakkaat",
      url: "www.habbohotel.fi",
      likes: 18
    },
    {
      id: "5a730cd9d8567d407da7086c",
      title: "Kiinan Kiitokset",
      author: "Kiinan Kiitokset",
      url: "www.ingman.fi",
      likes: 55
    },
    {
      id: "5a730d14d8567d407da7086d",
      title: "Argentinan Aavikot",
      author: "Argentinan Aavikot",
      url: "www.poliisi.fi",
      likes: 998
    },
    {
      id: "5a731fa724d08552b5b58f90",
      title: "Argentinan Aavikot",
      author: "Argentinan Aavikot",
      url: "www.poliisi.fi",
      likes: 996
    }
  ]


  test('the author with most likes', () => {
    const result = listHelper.mostLikes(listWithOneBlog)
    expect(result).toEqual({
      author: "Argentinan Aavikot",
      likes: 1994
    })
  })
})



