import { Router } from "express";
import {
  createPost,
  getPosts,
  updatePost,
  deletePost,
  publishPost,
} from "../controllers/post.js";
import { authorize, checkToken } from "../middleware/auth.js";

const postRouter = Router();

postRouter.post("/", authorize, createPost);
postRouter.get("/", checkToken, getPosts);
postRouter.patch("/", authorize, publishPost);
postRouter.patch("/:id", authorize, updatePost);
postRouter.delete("/:id", authorize, deletePost);

export default postRouter;
