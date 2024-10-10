const db = require('../config/database');  
const md5 = require('md5');
const jwt = require('jsonwebtoken');

// Function to fetch user by username
const fetchUserByUsername = async (username) => {
    const sql = 'SELECT * FROM ilance_users WHERE username = ?';  
    const [user] = await db.query(sql, [username]);
    return user || [];  
};

// Login function
const loginUser = async (formUsername, formPassword) => {
    console.log('formUsername, formPassword',formUsername, formPassword);
    const user = await fetchUserByUsername(formUsername);
    if (!user) {
        throw new Error('User not found');
    }

    return {   userId: user.user_id };  
};

const createUserReg = async (username, hashedPassword, salt) => {
    const [result] = await db.query(
        'INSERT INTO ilance_users (username, password, salt,styleid,languageid,currencyid,timezone,notifyservices,notifyproducts,displayprofile,emailnotify,displayfinancials,vatnumber,regnumber,dnbnumber,companyname,usecompanyname,timeonsite,daysonsite) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?,?,?, ?,?,?)', 
        [username, hashedPassword, salt, 1, 1, 1, 'America/Toronto', 0, 0, 0, 0, 0, 0,0,0,0,0,0,0]
    );
    return result.insertId; 
};
const existingUserReg = async (username) => {
    const sql = 'SELECT userName,user_id,password,salt FROM ilance_users WHERE username = ?';  
    const [user] = await db.query(sql, [username]);
    return user || [];  
};
module.exports = { loginUser,createUserReg,existingUserReg };
