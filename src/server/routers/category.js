import { Router } from "express";
import {
  createCategory,
  deleteCategory,
  getCategories,
  updateCategory,
} from "../controllers/category.js";
import { authorize, checkToken } from "../middleware/auth.js";

const categoryRouter = Router();

categoryRouter.post("/", authorize, createCategory);
categoryRouter.get("/", checkToken, getCategories);
categoryRouter.patch("/:id", authorize, updateCategory);
categoryRouter.delete("/:id", authorize, deleteCategory);

export default categoryRouter;
