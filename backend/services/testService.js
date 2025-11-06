import pool from "../config/database.js";

export const getAllTests = async () => {
    const query = `
        SELECT 
            t.*,
            COUNT(tr.id) as result_count
        FROM tests t
        LEFT JOIN test_results tr ON t.id = tr.test_id
        GROUP BY t.id
        ORDER BY result_count DESC, t.created_at DESC
    `;
    const result = await pool.query(query);
    return result.rows;
};

export const getTestById = async (id) => {
    const query = "SELECT * FROM tests WHERE id = $1";
    const result = await pool.query(query, [id]);
    return result.rows[0];
};

export const getRandomTest = async () => {
    const query = `
        SELECT * FROM tests 
        ORDER BY RANDOM() 
        LIMIT 1
    `;
    const result = await pool.query(query);
    return result.rows[0];
};

export const getTestsByCategory = async (category) => {
    const query = `
        SELECT 
            t.*,
            COUNT(tr.id) as result_count
        FROM tests t
        LEFT JOIN test_results tr ON t.id = tr.test_id
        WHERE t.category = $1
        GROUP BY t.id
        ORDER BY result_count DESC
    `;
    const result = await pool.query(query, [category]);
    return result.rows;
};

export const getPopularTests = async (limit = 10) => {
    const query = `
        SELECT 
            t.*,
            COUNT(tr.id) as result_count
        FROM tests t
        LEFT JOIN test_results tr ON t.id = tr.test_id
        GROUP BY t.id
        ORDER BY result_count DESC
        LIMIT $1
    `;
    const result = await pool.query(query, [limit]);
    return result.rows;
};

