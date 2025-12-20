import { useQuery, useQueryClient } from '@tanstack/react-query'
import { useEffect, useState, useMemo } from 'react'
import { useNavigate, useParams, useLocation, Link } from 'react-router-dom'
import { Loader2, Plus } from 'lucide-react'
import { deleteTaskAsync, updateTaskAsync, type Task } from '../../actions/Task';
import { getProjectByIdAsync } from '../../actions/Project';
import TaskCard from '../../components/TaskCard';
import { timeInMinutes } from '../Home';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { searchSchema, type SearchForm } from '../../validators/formValidation';

export type LocalTask = Task & { _localId: string }

const ProjectDetails = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const location = useLocation()
  const queryClient = useQueryClient();

  const { isLoading, data: project } = useQuery({
    queryKey: ['project', id ?? ''],
    queryFn: async () => await getProjectByIdAsync(id),
    staleTime: timeInMinutes(10)
  })
  const [tasks, setTasks] = useState<LocalTask[]>([])
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    const load = async () => {
      if (project?.tasks) {
        const list = project.tasks
          .map(t => ({ ...t, _localId: t.id ?? crypto.randomUUID() }))
        setTasks(list)
      } else {
        setTasks([])
      }
    }
    load()

  }, [project])

  useEffect(() => {
    const state = location.state as { newTask?: Task } | null
    if (state?.newTask) {
      const incoming = state.newTask
      const withLocal: LocalTask = {
        ...incoming,
        _localId: incoming.id ?? crypto.randomUUID()
      }
      setTasks(prev => [withLocal, ...prev])
      navigate(location.pathname, { replace: true, state: null })
    }
  }, [location.state, navigate, location.pathname])

  const moveTask = async (localId: string, newStatus: Task['status']) => {
    const crnt_task = tasks.filter(t => t._localId === localId)[0];
    crnt_task.status = newStatus;
    const data = {
      id: crnt_task.id,
      projectId: crnt_task.projectId,
      title: crnt_task.title,
      description: crnt_task.description,
      status: crnt_task.status,
    };
    const res = await updateTaskAsync(crnt_task.id, data);
    if (res) {
      await queryClient.invalidateQueries({ queryKey: ['project', id ?? ''] });
    } else {
      console.error("Can't update task");
    }
  }

  const deleteTask = async (taskID: string) => {
    const res = await deleteTaskAsync(taskID);
    if (res) {
      queryClient.invalidateQueries({ queryKey: ['project', id ?? ''] });
    } else {
      console.error("Can't delete task");
    }
  }

  //* form for the search
  const { handleSubmit, register } = useForm<SearchForm>({
    mode: 'onSubmit',
    resolver: zodResolver(searchSchema)
  })
  
  const columns = useMemo(() => {
    const filteredTasks = tasks.filter(t => 
      t.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      (t.description && t.description.toLowerCase().includes(searchQuery.toLowerCase()))
    );

    return {
      'To Do': filteredTasks.filter(t => t.status === 'To Do'),
      'In Progress': filteredTasks.filter(t => t.status === 'In Progress'),
      'Done': filteredTasks.filter(t => t.status === 'Done'),
    }
  }, [tasks, searchQuery])

  const columnConfig = [
    { title: 'To Do', status: 'To Do', color: 'bg-gray-100 dark:bg-gray-800', border: 'border-t-4 border-pale-sky' },
    { title: 'In Progress', status: 'In Progress', color: 'bg-blue-50/50 dark:bg-blue-900/10', border: 'border-t-4 border-dodger-blue' },
    { title: 'Done', status: 'Done', color: 'bg-green-50/50 dark:bg-green-900/10', border: 'border-t-4 border-emerald-500' },
  ] as const;
  async function search(data:SearchForm) {
    setSearchQuery(data.search || '');
  }
  
  if (isLoading) return <div className="flex justify-center p-10"><Loader2 className="animate-spin" /></div>

  return (
    <div className="container py-8 max-w-7xl mx-auto px-4">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start sm:items-center gap-4 mb-8 pb-4 border-b border-gray-200 dark:border-gray-700">
        <div className='w-1/2'>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">{project?.title ?? 'Project Board'}</h2>
          <p className="text-pale-sky mt-1">{project?.description}</p>
        </div>
        <div className='w-1/2 flex items-center justify-end gap-4'>
          <form onChange={handleSubmit(search)} className='w-2/3'>
            <input
              id='search'
              {...register('search')}
              type="text"
              placeholder='Search for task...'
              className='w-full px-2.5 py-1.5 rounded-xl ring-2 ring-dodger-blue/30 outline-none transition-all duration-200 resize-none
                        bg-porcelain placeholder:text-pale-sky focus:ring-dodger-blue focus:border-porcelain' />
          </form>
          <Link to={'add-task'} className='flex items-center gap-2 rounded-2xl bg-dodger-blue text-white py-1.5 px-2.5 hover:shadow-lg hover:-translate-y-1 transition-all duration-200'>
            <Plus size={18} />
            <span>Add Task</span>
          </Link>
        </div>
      </div>

      {/* Kanban Columns */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {columnConfig.map((col) => (
          <div key={col.status} className={`flex flex-col h-full rounded-xl ${col.color} ${col.border} p-4 min-h-125`}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-gray-700 dark:text-gray-200">{col.title}</h3>
              <span className="bg-white dark:bg-gray-700 px-2.5 py-0.5 rounded-full text-xs font-bold text-gray-500 dark:text-gray-300 shadow-sm">
                {columns[col.status].length}
              </span>
            </div>

            <div className="flex-1 flex flex-col gap-3">
              {columns[col.status].length === 0 ? (
                <div className="h-32 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg flex items-center justify-center text-gray-400 text-sm italic">
                  No tasks yet
                </div>
              ) : (
                columns[col.status].map(task => (
                  <TaskCard
                    key={task._localId}
                    task={task}
                    onMove={moveTask}
                    onDelete={deleteTask}
                  />
                ))
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ProjectDetails