import { RequestHandler } from "express";
import ProjectModel from "../models/projectModel"
import createHttpError from "http-errors";
import mongoose from "mongoose";

interface ProjectBody {
    title?: string,
    deploy_link?: string,
    thumbnail_link?: string,
    description?: string,
    badges?: Array<string>,
    github_link?: string,
}

export const createProject: RequestHandler<unknown, unknown, ProjectBody, unknown> = async (req, res, next) => {
    const title = req.body.title;
    const description = req.body.description;
    const badges = req.body.badges;
    const deployLink = req.body.deploy_link;
    const thumbnailLink = req.body.thumbnail_link;
    const githubLink = req.body.github_link;

    try {
        if (!title || !description || !badges) {
            throw createHttpError(400, "Project must have title, description and badges");
        }

        const newProject = await ProjectModel.create({
            title: title,
            description: description,
            badges: badges,
            deploy_link: deployLink,
            thumbnail_link: thumbnailLink,
            github_link: githubLink,
        });

        res.status(201).json(newProject);
    } catch (error) {
        next(error);
    }
}

export const readProjects: RequestHandler = async (req, res, next) => {
    try {
        const projects = await ProjectModel.find().exec();
        res.status(200).json(projects);
    } catch (error) {
        next(error);
    }
}

export const readProject: RequestHandler = async (req, res, next) => {
    const projectId = req.params.id;

    try {
        if (!mongoose.isValidObjectId(projectId)) {
            throw createHttpError(400, "Invalid project id")
        }

        const project = await ProjectModel.findById(projectId).exec();

        if (!project) {
            throw createHttpError(404, "Project not found")
        }

        res.status(200).json(project);
    } catch (error) {
        next(error);
    }
}

interface UpdateParams {
    id: string,
}

export const updateProject: RequestHandler<UpdateParams, unknown, ProjectBody, unknown> = async (req, res, next) => {
    const projectId = req.params.id;
    const title = req.body.title;
    const description = req.body.description;
    const badges = req.body.badges;
    const deployLink = req.body.deploy_link;
    const thumbnailLink = req.body.thumbnail_link;
    const githubLink = req.body.github_link;

    try {
        if (!mongoose.isValidObjectId(projectId)) {
            throw createHttpError(400, "Invalid project id")
        }

        if (!title || !description || !badges) {
            throw createHttpError(400, "Project must have title, description and badges");
        }

        const project = await ProjectModel.findById(projectId).exec();

        if (!project) {
            throw createHttpError(404, "Project not found")
        }

        project.title = title;
        project.description = description;
        project.badges = badges;
        project.deploy_link = deployLink;
        project.thumbnail_link = thumbnailLink;
        project.github_link = githubLink;

        const updatedProject = await project.save();

        res.status(200).json(updatedProject);
    } catch (error) {
        next(error);
    }
}

export const deleteProject: RequestHandler = async (req, res, next) => {
    const projectId = req.params.id;

    try {
        if (!mongoose.isValidObjectId(projectId)) {
            throw createHttpError(400, "Invalid project id")
        }

        const project = await ProjectModel.findById(projectId).exec();

        if (!project) {
            throw createHttpError(404, "Project not found")
        }

        await project.deleteOne();

        res.sendStatus(204);
    } catch (error) {
        next(error);
    }
}