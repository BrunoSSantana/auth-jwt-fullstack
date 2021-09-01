const { Router } = require('express')

const ensureAutheticated = require('./middlewares/ensureAutheticated')
const CreateUserController = require('./Controllers/Users/CreateUserController')
const LoginUserController = require('./Controllers/Users/LoginUserController')
const RefreshTokenUserController = require('./Controllers/Users/RefreshTokenUserController')
const ValidateTokenUserController = require('./Controllers/Users/ValidateTokenUserController')

const routes = Router()

routes
  .post('/users', CreateUserController)
  .post('/login', LoginUserController)
  .post('/validate', ValidateTokenUserController)
  .post('/refresh', RefreshTokenUserController)
  .get('/', ensureAutheticated, (request, response) => {
    return response.json([
      { id: "1", name: "bruno" },
      { id: "2", name: "brunão" },
      { id: "3", name: "bruninho" }
    ])
  })

module.exports = { routes }
