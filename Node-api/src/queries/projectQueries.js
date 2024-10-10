const db = require('../config/database'); 

// Query to fetch projects with sorting and pagination
const fetchProjects = async (sortBy, page, limit) => {
    const offset = (page - 1) * limit;

    let orderClause = '';
    switch (sortBy) {
        case 'category':
            orderClause = 'ORDER BY c.name ASC';
            break;
        case 'username':
            orderClause = 'ORDER BY u.username ASC';
            break;
        case 'title':
            orderClause = 'ORDER BY p.project_title ASC';
            break;
        case 'recent':
            orderClause = 'ORDER BY p.id DESC';
            break;
        default:
            orderClause = 'ORDER BY p.id DESC';
            break;
    }

    const sql = `
        SELECT p.project_id, p.description, p.buynow_price, p.date_added, p.status, p.user_id ,p.project_title, u.username, c.name AS category_name
        FROM ilance_projects p
        JOIN ilance_users u ON p.user_id = u.user_id
        JOIN ilance_categories c ON p.cid = c.category_id
        ${orderClause}
        LIMIT ? OFFSET ?`;

    const [rows] = await db.query(sql, [limit, offset]);
    const countSql = 'SELECT COUNT(*) AS total FROM ilance_projects';
    const [countRows] = await db.query(countSql);
    const totalCount = countRows[0].total;
    const totalPages = Math.ceil(totalCount / limit);
     console.log()
    return { projects: rows, totalPages };
};

// Query to create a new project
const createProject = async (projectDetails) => {
    const { project_title, user_id, description, status, buynow_price } = projectDetails;
    const sql = `
        INSERT INTO ilance_projects (project_title, user_id, description, status, buynow_price)
        VALUES (?, ?, ?, ?, ?)`;
    const [result] = await db.query(sql, [project_title, user_id, description, status, buynow_price]);
    return { id: result.insertId, ...projectDetails };
};

const createBuyNowOrder = async (orderDetails) => {
    const { project_id, buyer_id, owner_id, amount, status } = orderDetails;
    const sql = `
        INSERT INTO buy_now_orders (project_id, buyer_id, owner_id, amount, status)
        VALUES (?, ?, ?, ?, ?)`;
    const [result] = await db.query(sql, [project_id, buyer_id, owner_id, amount, status]);
    return { id: result.insertId, ...orderDetails };
};
 

module.exports = { fetchProjects, createProject,createBuyNowOrder };
