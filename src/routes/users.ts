import { Router } from "express";
import {getUsers, getUserById, postUser, deleteUser} from "../controllers/usersController"

const usersRouter = Router();

usersRouter.get('/', getUsers);

usersRouter.get('/:userId', getUserById);

usersRouter.post('/', postUser);

usersRouter.delete('/:userId', deleteUser);

//module.exports = usersRouter;
export default usersRouter;