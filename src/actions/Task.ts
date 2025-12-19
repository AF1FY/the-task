import axios from "axios"
import type { TaskFormValues } from "../validators/formValidation"
const BASE_URL = 'https://694153a4686bc3ca816692cc.mockapi.io/api/dashboard';

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