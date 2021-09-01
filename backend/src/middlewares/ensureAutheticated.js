require('dotenv').config()
const { verify } = require('jsonwebtoken')


module.exports = async (req, res, next) => {
  const authHeader = req.headers["authorization"]

  if (!authHeader) {
    return res.status(400).json({ message: "Token missing" })
  }

  const token = authHeader;

  try {

    const { sub: user_id } = verify(token, process.env.SECRET_TOKEN)

    req.user = {
      id: user_id
    }

    return next()

  } catch (err) {

    return res
      .status(401)
      .json({ err, message: "User not authenticated" })
  }

}