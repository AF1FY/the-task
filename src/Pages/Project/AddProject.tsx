import React from 'react';
import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Plus, Loader2 } from 'lucide-react';
import { projectSchema, type ProjectFormValues } from '../../validators/formValidation';
import { zodResolver } from '@hookform/resolvers/zod';
import { addProjectAsync } from '../../actions/Project';

const AddProject: React.FC = () => {
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<ProjectFormValues>({
        resolver: zodResolver(projectSchema),
    });

    const mutation = useMutation({
        mutationFn: addProjectAsync,
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ['projects'] }); //! refresh
            navigate('/');
        },
    });

    const addProject = (data: ProjectFormValues) => {
        mutation.mutate(data); // addProjectAsync(data)
    };

    return (
        <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
            <div className="max-w-md w-full space-y-8  p-8 rounded-2xl shadow-xl border border-athens-gray dark:border-gray-700">

                {/* Header */}
                <div className="flex items-center gap-4 mb-8">
                    <button
                        onClick={() => navigate(-1)}
                        className="p-2 rounded-lg hover:bg-athens-gray cursor-pointer dark:hover:bg-gray-700 text-pale-sky transition-colors"
                    >
                        <ArrowLeft size={20} />
                    </button>
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Create New Project</h2>
                        <p className="text-sm text-pale-sky mt-1">Add a new board to track your tasks</p>
                    </div>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit(addProject)} className="space-y-6">

                    {/* Title Input */}
                    <div className="space-y-2">
                        <label htmlFor="title" className="block text-sm font-medium text-pale-sky dark:text-gray-300">
                            Project Title
                        </label>
                        <div className="relative">
                            <input
                                id="title"
                                type="text"
                                placeholder="e.g. Website Redesign"
                                {...register('title')}
                                className={`
                w-full px-4 py-3 rounded-xl border outline-none transition-all duration-200 resize-none
                bg-porcelain placeholder:text-pale-sky focus:ring-2 focus:ring-dodger-blue/60 focus:border-porcelain
                  ${errors.title
                                        ? 'border-red-500 focus:border-red-500'
                                        : 'border-lavender-gray dark:border-gray-600 focus:border-dodger-blue'
                                    }
                `}
                            />
                        </div>
                        {errors.title && (
                            <p className="text-red-500 text-xs mt-1 font-medium animate-pulse">
                                {errors.title.message}
                            </p>
                        )}
                    </div>

                    {/* Description Input */}
                    <div className="space-y-2">
                        <label htmlFor="description" className="block text-sm font-medium text-pale-sky dark:text-gray-300">
                            Description
                        </label>
                        <textarea
                            id="description"
                            rows={4}
                            placeholder="Briefly describe the project goals..."
                            {...register('description')}
                            className={`
                w-full px-4 py-3 rounded-xl border outline-none transition-all duration-200 resize-none
                bg-porcelain placeholder:text-pale-sky focus:ring-2 focus:ring-dodger-blue/60 focus:border-porcelain
                ${errors.description
                                    ? 'border-red-500 focus:border-red-500'
                                    : 'border-lavender-gray dark:border-gray-600 focus:border-dodger-blue'
                                }
              `}
                        />
                        {errors.description && (
                            <p className="text-red-500 text-xs mt-1 font-medium animate-pulse">
                                {errors.description.message}
                            </p>
                        )}
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={mutation.isPending}
                        className="w-full flex justify-center items-center gap-2 py-3.5 px-4 border border-transparent rounded-xl shadow-sm text-sm font-semibold text-white bg-dodger-blue hover:bg-royale-blue focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-dodger-blue transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                        {mutation.isPending ? (
                            <>
                                <Loader2 size={18} className="animate-spin" />
                                <span>Creating...</span>
                            </>
                        ) : (
                            <>
                                <Plus size={18} strokeWidth={2.5} />
                                <span>Create Project</span>
                            </>
                        )}
                    </button>

                    {/* Error Message from API */}
                    {mutation.isError && (
                        <div className="p-3 bg-red-50 border border-red-100 rounded-lg text-red-600 text-sm text-center">
                            Something went wrong, try again later.
                        </div>
                    )}
                </form>
            </div>
        </div>
    );
};

export default AddProject;