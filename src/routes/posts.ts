import { Router } from "express";
import { getPosts, getPostById, getPostsByCategory, postPost, putPost, deletePost } from "../controllers/postsController.js";

const postsRouter = Router();

postsRouter.get('/', getPosts);

postsRouter.get('/:categoryId', getPostsByCategory);

postsRouter.get('/view/:postId', getPostById);

postsRouter.post('/', postPost);

postsRouter.put('/:postId', putPost);

postsRouter.delete('/:postId', deletePost);

export default postsRouter;