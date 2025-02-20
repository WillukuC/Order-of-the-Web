import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const IssueSchema = new Schema({
    volume: { type: mongoose.Schema.Types.ObjectId, ref: 'Volume' },
    issueNumber: { type: Number, required: true },
    title: { type: String, required: true },
    storeDate: { type: Date },
    coverDate: { type: Date },
    coverImages: [{
        mainCover: { type: String, default: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Placeholder_view_vector.svg/800px-Placeholder_view_vector.svg.png" },
        thumbnail: { type: String, default: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Placeholder_view_vector.svg/800px-Placeholder_view_vector.svg.png" },
    }],
    pageCount: { type: Number },
    averageRating: { type: Number },
    timesRead: { type: Number },
    characters: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Character' }],
    creators: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Creator' }],
    events: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Event' }],
    groups: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Group' }],
    orders: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Order' }],
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],
});

IssueSchema.index({ volume: 1, issueNumber: 1 }, { unique: true });

const Issue = mongoose.model('Issue', IssueSchema);

export default Issue;