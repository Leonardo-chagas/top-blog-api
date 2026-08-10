import type { Request, Response } from "express";
import {prisma} from '../../lib/prisma.js';

export async function getCategories(req:Request, res:Response){
    res.header("Access-Control-Allow-Origin", "*");
    const categories = await prisma.categories.findMany({
    });
    const json = JSON.stringify(categories);
    res.json(json);
}

export async function getCategoryById(req:Request, res:Response){
    res.header("Access-Control-Allow-Origin", "*");
    const id = `${req.params.categoryId}`;
    const category = await prisma.categories.findUnique({
        where:{id: parseInt(id)}
    });
    const json = JSON.stringify(category);
    res.json(json);
}

export async function getCategoryByName(req:Request, res:Response){
    res.header("Access-Control-Allow-Origin", "*");
    const name = `${req.params.category}`;
    const category = await prisma.categories.findUnique({
        where: {category: name}
    });
    const json = JSON.stringify(category);
    res.json(json);
}

export async function postCategory(req:Request, res:Response){
    res.header("Access-Control-Allow-Origin", "*");
    if(!req.user?.isAuthor) return res.status(403).json({message: 'Client lacks access rights to this content'});
    const categoryName = req.body.category;

    const category = await prisma.categories.create({
        data: {
            category: categoryName
        }
    })

    const json = JSON.stringify(category);
    res.json(json);
}

export async function putCategory(req:Request, res:Response){
    res.header("Access-Control-Allow-Origin", "*");
    if(!req.user?.isAuthor) return res.status(403).json({message: 'Client lacks access rights to this content'});
    const categoryName = req.body.category;
    const id = `${req.params.categoryId}`;

    const category = await prisma.categories.update({
        where: {id: parseInt(id)},
        data: {category: categoryName}
    });
    const json = JSON.stringify(category);
    res.json(json);
}

export async function deleteCategory(req:Request, res:Response){
    res.header("Access-Control-Allow-Origin", "*");
    if(!req.user?.isAuthor) return res.status(403).json({message: 'Client lacks access rights to this content'});
    const id = `${req.params.categoryId}`;
    const category = await prisma.categories.delete({
        where: {id: parseInt(id)}
    });
    const json = JSON.stringify(category);
    res.json(json);
}