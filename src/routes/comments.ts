import { Router } from "express";
import { getComments, getCommentsFromPost, postComment, putComment, deleteComment } from "../controllers/commentsController.js";
import passport from '../strategies/jwt.js';

const commentsRouter = Router();

commentsRouter.get('/', getComments);

commentsRouter.get('/:postId', getCommentsFromPost);

commentsRouter.post('/:postId/:userId', passport.authenticate('jwt', {session: false}), postComment);

commentsRouter.put('/:commentId', passport.authenticate('jwt', {session: false}), putComment);

commentsRouter.delete('/:commentId', passport.authenticate('jwt', {session: false}), deleteComment);

export default commentsRouter;