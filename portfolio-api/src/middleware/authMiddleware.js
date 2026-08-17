import jwt from 'jsonwebtoken'

export function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization
  let token = null

  if (authHeader && authHeader.startsWith('Bearer ')) {
    token = authHeader.split(' ')[1]
  } else if (req.cookies && req.cookies.token) {
    token = req.cookies.token
  }

  if (!token) {
    return res.status(401).json({ success: false, message: 'Authentication required. Please login.' })
  }

  try {
    const secret = process.env.JWT_SECRET || 'super_secret_jwt_key_change_me_in_production'
    const decoded = jwt.verify(token, secret)
    req.user = decoded
    next()
  } catch (error) {
    return res.status(401).json({ success: false, message: 'Invalid or expired session token.' })
  }
}
