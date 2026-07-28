import { Router } from "express";
import { getCategories, getCategoryById, getCategoryByName, postCategory, putCategory, deleteCategory } from "../controllers/categoriesController.js";
import passport from '../strategies/jwt.js';

const categoriesRouter = Router();

categoriesRouter.get('/', getCategories);

categoriesRouter.get('/:categoryId', getCategoryById);

categoriesRouter.get('/name/:category', getCategoryByName);

categoriesRouter.post('/', passport.authenticate('jwt', {session: false}), postCategory);

categoriesRouter.put('/:categoryId', passport.authenticate('jwt', {session: false}), putCategory);

categoriesRouter.delete('/:categoryId', passport.authenticate('jwt', {session: false}), deleteCategory);

export default categoriesRouter;