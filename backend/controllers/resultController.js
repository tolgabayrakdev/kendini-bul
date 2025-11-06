import * as resultService from "../services/resultService.js";
import * as testService from "../services/testService.js";

export const submitTest = async (req, res) => {
    try {
        const { testId, answers } = req.body;

        if (!testId || !answers || !Array.isArray(answers)) {
            return res.status(400).json({ 
                success: false, 
                message: "testId and answers array are required" 
            });
        }

        // Get test details
        const test = await testService.getTestById(testId);
        if (!test) {
            return res.status(404).json({ success: false, message: "Test not found" });
        }

        // Calculate score
        const score = resultService.calculateScore(test.questions, answers);
        
        // Get result based on score
        const result = resultService.getResultForScore(test.results, score);

        // Save result
        const savedResult = await resultService.saveTestResult(
            testId,
            score,
            result.title
        );

        res.json({
            success: true,
            data: {
                ...savedResult,
                resultDescription: result.description,
                score: score,
                maxScore: test.questions.length * 4 // Max possible score
            }
        });
    } catch (error) {
        console.error("Error submitting test:", error);
        res.status(500).json({ success: false, message: "Error submitting test" });
    }
};

export const getResultByToken = async (req, res) => {
    try {
        const { token } = req.params;
        const result = await resultService.getResultByShareToken(token);
        
        if (!result) {
            return res.status(404).json({ success: false, message: "Result not found" });
        }
        
        res.json({ success: true, data: result });
    } catch (error) {
        console.error("Error fetching result:", error);
        res.status(500).json({ success: false, message: "Error fetching result" });
    }
};

export const getTestStatistics = async (req, res) => {
    try {
        const { testId } = req.params;
        const stats = await resultService.getTestStatistics(testId);
        res.json({ success: true, data: stats });
    } catch (error) {
        console.error("Error fetching statistics:", error);
        res.status(500).json({ success: false, message: "Error fetching statistics" });
    }
};

