import type { Request, Response } from "express";
import {prisma} from '../../lib/prisma.js';

export async function getComments(req:Request, res:Response){
    const comments = await prisma.comments.findMany({
        include: {
            user: true,
            post: true
        }
    });
    const json = JSON.stringify(comments);
    res.json(json);
}

export async function getCommentsFromPost(req:Request, res:Response){
    const postId = `${req.params.postId}`;
    const comments = await prisma.comments.findMany({
        where: {postId: parseInt(postId)},
        include: {
            user: true,
        }
    });
    const json = JSON.stringify(comments);
    res.json(json);
}

export async function postComment(req:Request, res:Response){
    const userId = `${req.params.userId}`;
    const postId = `${req.params.postId}`;
    const {text, username} = req.body;

    const comment = await prisma.comments.create({
        data: {
            text: text,
            username: username,
            user: {connect: {id: parseInt(userId)}},
            post: {connect: {id: parseInt(postId)}}
        }
    });
    const json = JSON.stringify(comment);
    res.json(json);
}

export async function putComment(req:Request, res:Response){
    const id = `${req.params.commentId}`;
    const text = req.body.text;
    const comment = await prisma.comments.findUnique({
        where: {id: parseInt(id)}
    });
    if(comment.username != req.user?.username) return res.status(403).json({message: "This comment belongs to a different user, so it can't be edited"})
    const newComment = await prisma.comments.update({
        where: {id: parseInt(id)},
        data: {
            text: text
        }
    });
    const json = JSON.stringify(newComment);
    res.json(json);
}

export async function deleteComment(req:Request, res:Response){
    const id = `${req.params.commentId}`;
    const comment = await prisma.comments.findUnique({
        where: {id: parseInt(id)}
    });
    if(comment.username != req.user?.username) return res.status(403).json({message: "This comment belongs to a different user, so it can't be deleted"})
    const newComment = await prisma.comments.delete({
        where: {
            id: parseInt(id)
        }
    });
    const json = JSON.stringify(newComment);
    res.json(json);
}