import { Router } from "express";
import { addCategories, getAllCategories, getOneCategory } from "../controllers/category.js";


const categoryRouter = Router();

// define routes
categoryRouter.post("/categories", addCategories);

categoryRouter.get("/categories", getAllCategories);

categoryRouter.get("/category/:id", getOneCategory);

export default categoryRouter;