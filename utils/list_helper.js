

const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  const palautus = (blogs) => {
    let count = 0
    blogs.forEach(element => {
      count = count + element.likes
    })
    return count
  }
  return palautus(blogs)
}

const favoriteBlog = (blogs) => {
  const palautus = (blogs) => {
    let favourite = blogs[0]
    blogs.forEach(blog => {
      if (blog.likes > favourite.likes) {
        favourite = blog
      }
    })
    return favourite
  }
  const winner = palautus(blogs)
  return {
    title: winner.title,
    author: winner.author,
    likes: winner.likes
  }
}

const mostBlogs = (blogs) => {

  const palautus = (blogs) => {
    let writers = []
    blogs.forEach(blog => {
      const found = writers.find(writer => writer.author === blog.author)
      if (found === undefined) {
        writers.push({ author: blog.author, blogs: 1 })
      } else {
        found.blogs = found.blogs + 1
      }
    })
    let mostBlogsWriter = writers[0]
    const writerpalautus = (writers) => {
      writers.forEach(writer => {
        if (writer.blogs > mostBlogsWriter.blogs) {
          mostBlogsWriter = writer
        }
      })
      return mostBlogsWriter
    }
    const winner = writerpalautus(writers)
    return {
      author: winner.author,
      blogs: winner.blogs
    }
  }

  return palautus(blogs)

}

const mostLikes = (blogs) => {
  const palautus = (blogs) => {
    let writers = []
    blogs.forEach(blog => {
      const found = writers.find(writer => writer.author === blog.author)
      if (found === undefined) {
        writers.push({ author: blog.author, likes: blog.likes })
      } else {
        found.likes = found.likes + blog.likes
      }
    })
    let mostLikesAuthor = writers[0]
    const writerpalautus = (writers) => {
      writers.forEach(writer => {
        if (writer.likes > mostLikesAuthor.likes) {
          mostLikesAuthor = writer
        }
      })
      return mostLikesAuthor
    }
    const winner = writerpalautus(writers)
    return {
      author: winner.author,
      likes: winner.likes
    }
  }

  return palautus(blogs)

}



module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}