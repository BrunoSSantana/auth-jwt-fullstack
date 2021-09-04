require('dotenv').config()

const knex = require('../../database')
const { sign } = require('jsonwebtoken')
const dayjs = require('dayjs')

module.exports = async (req, res) => {
  const token =
    req.body.token ||
    req.headers["x-access-token"] ||
    req.query.token;

  const refresh_token = token

  if (!refresh_token) {
    return res.json({ message: "missing Refresh Token" });
  }

  const [userToken] = await knex('tokens')
    .where({ refresh_token })
    .join('users', 'users.id', '=', 'tokens.user_id')
    .select('users.*')

  if (!userToken) {
    return res
      .status(401)
      .json({
        message: "Invalid refresh token"
      });
  }

  const newTtoken = sign({ email: userToken.email }, process.env.SECRET_TOKEN, {
    subject: userToken.id,
    expiresIn: process.env.EXPIRES_IN_TOKEN,
  })

  await knex('tokens').where({ refresh_token }).del()

  const new_refresh_token = sign({}, process.env.SECRET_REFRESH_TOKEN, {
    expiresIn: process.env.EXPIRES_IN_REFRESH_TOKEN,
  })

  const expires_date = dayjs().add(30, 'seconds').toDate()

  await knex('tokens').insert({
    refresh_token: new_refresh_token,
    user_id: userToken.id,
    expires_date,
  })

  return res.json({ token: newTtoken, refresh_token: new_refresh_token, auth: true });

}