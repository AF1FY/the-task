import React from 'react'
import type { Task } from '../actions/Task'
import { Trash2, Clock, CheckCircle2, Circle } from 'lucide-react'
import type { LocalTask } from '../Pages/Project/ProjectDetails'

interface Props {
    task: LocalTask
    onMove: (localId: string, newStatus: Task['status']) => void
    onDelete: (taskID: string) => void
}

const statusConfig = {
    'To Do': { icon: Circle, color: 'text-gray-500', bg: 'bg-gray-100' },
    'In Progress': { icon: Clock, color: 'text-blue-500', bg: 'bg-blue-50' },
    'Done': { icon: CheckCircle2, color: 'text-green-500', bg: 'bg-green-50' }
}

const TaskCard: React.FC<Props> = ({ task, onMove, onDelete }) => {
    
    const currentConfig = statusConfig[task.status] || statusConfig['To Do'];
    const StatusIcon = currentConfig.icon;

    return (
        <div className="group bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-md transition-all duration-200">
            {/* Header: Title & Actions */}
            <div className="flex justify-between items-start mb-2">
                <h4 className="font-semibold text-gray-800 dark:text-gray-100 text-base leading-tight">
                    {task.title}
                </h4>
                
                {/* Delete Button (Hidden until hover for cleaner look on desktop) */}
                <button 
                    onClick={() => onDelete(task.id)} 
                    className="text-gray-400 hover:text-red-500 transition-colors p-1 rounded-md opacity-100 lg:opacity-0 lg:group-hover:opacity-100"
                    title="Delete Task"
                >
                    <Trash2 size={16} />
                </button>
            </div>

            {/* Description */}
            <p className="text-sm text-pale-sky dark:text-gray-400 mb-4 line-clamp-3">
                {task.description}
            </p>

            {/* Footer: Status Select */}
            <div className="flex items-center justify-between pt-3 border-t border-gray-50 dark:border-gray-700">
                <div className={`flex items-center gap-1.5 px-2 py-1 rounded-md text-xs font-medium ${currentConfig.bg} ${currentConfig.color}`}>
                    <StatusIcon size={12} />
                    <span>{task.status}</span>
                </div>

                {/* Move Dropdown */}
                <div className="relative">
                    <select
                        value={task.status}
                        onChange={e => onMove(task._localId, e.target.value as Task['status'])}
                        className="appearance-none bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-300 text-xs rounded-lg py-1.5 pl-3 pr-8 cursor-pointer hover:border-dodger-blue focus:outline-none focus:ring-2 focus:ring-dodger-blue/20 transition-colors"
                    >
                        <option value="To Do">To Do</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Done">Done</option>
                    </select>
                    {/* Custom Arrow Icon for Select */}
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500">
                        <svg className="h-3 w-3 fill-current" viewBox="0 0 20 20">
                            <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                        </svg>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TaskCard