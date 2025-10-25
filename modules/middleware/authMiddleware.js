import jwt from 'jsonwebtoken';

export async function authenticate(req, res, next) {
  
  try {
    const authHeader = req.header('Authorization');

    if (!authHeader) {
      return res.status(401).json({
        error: {
          message: "Authorization header is missing"
        }
      })
    }

    const token = authHeader.split(' ')[1];

    if (!token) {
      return res.status(401).json({
        error: {
          message: "Token is missing"
        },
      })
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'movyapi_secretkey');

    req.user = decoded;
    next();
  } catch(error) {  
    console.error(error);
    return res.status(403).json({
      error: {
        message: "Invalid or expired token",
      }
    })
  }
}