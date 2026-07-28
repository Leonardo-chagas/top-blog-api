import { Router } from "express";
import { getPosts, getPostById, getPostsByCategory, postPost, putPost, deletePost } from "../controllers/postsController.js";
import passport from '../strategies/jwt.js';

const postsRouter = Router();

postsRouter.get('/', getPosts);

postsRouter.get('/:categoryId', getPostsByCategory);

postsRouter.get('/view/:postId', getPostById);

postsRouter.post('/', passport.authenticate('jwt', {session: false}), postPost);

postsRouter.put('/:postId', passport.authenticate('jwt', {session: false}), putPost);

postsRouter.delete('/:postId', passport.authenticate('jwt', {session: false}), deletePost);

export default postsRouter;