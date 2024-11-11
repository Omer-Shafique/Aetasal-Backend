const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');

// Route to add label to a task
router.post('/task/label', taskController.addLabel);

// Route to get task details by ID
router.get('/task/:taskId', taskController.getTask);

module.exports = router;
