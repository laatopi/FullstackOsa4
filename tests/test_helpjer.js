const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlogs = [
    {
        title: "Argentinan Aavikot",
        author: "Mr. Roy Regenc",
        url: "www.poliisi.fi",
        likes: 996
    },
    {
        title: "Tannniini mandariineissa",
        author: "TJ Detwington",
        url: "www.helou.jj",
        likes: 996
    }
]

const format = (blog) => {
    return {
        id: blog._id,
        title: blog.title,
        author: blog.author,
        url: blog.url,
        likes: blog.likes
    }
}

const blogsInDb = async () => {
    const blogs = await Blog.find({})
    return blogs.map(format)
}

const usersInDb = async () => {
    const users = await User.find({})
    return users.map(User.format)
}

module.exports = {
    initialBlogs, format, blogsInDb, usersInDb
}
