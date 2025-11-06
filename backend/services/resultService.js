import pool from "../config/database.js";
import crypto from "crypto";

// Generate a short share token
const generateShareToken = () => {
    return crypto.randomBytes(4).toString("hex").toUpperCase();
};

// Calculate score from answers
export const calculateScore = (questions, answers) => {
    let score = 0;
    questions.forEach((question, index) => {
        const answerIndex = answers[index];
        if (answerIndex !== undefined && answerIndex >= 0 && answerIndex < question.options.length) {
            // Each answer contributes to the score
            // Option A = 1 point, B = 2 points, C = 3 points, D = 4 points
            score += answerIndex + 1;
        }
    });
    return score;
};

// Get result based on score
export const getResultForScore = (results, score) => {
    for (const result of results) {
        const [min, max] = result.range.split("-").map(Number);
        if (score >= min && score <= max) {
            return result;
        }
    }
    // Fallback to first result if no match
    return results[0];
};

// Save test result
export const saveTestResult = async (testId, score, resultTitle) => {
    let shareToken = generateShareToken();
    
    // Ensure token is unique
    let exists = true;
    while (exists) {
        const checkQuery = "SELECT id FROM test_results WHERE share_token = $1";
        const checkResult = await pool.query(checkQuery, [shareToken]);
        if (checkResult.rows.length === 0) {
            exists = false;
        } else {
            shareToken = generateShareToken();
        }
    }

    const query = `
        INSERT INTO test_results (test_id, score, result_title, share_token)
        VALUES ($1, $2, $3, $4)
        RETURNING *
    `;
    const result = await pool.query(query, [testId, score, resultTitle, shareToken]);
    return result.rows[0];
};

// Get result by share token
export const getResultByShareToken = async (shareToken) => {
    const query = `
        SELECT 
            tr.*,
            t.title as test_title,
            t.description as test_description
        FROM test_results tr
        JOIN tests t ON tr.test_id = t.id
        WHERE tr.share_token = $1
    `;
    const result = await pool.query(query, [shareToken]);
    return result.rows[0];
};

// Get test statistics
export const getTestStatistics = async (testId) => {
    const query = `
        SELECT 
            COUNT(*) as total_results,
            AVG(score) as average_score,
            MIN(score) as min_score,
            MAX(score) as max_score
        FROM test_results
        WHERE test_id = $1
    `;
    const result = await pool.query(query, [testId]);
    return result.rows[0];
};

