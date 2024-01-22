import { RequestHandler } from "express";
import ProjectModel from "../models/projectModel"

export const readProjects: RequestHandler = async (req, res, next) => {
    try {
        const projects = await ProjectModel.find().exec();
        res.status(200).json(projects);
    } catch (error) {
        next(error);
    }
}

export const createProject: RequestHandler = async (req, res, next) => {
    try {
        const newProject = await ProjectModel.create({
            title: req.body.title,
            description: req.body.description,
            badges: req.body.badges,
            deploy_link: req.body.deploy_link,
            thumbnail_link: req.body.thumbnail,
            github_link: req.body.github_link,
        });

        res.status(201).json(newProject)
    } catch (error) {
        next(error);
    }
}