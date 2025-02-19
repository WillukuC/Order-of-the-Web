const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    savedOrders: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Order' }], // Orders the user is following
    readingProgress: [{
        order: { type: mongoose.Schema.Types.ObjectId, ref: 'Order' },
        currentIssue: { type: mongoose.Schema.Types.ObjectId, ref: 'Issue' },
        completed: { type: Boolean, default: false }
    }],
    reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Review' }], // User's reviews
    createdAt: { type: Date, default: Date.now }
});