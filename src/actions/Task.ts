import axios from "axios"
import type { TaskFormValues } from "../validators/formValidation"
import { BASE_URL } from "./Project"

export interface Task {
    id: string
    projectId: string
    title: string
    description: string
    status: "To Do" | 'In Progress' | 'Done'
}

export async function getTasksAsync(): Promise<Task[] | null> {
    try {
        return await axios.get(`${BASE_URL}/task`).then(res => res.data);
    } catch (e: any) {
        console.log("Getting task error : ", e);
        return null;
    }
}

export async function addTaskAsync(data: TaskFormValues) {
    const response = await fetch(`${BASE_URL}/task`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    });

    if (!response.ok) {
        throw new Error('Failed to add project');
    }
    return response.json();
}

export async function deleteTaskAsync(id: string) {
    try {
        const res = await axios.delete(`${BASE_URL}/task/${id}`);
        if (res.data)
            return true;
        return false
    } catch (e: any) {
        return false;
    }
}

export async function updateTaskAsync(id: string, data: TaskFormValues) {
    try {
        const res = await fetch(`${BASE_URL}/task/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });
        if (res.ok)
            return true;
        return false
    } catch (e: any) {
        throw new Error("Error updating task");
    }
}