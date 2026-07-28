import type { Request, Response } from "express";
import {prisma} from '../../lib/prisma.js';

export async function getPosts(req:Request, res:Response){
    const posts = await prisma.posts.findMany({
        //relationLoadStrategy: "join", // or 'query'
    include: {
        category: true,
    },
    });
    const json = JSON.stringify(posts);
    res.json(json);
}

export async function getPostById(req:Request, res:Response){
    const id = `${req.params.postId}`;
    const post = await prisma.posts.findUnique({
        where: {id: parseInt(id)},
        include: {
            category: true
        }
    });
    const json = JSON.stringify(post);
    res.json(json);
}

export async function getPostsByCategory(req:Request, res:Response){
    const id = `${req.params.categoryId}`;
    const posts = await prisma.posts.findMany({
        where: {categoryId: parseInt(id)},
        include: {
            category: true
        }
    });
    const json = JSON.stringify(posts);
    res.json(json);
}

export async function postPost(req:Request, res:Response){
    if(!req.user?.isAuthor) return res.status(403).json({message: 'Client lacks access rights to this content'});
    const {title, text, categoryId} = req.body;
    const post = await prisma.posts.create({
        data: {
            title: title,
            text: text,
            category: {connect: {id: categoryId}}
        }
    });

    const json = JSON.stringify(post);
    res.json(json);
}

export async function putPost(req:Request, res:Response){
    if(!req.user?.isAuthor) return res.status(403).json({message: 'Client lacks access rights to this content'});
    const id = `${req.params.postId}`;
    const {title, text} = req.body;
    const post = await prisma.posts.update({
        where: {id: parseInt(id)},
        data: {
            title: title,
            text: text
        }
    });

    const json = JSON.stringify(post);
    res.json(json);
}

export async function deletePost(req:Request, res:Response){
    if(!req.user?.isAuthor) return res.status(403).json({message: 'Client lacks access rights to this content'});
    const id = `${req.params.postId}`;
    const post = await prisma.posts.delete({
        where: {id: parseInt(id)}
    });
    const json = JSON.stringify(post);
    res.json(json);
}