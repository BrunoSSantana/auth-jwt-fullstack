require('dotenv').config()
const { verify } = require('jsonwebtoken')


module.exports = async (req, res) => {
  const authHeader = req.headers["authorization"]

  if (!authHeader) {
    return res.status(400).json({ message: "Token missing" })
  }

  try {
    verify(authHeader, process.env.SECRET_TOKEN)

    return res.status(200).json({ auth: true })
  } catch (err) {

    if (err.name === 'TokenExpiredError') {

      return res.json({refresh: true})
    }

    return res.status(401).json({ auth: false, err })
  }

}
