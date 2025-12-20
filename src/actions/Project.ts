import axios from "axios";
import { getTasksAsync, type Task } from "./Task";
import type { ProjectFormValues } from "../validators/formValidation";
export const BASE_URL = 'https://694153a4686bc3ca816692cc.mockapi.io/api/dashboard';

export interface Project {
    id: string;
    title: string;
    description: string;
    tasks?: Task[];
}

export async function getProjectsAsync(): Promise<Project[] | null> {
    try {
        const res = await axios.get(`${BASE_URL}/project`);
        if (res.data) {
            const projects = res.data as Project[];
            const tasks = await getTasksAsync();
            for (let i = 0; i < projects?.length; i++) {
                projects[i].tasks = tasks?.filter(t => t.projectId === projects[i].id);
            }
            return projects;
        }
        else
            return null;
    } catch (e: any) {
        return null
    }
}

export const addProjectAsync = async (data: ProjectFormValues) => {
    const response = await fetch(`${BASE_URL}/project`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    });

    if (!response.ok) {
        throw new Error('Failed to add project');
    }
    return response.json();
};

export async function getProjectByIdAsync(id?: string) {
    try {
        const res = await axios.get(`${BASE_URL}/project/${id}`);
        if (res.data) {
            const project = res.data as Project;
            const tasks = await getTasksAsync();
            project.tasks = tasks?.filter(t => t.projectId === project.id);
            return project;
        } else
            return null;
    } catch (e: any) {
        return null
    }
}