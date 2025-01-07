import express from "express";
import { signup, login, profile, updateProfile } from "../controllers/All.js";
import { authenticateToken } from "../config/middlewares.js";
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

router.post("/sendmsg/:uid/:id", sendMsg);
router.get("/getmessages/:uid/:id", getMessages);
router.delete("/deletemsg", deleteMsg);
router.put("/updatemsg", updateMsg);

router.post("/signup", signup);
router.post("/login", login);
router.get("/profile", authenticateToken, profile);
router.put("/profile", authenticateToken, updateProfile);

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

export default router;
