import mongoose from 'mongoose';

const moduleSchema = new mongoose.Schema({
    title: String,
    content: String,
    resources: [String],
    order: Number,
    interactiveContent: [{
        type: String,
        content: String,
        expectedResponse: String
    }]
});

const TrainingModule = mongoose.model('TrainingModule', moduleSchema);

export default TrainingModule;