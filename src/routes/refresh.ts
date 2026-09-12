import { Router } from "express";
import type { Request, Response } from "express";
import {prisma} from '../../lib/prisma.js';
import jwt from "jsonwebtoken";
//import type { JwtPayload } from "@/strategies/jwt.js";
import type { VerifyErrors, JwtPayload } from "jsonwebtoken";

const refreshRouter = Router();

refreshRouter.get('/', (req: Request, res: Response) => {
    if(req.cookies?.token){
        
        const refreshToken = req.cookies.token;
        const secret = process.env.SECRET_KEY || 'fallback';

        jwt.verify(refreshToken, secret, (error:VerifyErrors | null, decoded:JwtPayload | string | undefined) => {
            if(error){
                console.log('verification error')
                return res.status(406).json({message: 'Unauthorized'})
            }
            else{
                const payload = decoded as JwtPayload;
                const username = payload.username
                const opts = {expiresIn: 1800};
                const token = jwt.sign({username}, secret, opts)
                const json = JSON.stringify({
                message: 'Auth passed',
                token
                })
                return res.status(200).json(json);
            }
        })
    }
    else{
        console.log('no token')
        return res.status(406).json({message: 'Unauthorized'})
    }
})

export default refreshRouter;