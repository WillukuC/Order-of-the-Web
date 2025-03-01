import express from 'express';
import {
    getIssues,
    getIssue,
    createIssue,
    updateIssue,
    deleteIssue,
} from './IssueController.js';

const router = express.Router();

// Routes for Issues
router.get('/', getIssues); // Get all issues
router.get('/:volume/#/:issueNumber', getIssue); // Get a specific issue number from a specific volume
router.post('/', createIssue); // Create a new issue
router.put('/:id', updateIssue); // Update an issue
router.delete('/:id', deleteIssue); // Delete an issue

export default router;