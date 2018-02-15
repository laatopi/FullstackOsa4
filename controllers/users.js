const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.post('/', async (request, response) => {
    try {
        const body = request.body

        if (body.password.length < 3) {
            return response.status(400).json({ error: 'password must be 3 chars or longer.' })
        }

        if (body.adult === undefined) {
            body.adult = true
        }

        const saltRounds = 10
        const passwordHash = await bcrypt.hash(body.password, saltRounds)

        const user = new User({
            username: body.username,
            name: body.name,
            adult: body.adult,
            passwordHash
        })

        const savedUser = await user.save()

        response.json(User.format(savedUser))

    } catch (exception) {
        console.log(exception)
        response.status(500).json({ error: 'something went wrong ...' })
    }
})

usersRouter.get('/', async (request, response) => {
    const users = await User
        .find()
        .populate('blogs', {user: 0, __v: 0})

    response.json(users.map(User.format))
})

module.exports = usersRouter