import { z, type TypeOf } from 'zod';

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

export const projectSchema = z.object({
    title: z.string()
        .min(3, 'Title must be at least 3 characters long')
        .max(25, 'Title must be at most 25 characters long'),
    description: z.string()
        .min(10, 'Description must be at least 10 characters long')
        .max(70, 'Description must be at most 70 characters long'),
});

export const searchSchema = z.object({
    search: z.string().optional(),
})

export type SearchForm = z.infer<typeof searchSchema>;
export type TaskFormValues = z.infer<typeof taskSchema>;
export type ProjectFormValues = z.infer<typeof projectSchema>;