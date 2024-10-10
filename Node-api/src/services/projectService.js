const { fetchProjects, createProject, createBuyNowOrder } = require('../queries/projectQueries');

const getProjects = async (sortBy, page, limit) => {
    return await fetchProjects(sortBy, page, limit);
};

const addProject = async (projectDetails) => {
    return await createProject(projectDetails);
};
 
const addBuyNowOrder = async (orderDetails) => {
    return await createBuyNowOrder(orderDetails);
};
 
module.exports = { 
    getProjects, 
    addProject, 
    addBuyNowOrder 
};
