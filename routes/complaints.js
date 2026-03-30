const express = require('express');
const router = express.Router();
const db = require('../db');
const { protect, adminOnly } = require('../middleware/authMiddleware');

// Create complaint
router.post('/', protect, async (req, res) => {
  if (req.user.role !== 'student') {
    return res.status(403).json({ message: 'Only students can submit complaints' });
  }

  const { title, description } = req.body;
  if (!title || !description) {
    return res.status(400).json({ message: 'Title and description are required' });
  }

  try {
    const [result] = await db.query(
      'INSERT INTO complaints (student_id, title, description) VALUES (?, ?, ?)',
      [req.user.id, title, description]
    );

    res.status(201).json({ id: result.insertId, student_id: req.user.id, title, description, status: 'Pending' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get complaints (students get their own, admins get all)
router.get('/', protect, async (req, res) => {
  try {
    let query, params;
    
    if (req.user.role === 'admin') {
      query = 'SELECT c.*, u.name as student_name, u.email as student_email FROM complaints c JOIN users u ON c.student_id = u.id ORDER BY c.created_at DESC';
      params = [];
    } else {
      query = 'SELECT * FROM complaints WHERE student_id = ? ORDER BY created_at DESC';
      params = [req.user.id];
    }

    const [complaints] = await db.query(query, params);
    
    res.json(complaints);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update Complaint (Admins or Student Owner)
router.put('/:id', protect, async (req, res) => {
  const { title, description, status } = req.body;
  const { id } = req.params;

  try {
    const [existing] = await db.query('SELECT * FROM complaints WHERE id = ?', [id]);
    if (existing.length === 0) return res.status(404).json({ message: 'Complaint not found' });
    
    // Check ownership vs Admin
    if (req.user.role !== 'admin' && existing[0].student_id !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized to edit this complaint' });
    }

    // Only admin can successfully change Status
    const newStatus = (req.user.role === 'admin' && status) ? status : existing[0].status;

    if (req.user.role === 'admin' && status && !['Pending', 'In Progress', 'Resolved'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status' });
    }

    await db.query('UPDATE complaints SET title = ?, description = ?, status = ? WHERE id = ?', [title, description, newStatus, id]);
    res.json({ message: 'Complaint updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Admin: Delete Complaint
router.delete('/:id', protect, adminOnly, async (req, res) => {
  const { id } = req.params;

  try {
    await db.query('DELETE FROM complaints WHERE id = ?', [id]);
    res.json({ message: 'Complaint deleted' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
