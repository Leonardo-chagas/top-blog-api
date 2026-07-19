import { Router } from "express";
import { getCategories, getCategoryById, getCategoryByName, postCategory, putCategory, deleteCategory } from "../controllers/categoriesController.js";

const categoriesRouter = Router();

categoriesRouter.get('/', getCategories);

categoriesRouter.get('/:categoryId', getCategoryById);

categoriesRouter.get('/name/:category', getCategoryByName);

categoriesRouter.post('/', postCategory);

categoriesRouter.put('/:categoryId', putCategory);

categoriesRouter.delete('/:categoryId', deleteCategory);

export default categoriesRouter;