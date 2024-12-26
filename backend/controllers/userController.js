import User from "../models/userModel.js";

export const getUserById = async (req, res) => {
	try {
		const user = await User.findById(req.params.id);

		if (!user) {
			return res.status(404).json({ message: "User not found" });
		}

		res.status(200).json(user);
	} catch (error) {
		res.status(500).json({ message: "Failed to fetch user", error });
	}
};

export const getAllUsers = async (req, res) => {
	try {
		const users = await User.find();
		res.status(200).json(users);
	} catch (error) {
		res.status(500).json({ message: "Failed to fetch users", error });
	}
};

export const deleteUser = async (req, res) => {
	try {
		const user = await User.findById(req.params.id);
		if (!user) {
			return res.status(404).json({ message: "User not found" });
		}
		await User.findByIdAndDelete(req.params.id);
		res.status(200).json({ message: "User deleted successfully" });
	} catch (error) {
		res.status(500).json({ message: "Failed to delete user", error });
	}
};

export const toggleBanUser = async (req, res) => {
	try {
		const user = await User.findById(req.params.id);
		if (!user) {
			return res.status(404).json({ message: "User not found" });
		}
		user.isBanned = !user.isBanned;
		await user.save();
		res.status(200).json({ message: "User banned status updated" });
	} catch (error) {
		res.status(500).json({ message: "Failed to ban user", error });
	}
};

export const searchUsers = async (req, res) => {
	try {
		const { query } = req.body;

		if (!query) {
			return res
				.status(400)
				.json({ message: "Search query is required" });
		}

		const users = await User.find({
			$or: [
				{ name: { $regex: query, $options: "i" } },
				{ email: { $regex: query, $options: "i" } },
			],
		});

		if (users.length === 0) {
			return res.status(404).json({ message: "No users found" });
		}

		res.status(200).json(users);
	} catch (error) {
		res.status(500).json({ message: "Failed to search users", error });
	}
};
