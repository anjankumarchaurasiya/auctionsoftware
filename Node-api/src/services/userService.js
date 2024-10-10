const { loginUser,createUserReg,existingUserReg } = require('../queries/userQueries');

const getUser = async (username, password) => {
    return await loginUser(username, password);
};
const createUser = async (username,hashedPassword,salt) => {
    return await createUserReg(username,hashedPassword,salt);
};  
const checkExistingUser = async (username, ) => {
    return await existingUserReg(username);
};  
module.exports = { getUser,createUser,checkExistingUser };
