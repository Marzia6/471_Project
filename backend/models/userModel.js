import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['member', 'companion', 'trainee'], default: 'member' },
  profile: {
    gender: { type: String, required: true },
    genderPreference: { type: String, required: true },
    problemAreas: [String],
    language: [String],
    ageRange: { type: String, required: true },
    bio: String
  },
  trainingProgress: {
    modulesCompleted: { type: [String], default: [] },
    testAttempts: { type: Number, default: 0 },
    lastTestScore: { type: Number, default: 0 }
  },
  isBanned: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
  userType: {
    type: String,
    required: true,
    enum: ["admin", "user", "companion"],
    default: "user",},
});

const User = mongoose.model('User', userSchema);

export default User;
