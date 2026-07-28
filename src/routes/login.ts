import { Router } from "express";
import type { Request, Response } from "express";
import {prisma} from '../../lib/prisma.js';
import jwt from "jsonwebtoken";
import bcrypt from 'bcrypt';

const loginRouter = Router();

loginRouter.post('/', async (req: Request, res: Response) => {
    const {username, password} = req.body;
    const user = await prisma.users.findUnique({
        where: {username: username}
    })
    if(user){
        const match = await bcrypt.compare(password, user.password);
        if(match){
            const opts = {expiresIn: 1800};
            const secret = process.env.SECRET_KEY || 'fallback';
            const token = jwt.sign({username}, secret, opts)
            console.log(token);
            return res.status(200).json({
                message: 'Auth passed',
                token
            })
        }
    }
    return res.status(401).json({
        message: 'Auth failed'
    })
})

export default loginRouter;