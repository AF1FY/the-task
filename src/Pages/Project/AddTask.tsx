import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Loader2, Save } from 'lucide-react';
import { getProjectsAsync, type Project } from '../../actions/Project';
import { taskSchema, type TaskFormValues } from '../../validators/formValidation';
import { addTaskAsync } from '../../actions/Task';

const AddTask: React.FC = () => {
    const navigate = useNavigate();
    const { id: routeProjectId } = useParams();
    const queryClient = useQueryClient();

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm<TaskFormValues>({
        resolver: zodResolver(taskSchema),
        defaultValues: {
            status: 'To Do',
            projectId: routeProjectId,
        },
    });

    const { data: projects, isLoading: isLoadingProjects } = useQuery({
        queryKey: ['projects'],
        queryFn: getProjectsAsync,
    });

    useEffect(() => {
        if (routeProjectId) {
            setValue('projectId', routeProjectId);
        }
    }, [routeProjectId, setValue]);

    const mutation = useMutation({
        mutationFn: addTaskAsync,
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ['project', routeProjectId ?? ''] });

            navigate(`/project/${data.projectId}`);
        },
        onError: (error) => {
            console.error("Failed to add task:", error);
        }
    });

    const onSubmit = (data: TaskFormValues) => {
        mutation.mutate({
            ...data,
        });
    };

    return (
        <div className="min-h-screen bg-white-athens-gray dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
            <div className="max-w-lg w-full space-y-8 bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl border border-athens-gray dark:border-gray-700">

                {/* Header */}
                <div className="flex items-center gap-4 mb-6">
                    <button
                        type="button"
                        onClick={() => navigate(-1)}
                        className="p-2 rounded-lg hover:bg-athens-gray dark:hover:bg-gray-700 text-pale-sky transition-colors cursor-pointer"
                    >
                        <ArrowLeft size={20} />
                    </button>
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Add New Task</h2>
                        <p className="text-sm text-pale-sky mt-1">Create a card for your workflow</p>
                    </div>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">

                    {/* Title */}
                    <div className="space-y-1.5">
                        <label className="block text-sm font-medium text-pale-sky dark:text-gray-300">
                            Task Title
                        </label>
                        <input
                            type="text"
                            placeholder="e.g. Fix Navigation Bug"
                            {...register('title')}
                            className={`w-full px-4 py-3 rounded-xl border outline-none transition-all duration-200 bg-porcelain dark:bg-gray-900 dark:text-white placeholder:text-gray-400 focus:ring-2 focus:ring-dodger-blue/20 ${errors.title ? 'border-red-500' : 'border-lavender-gray dark:border-gray-600 focus:border-dodger-blue'}`}
                        />
                        {errors.title && <p className="text-red-500 text-xs font-medium">{errors.title.message}</p>}
                    </div>

                    {/* Description */}
                    <div className="space-y-1.5">
                        <label className="block text-sm font-medium text-pale-sky dark:text-gray-300">
                            Description
                        </label>
                        <textarea
                            rows={3}
                            placeholder="Details about the task..."
                            {...register('description')}
                            className={`w-full px-4 py-3 rounded-xl border outline-none transition-all duration-200 resize-none bg-porcelain dark:bg-gray-900 dark:text-white placeholder:text-gray-400 focus:ring-2 focus:ring-dodger-blue/20 ${errors.description ? 'border-red-500' : 'border-lavender-gray dark:border-gray-600 focus:border-dodger-blue'}`}
                        />
                        {errors.description && <p className="text-red-500 text-xs font-medium">{errors.description.message}</p>}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        {/* Project Select */}
                        <div className="space-y-1.5">
                            <label className="block text-sm font-medium text-pale-sky dark:text-gray-300">
                                Project
                            </label>
                            <div className="relative">
                                <select
                                    {...register('projectId')}
                                    disabled={isLoadingProjects}
                                    className={`w-full px-4 py-3 rounded-xl border outline-none appearance-none bg-porcelain dark:bg-gray-900 dark:text-white transition-all duration-200 focus:ring-2 focus:ring-dodger-blue/20 ${errors.projectId ? 'border-red-500' : 'border-lavender-gray dark:border-gray-600 focus:border-dodger-blue'}`}
                                >
                                    <option value="">Select a Project...</option>
                                    {projects?.map((project: Project) => (
                                        <option key={project.id} value={project.id}>
                                            {project.title}
                                        </option>
                                    ))}
                                </select>
                                {/* Arrow Icon */}
                                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-500">
                                    {isLoadingProjects ? <Loader2 size={16} className="animate-spin" /> : (
                                        <svg className="h-4 w-4 fill-current" viewBox="0 0 20 20"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" /></svg>
                                    )}
                                </div>
                            </div>
                            {errors.projectId && <p className="text-red-500 text-xs font-medium">{errors.projectId.message}</p>}
                        </div>

                        {/* Status Select */}
                        <div className="space-y-1.5">
                            <label className="block text-sm font-medium text-pale-sky dark:text-gray-300">
                                Status
                            </label>
                            <div className="relative">
                                <select
                                    {...register('status')}
                                    className="w-full px-4 py-3 rounded-xl border border-lavender-gray dark:border-gray-600 bg-porcelain dark:bg-gray-900 dark:text-white outline-none appearance-none focus:border-dodger-blue focus:ring-2 focus:ring-dodger-blue/20 transition-all duration-200"
                                >
                                    <option value="To Do">To Do</option>
                                    <option value="In Progress">In Progress</option>
                                    <option value="Done">Done</option>
                                </select>
                                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-500">
                                    <svg className="h-4 w-4 fill-current" viewBox="0 0 20 20"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" /></svg>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={mutation.isPending}
                        className="w-full mt-4 flex justify-center items-center gap-2 py-3.5 px-4 border border-transparent rounded-xl shadow-sm text-sm font-bold text-white bg-dodger-blue hover:bg-royale-blue focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-dodger-blue transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed transform active:scale-[0.98] cursor-pointer"
                    >
                        {mutation.isPending ? (
                            <>
                                <Loader2 size={18} className="animate-spin" />
                                <span>Saving...</span>
                            </>
                        ) : (
                            <>
                                <Save size={18} />
                                <span>Save Task</span>
                            </>
                        )}
                    </button>

                </form>
            </div>
        </div>
    );
};

export default AddTask;