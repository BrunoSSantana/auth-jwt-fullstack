const knex = require('../../database')
const { compare } = require('bcrypt')
const { sign } = require('jsonwebtoken')
const dayjs = require('dayjs')

require('dotenv').config()

module.exports = async (req, res, next) => {
  try {
    const { email, password } = req.body

    const [user] = await knex('users')
      .where({ email })

    if (!user) {
      return res.json({ message: 'email or password incorrect' })
    }

    const id = user.id

    const passMatch = await compare(password, user.password,);

    if (!passMatch) {
      return res.json({ message: 'email or password incorrect' })
    }

    const token = sign({ id }, process.env.SECRET_TOKEN, {
      subject: user.id,
      expiresIn: process.env.EXPIRES_IN_TOKEN,
    })

    const refresh_token = sign({}, process.env.SECRET_REFRESH_TOKEN, {
      expiresIn: process.env.EXPIRES_IN_REFRESH_TOKEN,
    })

    // console.log("refresh criado:",refresh_token);

    await knex('tokens').where({ user_id: id }).del()

    const expires_date = dayjs().add(30, 'seconds').toDate()

    await knex('tokens').insert({
      refresh_token: refresh_token,
      user_id: id,
      expires_date,
    })

    return res.json({ token, refresh_token })

  } catch (error) {
    next(error)
  }
}