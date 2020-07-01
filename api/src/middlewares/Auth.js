import { verify } from 'jsonwebtoken'

export default (req, res, next) => {
  try {
    const token = req.headers.authorization

    verify(token, process.env.APP_SECRET, {}, (error, decoded) => {
      if (error != null)
        return res.status(401).json({
          error: error.message,
        })

      req.userId = decoded.sub
      return next()
    })
  } catch (error) {
    res.status(500).json({
      error: error.message,
    })
  }
}
