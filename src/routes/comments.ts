import { Router } from "express";
import { getComments, getCommentsFromPost, postComment, putComment, deleteComment } from "../controllers/commentsController.js";

const commentsRouter = Router();

commentsRouter.get('/', getComments);

commentsRouter.get('/:postId', getCommentsFromPost);

commentsRouter.post('/:postId/:userId', postComment);

commentsRouter.put('/:commentId', putComment);

commentsRouter.delete('/:commentId', deleteComment);

export default commentsRouter;