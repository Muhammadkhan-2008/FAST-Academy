const express = require('express');
const router = express.Router();
const { Course } = require('../models/Schema');
const { requireAuth, checkRole } = require('../middleware/auth');

// Public: Get all courses
router.get('/', async (req, res) => {
  try {
    const courses = await Course.find();
    res.json(courses);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch courses' });
  }
});

// Teacher & Admin: Create course
router.post('/', requireAuth, checkRole(['ceo', 'teacher']), async (req, res) => {
  try {
    const course = new Course(req.body);
    await course.save();
    res.status(201).json(course);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create course' });
  }
});

// Teacher & Admin: Add resource to course
router.post('/:id/resources', requireAuth, checkRole(['ceo', 'teacher']), async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) return res.status(404).json({ error: 'Course not found' });
    
    course.resources.push(req.body);
    await course.save();
    res.json(course);
  } catch (err) {
    res.status(500).json({ error: 'Failed to add resource' });
  }
});

// Admin Only: Update course
router.put('/:id', requireAuth, checkRole(['ceo', 'teacher']), async (req, res) => {
  try {
    const course = await Course.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(course);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update course' });
  }
});

module.exports = router;
