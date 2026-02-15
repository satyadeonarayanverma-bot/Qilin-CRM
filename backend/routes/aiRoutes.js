const express = require('express');
const { protect } = require('../middleware/authMiddleware');
const { getChatCompletion } = require('../services/aiService');

const router = express.Router();

// @desc    Chat with AI Copilot
// @route   POST /api/ai/chat
router.post('/chat', protect, async (req, res) => {
    const { messages } = req.body;

    if (!messages || !Array.isArray(messages)) {
        return res.status(400).json({ message: "Invalid messages format" });
    }

    try {
        const response = await getChatCompletion(messages);
        res.json({ content: response });
    } catch (error) {
        res.status(500).json({ message: "AI Service unavailable" });
    }
});

module.exports = router;
