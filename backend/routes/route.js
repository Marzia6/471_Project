import express from "express";
import { signup, login, profile, updateProfile } from "../controllers/All.js";
import { authenticateToken } from "../config/middlewares.js";
import Question from "../models/questionModel.js";
import TrainingModule from "../models/Training.js";
import User from "../models/userModel.js";
import { body } from "express-validator";
import {
  getUserById,
  deleteUser,
  toggleBanUser,
  getAllUsers,
  searchUsers,
} from "../controllers/userController.js";
import {
  addNewGroup,
  deleteGroup,
  editGroup,
  getAllGroups,
} from "../controllers/groupController.js";
import {
  addNewPost,
  fetchPosts,
  addUpvote,
  deletePost,
} from "../controllers/postController.js";
import {
  addNewComment,
  deleteComment,
  getCommentsByPostId,
} from "../controllers/commentController.js";
import {
  addNewReport,
  deletePostByReportId,
  deleteReportById,
  getAllReports,
  searchReports,
} from "../controllers/ReportController.js";
import { getAnalytics } from "../controllers/analyticsController.js";
import {
  sendMsg,
  getMessages,
  deleteMsg,
  updateMsg,
} from "../controllers/chatController.js";
const router = express.Router();

const profileValidation = [
  body("email").isEmail().normalizeEmail(),
  body("username").optional().trim().isLength({ min: 3 }),
  body("newPassword").optional().isLength({ min: 6 }),
];

const calculateScore = async (answers) => {
  const questions = await Question.find().lean();
  let correctCount = 0;
  console.log(questions, answers);
  Object.entries(answers).forEach(([index, answer]) => {
    if (questions[index].correct === answer) {
      correctCount++;
    }
  });

  return (correctCount / Object.keys(answers).length) * 100;
};

router.post("/api/register", signup);
router.post("/login", login);
router.get("/profile", authenticateToken, profile);
router.put("/profile", authenticateToken, profileValidation, updateProfile);

router.get("/api/qualification/test", async (req, res) => {
  try {
    const questions = await Question.aggregate([{ $sample: { size: 20 } }]);
    const formattedQuestions = questions.map((q) => ({
      ...q,
      options: [...q.option1, ...q.option2, ...q.option3, ...q.option4].filter(
        Boolean
      ),
    }));
    res.json(formattedQuestions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post("/api/qualification/submit", async (req, res) => {
  try {
    console.log("Received request to submit answers");
    const { userId, answers } = req.body;
    const score = await calculateScore(answers);

    const user = await User.findById(userId);
    user.trainingProgress.lastTestScore = score;
    user.trainingProgress.testAttempts += 1;

    if (score >= 75) {
      // percentage threshold for passing
      user.role = "companion";
    }

    await user.save();
    res.json({ score, passed: score >= 80 });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
router.get("/api/training/modules", async (req, res) => {
  try {
    // console.log("Fetching modules");
    const modules = await TrainingModule.find().sort({ order: 1 });
    // console.log("Modules fetched:", modules);
    res.json(modules);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/api/user/:id", getUserById);
router.delete("/api/user/:id", deleteUser);
router.put("/api/user/:id", toggleBanUser);
router.get("/api/users", getAllUsers);
router.post("/api/searchUsers", searchUsers);

router.post("/api/group", addNewGroup);
router.put("/api/group", editGroup);
router.delete("/api/group/:id", deleteGroup);
router.get("/api/groups", getAllGroups);

router.post("/api/post", addNewPost);
router.post("/api/getPosts", fetchPosts);
router.post("/api/post/upvote", addUpvote);
router.delete("/api/post", deletePost);

router.post("/api/comment", addNewComment);
router.delete("/api/comment", deleteComment);
router.post("/api/getComments", getCommentsByPostId);

router.post("/api/report", addNewReport);
router.delete("/api/report/:reportId", deleteReportById);
router.delete("/api/report/:reportId/post", deletePostByReportId);
router.get("/api/reports", getAllReports);
router.post("/api/searchReports", searchReports);

router.get("/api/analytics", getAnalytics);

router.post("/sendmsg/:uid/:id", sendMsg);
router.get("/getmessages/:uid/:id", getMessages);
router.delete("/deletemsg", deleteMsg);
router.put("/updatemsg", updateMsg);

export default router;
