import { Router } from "express";
import type { Request, Response } from "express";
import {prisma} from '../../lib/prisma.js';
import jwt from "jsonwebtoken";
import type { VerifyErrors, JwtPayload } from "jsonwebtoken";

const refreshRouter = Router();

refreshRouter.get('/', async (req: Request, res: Response) => {
    if(req.cookies?.token){
        const {username} = req.body;
        const user = await prisma.users.findUnique({
                where: {username: username}
            })
        const refreshToken = req.cookies.token;
        const secret = process.env.SECRET_KEY || 'fallback';

        jwt.verify(refreshToken, secret, (error:VerifyErrors | null, decoded:JwtPayload | string | undefined) => {
            if(error){
                return res.status(406).json({message: 'Unauthorized'})
            }
            else{
                const opts = {expiresIn: 1800};
                const token = jwt.sign({username}, secret, opts)

                return res.status(200).json({
                message: 'Auth passed',
                token,
                userId: user.id
            })
            }
        })
    }
    else{
        return res.status(406).json({message: 'Unauthorized'})
    }
})

export default refreshRouter;