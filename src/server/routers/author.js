import { Router } from "express";
import {
  createAuthor,
  deleteAuthor,
  getAuthors,
  updateAuthor,
  authorLogin,
} from "../controllers/author.js";
import { authorize, checkToken } from "../middleware/auth.js";

const authorRouter = Router();

authorRouter.post(
  "/",
  // authorize,
  createAuthor
);
authorRouter.post("/login", authorLogin);
authorRouter.get("/", checkToken, getAuthors);
authorRouter.patch("/:id", authorize, updateAuthor);
authorRouter.delete("/:id", authorize, deleteAuthor);

export default authorRouter;
