const User = require('../models/user')
const supertest = require('supertest')
const { app, server } = require('../index')
const api = supertest(app)
const { usersInDb } = require('./test_helpjer')

describe.only('when there is initially only one user at db', async () => {
    beforeAll(async () => {
        await User.remove({})
        const user = new User({ username: 'root', password: 'sekret' })
        await user.save()
    })

    test('POST /api/users works with new username', async () => {
        const usersBeforeOperation = await usersInDb()

        const newUser = {
            username: "jakobXD",
            name: "jakob",
            adult: false,
            password: "reima121"
        }

        await api
            .post('/api/users')
            .send(newUser)
            .expect(200)
            .expect('Content-Type', /application\/json/)

        const usersAfterOperation = await usersInDb()
        console.log('ennen:', usersBeforeOperation)
        console.log('jälkeen:', usersAfterOperation)
        expect(usersBeforeOperation.length + 1).toBe(usersAfterOperation.length)
    })

    test('POST /api/users doesnt work with password less than 3 chars long', async () => {
        const usersBeforeOperation = await usersInDb()

        const newUser = {
            username: "herra",
            name: "Henri",
            adult: false,
            password: "ei"
        }

        await api
            .post('/api/users')
            .send(newUser)
            .expect(400)

        const usersAfterOperation = await usersInDb()

        expect(usersBeforeOperation.length).toBe(usersAfterOperation.length)
    })

    test('POST /api/users defaults "adult" to true if null', async () => {
        const newUser = {
            username: "herra",
            name: "Henri",
            password: "eijei"
        }
        
        await api
            .post('/api/users')
            .send(newUser)
            .expect(200)


        const usersBeforeOperation = await usersInDb()

        const adults = usersBeforeOperation.map(r => r.adult)
        expect(adults).toContain(true)
        
    })



    afterAll(() => {
        server.close()
    })
})