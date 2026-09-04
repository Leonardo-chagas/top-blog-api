import type { Response } from "express";
import jwt  from "jsonwebtoken";

export function setCookie(res: Response, username: string){
    const opts = {expiresIn: 7 * 24 * 60 * 60 * 1000};
    const secret = process.env.SECRET_KEY || 'fallback';
    const token = jwt.sign({username}, secret, opts)

    res.cookie('token', token, {
    path: '/',
    httpOnly: true,
    sameSite: 'strict',
    maxAge: 7 * 24 * 60 * 60 * 1000, // 1 week
    secure: true,
  });
}

export function removeCookie(res: Response){
  res.clearCookie('token', {
    path: '/',
    httpOnly: true,
    sameSite: 'strict',
    maxAge: 0,
    secure: true,
  })
}