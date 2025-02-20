import Issue from './IssueModel.js';

// Get all issues
export const getIssues = async (req, res) => {
    try {
        const issues = await Issue.find().populate('title');
        res.status(200).json(issues);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

// Get a single issue by ID
export const getIssue = async (req, res) => {
    const { id } = req.params;
    try {
        const issue = await Issue.findById(id).populate('title');
        if (!issue) return res.status(404).json({ message: 'Issue not found' });
        res.status(200).json(issue);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

// Create a new issue
export const createIssue = async (req, res) => {
    const issueData = req.body;
    try {
        const newIssue = new Issue(issueData);
        await newIssue.save();
        res.status(201).json(newIssue);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
};

// Update an issue
export const updateIssue = async (req, res) => {
    const { id } = req.params;
    const issueData = req.body;
    try {
        const updatedIssue = await Issue.findByIdAndUpdate(id, issueData, { new: true });
        if (!updatedIssue) return res.status(404).json({ message: 'Issue not found' });
        res.status(200).json(updatedIssue);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
};

// Delete an issue
export const deleteIssue = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedIssue = await Issue.findByIdAndDelete(id);
        if (!deletedIssue) return res.status(404).json({ message: 'Issue not found' });
        res.status(200).json({ message: 'Issue deleted successfully' });
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
};