// authMiddleware.js
const { verifyToken } = require('./jwtUtils');

module.exports = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1]; 

  if (!token) {
    return res.status(403).json({ success: false, message: 'Access denied. No token provided.' });
  }

  try {
    const decoded = verifyToken(token);
    req.userId = decoded.userId;  
    next();
  } catch (error) {
    return res.status(401).json({ success: false, message: 'Invalid token.' });
  }
};
