import { z } from 'zod';

export const taskSchema = z.object({
    title: z.string()
        .min(3, { message: "Task title must be at least 3 characters" })
        .max(50, { message: "Title is too long" }),
    description: z.string()
        .min(5, { message: "Description must be at least 5 characters" })
        .max(200, { message: "Description is too long" }),
    projectId: z.string().min(1, { message: "Please select a project" }),
    status: z.enum(['To Do', 'In Progress', 'Done']),
});

export type TaskFormValues = z.infer<typeof taskSchema>;