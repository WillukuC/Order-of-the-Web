import mongoose from 'mongoose';
const { Schema } = mongoose.Schema;

const characterSchema = new Schema({
    name: { type: String, required: true },
    bio: {
        fullName: { type: String },
        universeOfOrigin: { type: String },
        currentAlias: { type: String, },
        aliases: [{ type: String }],
        groupAffiliations: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Group' }],
        characterPortraitLink: { type: String, default: 'https://upload.wikimedia.org/wikipedia/en/archive/b/b1/20210811082420%21Portrait_placeholder.png' },
    },
    issueData: {
        appearances: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Issue' }],
        firstAppearance: { type: mongoose.Schema.Types.ObjectId, ref: 'Issue' },
        appearanceTotal: { type: Number, default: 0 },
    },
});

characterSchema.pre('save', async function (next) {
    const character = this;
    const issues = await mongoose.model('Issue').find({ characters: character._id});
    character.issueData.appearances = issues.map(issue => issue._id);
    if (issues.length > 0) {
        const firstAppearance = issues.reduce((earliest, issue) => {
            return (!earliest || issue.releaseDate < earliest.releaseDate) ? issue : earliest;
        }, null);
        character.issueData.firstAppearance = firstAppearance._id;
    }
    character.issueData.appearanceTotal = issues.length;
    next();
})

characterSchema.statics.updateCharacterAppearances = async function (issueId) {
    const issue = await mongoose.model('Issue').findById(issueId).populate('characters');
    if (!issue) return;
    for (const character of issue.characters) {
        const characterDoc = await this.findById(character._id);
        if (characterDoc) {
            const issues = await mongoose.model('Issue').find({ characters: character._id });
            characterDoc.issueData.appearances = issues.map(issue => issue._id);
            characterDoc.issueData.appearanceTotal = issues.length;
            if (issues.length > 0) {
                const firstAppearance = issues.reduce((earliest, issue) => {
                    return (!earliest || issue.releaseDate < earliest.releaseDate) ? issue : earliest;
                }, null);
                characterDoc.issueData.firstAppearance = firstAppearance._id;
            }
            await characterDoc.save();
        }
    }
};

const Character = mongoose.model('Character', characterSchema);

export default Character;