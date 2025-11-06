import * as testService from "../services/testService.js";

export const getAllTests = async (req, res) => {
    try {
        const tests = await testService.getAllTests();
        res.json({ success: true, data: tests });
    } catch (error) {
        console.error("Error fetching tests:", error);
        res.status(500).json({ success: false, message: "Error fetching tests" });
    }
};

export const getTestById = async (req, res) => {
    try {
        const { id } = req.params;
        const test = await testService.getTestById(id);
        
        if (!test) {
            return res.status(404).json({ success: false, message: "Test not found" });
        }
        
        res.json({ success: true, data: test });
    } catch (error) {
        console.error("Error fetching test:", error);
        res.status(500).json({ success: false, message: "Error fetching test" });
    }
};

export const getRandomTest = async (req, res) => {
    try {
        const test = await testService.getRandomTest();
        
        if (!test) {
            return res.status(404).json({ success: false, message: "No tests available" });
        }
        
        res.json({ success: true, data: test });
    } catch (error) {
        console.error("Error fetching random test:", error);
        res.status(500).json({ success: false, message: "Error fetching random test" });
    }
};

export const getTestsByCategory = async (req, res) => {
    try {
        const { category } = req.params;
        const tests = await testService.getTestsByCategory(category);
        res.json({ success: true, data: tests });
    } catch (error) {
        console.error("Error fetching tests by category:", error);
        res.status(500).json({ success: false, message: "Error fetching tests" });
    }
};

export const getPopularTests = async (req, res) => {
    try {
        const limit = parseInt(req.query.limit) || 10;
        const tests = await testService.getPopularTests(limit);
        res.json({ success: true, data: tests });
    } catch (error) {
        console.error("Error fetching popular tests:", error);
        res.status(500).json({ success: false, message: "Error fetching popular tests" });
    }
};

