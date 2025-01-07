import bcrypt from "bcrypt";
import User from "../models/userModel.js";
import jwt from "jsonwebtoken";

const JWT_SECRET = "soul";

export async function signup (req, res) {
    try {
        // console.log("Received request to sign up");
      const { name, email, password, profile } = req.body;
      const hashedPassword = await bcrypt.hash(password, 10);
      
      const user = new User({
        name,
        email,
        password: hashedPassword,
        role: 'member',
        profile
      });
      
      await user.save();
      console.log("user saved")
      const token = jwt.sign({ userId: user._id }, JWT_SECRET);
      res.json({ token, user: { ...user.toObject(), password: undefined } });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
export async function login(request, response) {
    try {
        const { email, password } = request.body;
        const user = await User.findOne({ email });
        if (!user) {
            return response.status(401).json({ message: "Invalid email or password." });
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return response.status(401).json({ message: "Invalid email or password." });
        }
        const token = jwt.sign(
            { userId: user._id, email: user.email, username: user.username },
            JWT_SECRET,
            { expiresIn: "2h" }
        );

        if (user.isBanned) {
			return res.status(400).json({ message: "You are banned" });
		}
        return response.status(200).json({
			message: "Login successful.",
			token,
			user,
		});
    } catch (error) {
        console.error("Error during login:", error);
        return response.status(500).json({ message: "Internal server error." });
    }
}

export const profile = async (req, res) => {
    try {
        const user = await User.findById(req.user.userId);
        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }
        res.json({ user });
    } catch (error) {
        res.status(500).json({ message: "Internal server error." });
    }
};


export const updateProfile = async (req, res) => {
    try {
        console.log("Received request to update profile");
        const { 
            name, 
            email, 
            password, 
            newPassword,
            profile
        } = req.body;
        
        const userId = req.user.userId;
        const user = await User.findById(userId);
        
        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }

        const emailTaken = await User.findOne({ email, _id: { $ne: userId } });
        if (emailTaken) {
            return res.status(400).json({ message: "Email already in use." });
        }

        if (newPassword) {
            const isPasswordValid = await bcrypt.compare(password, user.password);
            if (!isPasswordValid) {
                return res.status(401).json({ message: "Invalid current password." });
            }
            user.password = await bcrypt.hash(newPassword, 10);
        }

        user.name = name || user.name;
        user.email = email || user.email;
        user.profile = {
            ...user.profile,
            ...profile
        };

        await user.save();
        
        const userResponse = user.toObject();
        delete userResponse.password;

        res.status(200).json({ user: userResponse });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error." });
    }
};



