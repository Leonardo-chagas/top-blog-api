import type { Request, Response } from "express";
import {prisma} from '../../lib/prisma.js';
import bcrypt from 'bcrypt';

export async function getUsers(req:Request, res:Response) {
    const users = await prisma.users.findMany();
    const json = JSON.stringify(users);
    res.json(json);
}

export async function getUserById(req:Request, res:Response) {
    const id = `${req.params.userId}`;
    const user = await prisma.users.findUnique({
        where:{id: parseInt(id)}
    });
    const json = JSON.stringify(user);
    res.json(json);
}

export async function postUser(req:Request, res:Response) {
    const {username, password} = req.body;
    
    if(typeof username === 'string' && typeof password === 'string'){
        console.log('passou')
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await prisma.users.create({
            data: {
                username: username,
                password: hashedPassword
            }
        })
        const json = JSON.stringify(user);
        res.json(json);
    }
    //lidar com tipo do query
    return "this is an error";
}

export async function deleteUser(req:Request, res:Response) {
    const id = `${req.params.userId}`;
    const user = await prisma.users.delete({
        where: {id: parseInt(id)}
    });
    const json = JSON.stringify(user);
    res.json(json);
}