import { Router } from "express";
import PostRouter from "./post.js";
import AuthorRouter from "./author.js";
import CategoryRouter from "./category.js";
import { authorize } from "../middleware/auth.js";

const router = Router();

router.use("/posts", PostRouter);
router.use("/categories", CategoryRouter);
router.use("/authors", AuthorRouter);
router.get("/verify-token", authorize, (req, res) => {
  res.status(200).send();
});

export default router;
