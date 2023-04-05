import express from "express";
import {
  getFeedPosts,
  getUserPosts,
  likePost,
  getPost,
  addComment,
} from "../controllers/posts.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

// read
router.get("/", verifyToken, getFeedPosts);
router.get("/:userId/posts", verifyToken, getUserPosts);
router.get("/:postId", getPost);

// update
router.patch("/:id/like", verifyToken, likePost);
router.patch("/addcomment/:postId", addComment);

export default router;
