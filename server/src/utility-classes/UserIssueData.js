const UserIssueDataSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    issue: { type: mongoose.Schema.Types.ObjectId, ref: 'Issue', required: true },
    rating: { type: Number, min: 1, max: 5 }, // Rating out of 5
    readStatus: { type: String, enum: ['unread', 'read'], default: 'unread' },
    lastUpdated: { type: Date, default: Date.now }
});

const UserIssueData = mongoose.model('UserIssueData', UserIssueDataSchema);