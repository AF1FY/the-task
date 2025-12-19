import React from 'react';
import { Link } from 'react-router-dom'; // افترضنا إننا بنستخدم React Router
import { FolderKanban, ArrowRight, ListTodo } from 'lucide-react';
import type { Project } from '../actions/Project';

interface ProjectCardProps {
    project: Project;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
    const { id, title, description, tasks } = project;

    return (
        <div className="group relative dark:bg-white-athens-gray border border-gray-100 dark:border-athens-gray rounded-2xl p-6 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 hover:border-indigo-100 dark:hover:border-indigo-500/30">

            {/* Header: Icon & Title */}
            <div className="flex items-start justify-between mb-4">
                <div className="p-3 bg-indigo-50 dark:bg-indigo-900/30 text-dodger-blue dark:text-dodger-blue/80 rounded-xl group-hover:bg-dodger-blue group-hover:text-white transition-colors duration-300">
                    <FolderKanban size={24} strokeWidth={1.5} />
                </div>

                {/* Badge */}
                <div className="flex items-center gap-1.5 px-3 py-1 bg-gray-50 dark:bg-slate-700/50 text-gray-500 dark:text-slate-400 rounded-full text-xs font-medium border border-gray-100 dark:border-slate-700">
                    <ListTodo size={14} />
                    <span>{tasks?.length ?? 0} Tasks</span>
                </div>
            </div>

            {/* Content */}
            <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2 group-hover:text-dodger-blue dark:group-hover:text-dodger-blue/80 transition-colors">
                {title}
            </h3>

            <p className="text-gray-500 dark:text-slate-400 text-sm leading-relaxed mb-6 line-clamp-2 h-10">
                {description}
            </p>

            {/* Go to project details */}
            <Link
                to={`/project/${id}`}
                className="inline-flex items-center justify-center w-full py-2.5 px-4 rounded-xl bg-white-athens-gray dark:bg-slate-700 text-gray-700 dark:text-slate-200 font-medium text-sm transition-all duration-300 group-hover:bg-dodger-blue group-hover:text-white dark:group-hover:bg-dodger-blue hover:shadow-md"
            >
                <span>View Board</span>
                <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
        </div>
    );
};

export default ProjectCard;