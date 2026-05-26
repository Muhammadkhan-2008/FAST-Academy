const express = require('express');
const router = express.Router();
const { Course } = require('../models/Schema');

// AI-Powered Smart Course Search
router.post('/search', async (req, res) => {
  const { query } = req.body;
  
  if (!query) return res.status(400).json({ error: 'Query is required' });

  try {
    const courses = await Course.find();
    
    // Simple mock of AI logic (fuzzy matching)
    // In a real scenario, you'd send the query to Gemini/OpenAI
    const suggestions = courses.filter(c => 
      c.name.toLowerCase().includes(query.toLowerCase()) || 
      c.description.toLowerCase().includes(query.toLowerCase())
    ).map(c => ({
      id: c._id,
      name: c.name,
      relevance: 'High',
      matchReason: `Matching keywords found in ${c.name}`
    }));

    res.json({
      aiInsight: `Based on your interest in "${query}", we recommend these specialized paths.`,
      suggestions: suggestions.slice(0, 3)
    });
  } catch (err) {
    res.status(500).json({ error: 'AI Search failed' });
  }
});

module.exports = router;
