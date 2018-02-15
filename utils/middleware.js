const logger = (request, response, next) => {
  console.log('Method:', request.method)
  console.log('Path:  ', request.path)
  console.log('Body:  ', request.body)
  console.log('---')
  next()
}

const error = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

const tokenExtractor = (request, response, next) => {

  const authorization = request.get('authorization')
  console.log('TÄÄLLÄ NÄIN....', authorization)

  if (authorization && authorization.toLowerCase().startsWith('bearer')) {
    request.token = authorization.substring(7)
    console.log('TÄÄLLÄ NÄIN....', request.token)
  }
  next()
}

module.exports = {
  logger,
  error,
  tokenExtractor
}