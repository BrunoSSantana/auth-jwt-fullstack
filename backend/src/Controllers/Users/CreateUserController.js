const knex = require('../../database')
const { hash } = require('bcrypt')

module.exports = async (req, res, next) => {

  try {
    const { username, email, password } = req.body

    const [userAlredyExists] =
      await knex('users')
        .where({ email })

    if (userAlredyExists) {
      return res.status(400).json({ message: 'Email in use' })
    }
    
    const newPassword = await hash(password, 8)

    await knex('users').insert({
      username,
      email,
      password: newPassword,
    })

    return res.status(200).send()
  } catch (error) {
    next(error)
  }
}