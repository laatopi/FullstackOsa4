const supertest = require('supertest')
const { app, server } = require('../index')
const api = supertest(app)
const Blog = require('../models/blog')
const { format, initialBlogs, blogsInDb } = require('./test_helpjer')



beforeAll(async () => {
    await Blog.remove({})

    const blogObjects = initialBlogs.map(blog => new Blog(blog))
    const promiseArray = blogObjects.map(blog => blog.save())
    await Promise.all(promiseArray)
})

test('notes are returned as json', async () => {
    const blogsInDatabase = await blogsInDb()

    const response = await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)

    expect(response.body.length).toBe(blogsInDatabase.length)

    const returnedTitles = response.body.map(r => r.title)
    blogsInDatabase.forEach(blog => {
        expect(returnedTitles).toContain(blog.title)
    })
})


test('a specific blog is within the returned blogs', async () => {
    const blogsInDatabase = await blogsInDb()

    const response = await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)

    const titles = response.body.map(r => r.title)
    expect(titles).toContain('Tannniini mandariineissa')
})

test('a valid blog can be added', async () => {
    const blogsAtStart = await blogsInDb()

    const newBlog = {
        title: "Argentinan Aavikot",
        author: "Mr. Roy Regenc",
        url: "www.poliisi.fi",
        likes: 996
    }

    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(200)
        .expect('Content-Type', /application\/json/)

    const blogsAfterOperation = await blogsInDb()
    const titles = blogsAfterOperation.map(r => r.title)
    expect(blogsAfterOperation.length).toBe(initialBlogs.length + 1)
    expect(titles).toContain('Argentinan Aavikot')
})

test('a blog without likes will default to 0 likes', async () => {
    const newBlog = {
        author: "Roger",
        title: 'Sick moves',
        url: "Www.jezzz.com"
    }

    const blogsAtStart = await blogsInDb()

    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(200)
        .expect('Content-Type', /application\/json/)

    const blogsAfterOperation = await blogsInDb()


    const likes = blogsAfterOperation.map(r => r.likes)
    expect(likes).toContain(0)

})

test('a blog without title or url can not be added', async () => {
    const newBlog = {
        author: "Beelzebub",
        likes: 112
    }

    const blogsAtStart = await blogsInDb()

    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(400)

    const blogsAfterOperation = await blogsInDb()

    const titles = blogsAfterOperation.map(r => r.title)

    expect(blogsAfterOperation.length).toBe(blogsAtStart.length)
})

describe('deletion of a blog', async () => {
    let addedBlog

    beforeAll(async () => {
        addedBlog = new Blog({
            title: "Silli salaatti",
            author: "Mr. Roy Regenc",
            url: "www.poliisi.fi",
            likes: 996
        })
        await addedBlog.save()
    })

    test('Added blog can be deleted', async () => {
        const blogsAtStart = await blogsInDb()

        await api
            .delete(`/api/blogs/${addedBlog._id}`)
            .expect(204)

        const blogsAfterOperation = await blogsInDb()

        const titles = blogsAfterOperation.map(r => r.title)

        expect(titles).not.toContain(addedBlog.title)
        expect(blogsAfterOperation.length).toBe(blogsAtStart.length - 1)
    })

    test('Added blog can be updated', async () => {
        const blogsAtStart = await blogsInDb()


        await api
            .put(`/api/blogs/${blogsAtStart[0].id}`)
            .send(addedBlog)

        const blogsAfterOperation = await blogsInDb()

        const titles = blogsAfterOperation.map(r => r.title)

        expect(titles).toContain("Silli salaatti")
        expect(blogsAfterOperation.length).toBe(blogsAtStart.length)
    })

    afterAll(() => {
        server.close()
    })
})

