const express = require('express');
const router = express.Router();
const { addProject, getProjects } = require('../services/projectService');
const { getAllUsers } = require('../services/userService');
const { generateToken,generateHash,verifyPassword } = require('../config/jwtUtils'); 
const { getUser,createUser,checkExistingUser } = require('../services/userService');

router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    
    try {
        const user = await checkExistingUser(username);
 
 
        const isPasswordCorrect = verifyPassword(password, user[0].salt, user[0].password);
     
        if (!isPasswordCorrect) {
            throw new Error('Invalid username or password');
        }
     
        const token = generateToken(user[0]);
       
        return res.status(200).json({ token, userId: user[0].user_id,username: user[0].userName });

    } catch (error) {
        console.error('Login failed:', error.message || error);
        return res.status(401).json({ message: 'Invalid credentials' });
    }
});
router.post('/signup', async (req, res) => {
    const { username, password } = req.body;

    try {
      
        const existingUsers = await checkExistingUser(username);
        if (existingUsers.length > 0) {
            return res.status(400).json({ message: 'User already exists' });
        }
 
        const { hashedPassword, salt } = generateHash(password);

        const userId = await createUser(username, hashedPassword, salt);

        const token = generateToken(userId);

        return res.status(201).json({ token, userId, username });
    } catch (error) {
        console.error('Error signing up:', error.message || error);
        return res.status(500).json({ message: 'Internal server error' });
    }
});
router.get('/projects', async (req, res) => {
    const { sortBy = 'recent', page = 1, limit = 10 } = req.query;

    try {
        const { projects, totalPages } = await getProjects(sortBy, parseInt(page), parseInt(limit));
        res.json({ projects, totalPages });
    } catch (error) {
        console.error('Error fetching projects: ', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

 
module.exports = router;
