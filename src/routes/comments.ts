import { Router } from "express";
import { getComments, postComment, putComment, deleteComment } from "../controllers/commentsController";

const commentsRouter = Router();

commentsRouter.get('/:postId', getComments);

commentsRouter.post('/:postId/:userId', postComment);

commentsRouter.put('/:commentId', putComment);

commentsRouter.delete('/:commentId', deleteComment);

export default commentsRouter;