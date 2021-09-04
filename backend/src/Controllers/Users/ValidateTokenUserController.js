require('dotenv').config()
const knex = require('../../database')
const { verify } = require('jsonwebtoken')


module.exports = async (req, res) => {
  const authHeader = req.headers["authorization"]

  if (!authHeader) {
    return res.status(400).json({ message: "Token missing" })
  }

  try {
    const { email } = verify(authHeader, process.env.SECRET_TOKEN)

    const [user] = await knex('users')
      .where({ email })
        
    return res.status(200).json({ auth: true, user:{ name: user.username, email: user.email, id: user.id} })
  } catch (err) {

    if (err.name === 'TokenExpiredError') {
      return res.json({refresh: true})
    }

    return res.status(401).json({ auth: false, err })
  }

}
