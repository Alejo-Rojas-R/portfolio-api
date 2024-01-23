import { InferSchemaType, model, Schema } from "mongoose";

const projectSchema = new Schema({
    title: { type: String, required: true },
    deploy_link: { type: String },
    thumbnail_link: { type: String },
    description: { type: String, required: true },
    badges: { type: Array, required: true },
    github_link: { type: String },
}, { timestamps: true });

type Project = InferSchemaType<typeof projectSchema>

export default model<Project>("Project", projectSchema)