import mongoose from "mongoose";

const userSchema = mongoose.Schema(
	{
		name: {
			type: String,
			required: [true, "Please provide your Name"],
		},
		username: {
			type: String,
			required: [true, "Please provide your Username"],
		},
		email: {
			type: String,
			required: [true, "Please provide your Email Address"],
			unique: true,
		},
		password: {
			type: String,
			required: [true, "Please provide your Password"],
		},
		referral: {
			type: String,
			required: [true, "Please select how you found us"],
		},
		mentalCondition: {
			type: String,
			required: [true, "Please select your condition"],
		},
		ageGroup: {
			type: String,
			required: [true, "Please answer question 1"],
		},
		country: {
			type: String,
			required: [true, "Please answer question 2"],
		},
		goals: {
			type: String,
			required: [true, "Please answer question 3"],
		},
		preferences: {
			type: String,
			required: [true, "Please answer preferences"],
		},
		verified: {
			type: Boolean,
			default: false,
		},
		isCompanion: {
			type: Boolean,
			default: false,
		},
		forgotPasswordToken: String,
		forgotPasswordTokenExpiry: Date,
		verifyToken: String,
		verifyTokenExpiry: Date,
		userType: {
			type: String,
			required: true,
			enum: ["admin", "user", "companion"],
			default: "user",
		},
		createdAt: {
			type: Date,
			default: Date.now,
		},
		isBanned: {
			type: Boolean,
			default: false,
		},
	},
	{
		timestamps: true,
	}
);

const User = mongoose.model("User", userSchema);

export default User;
