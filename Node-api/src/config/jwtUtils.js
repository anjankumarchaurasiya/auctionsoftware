// jwtUtils.js
const jwt = require('jsonwebtoken');
require('dotenv').config();
const md5 = require('md5');
const crypto = require('crypto');

const generateToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '24h' });  
};

const verifyToken = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET);
};
const generateHash = (password) => {
  const salt = crypto.randomBytes(3).toString('base64').slice(0, 5);
  const hashedPassword = md5(md5(password) + salt);
  return {hashedPassword,salt}
}

const verifyPassword = (inputPassword, salt, storedHash) => {
  const hashedInput = md5(md5(inputPassword) + salt);
  return hashedInput === storedHash;
};

module.exports = { generateToken, verifyToken,generateHash,verifyPassword };
