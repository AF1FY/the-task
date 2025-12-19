import React, { useEffect, useState } from 'react'
import { getProjectsAsync } from '../actions/Project'
import { useQuery } from '@tanstack/react-query';
import ProjectCard from '../components/ProjectCard';
import { Link } from 'react-router-dom';

export function timeInMinutes(minutes: number) {
  return minutes * 60 * 1000
}
const Home = () => {
  const { isLoading, data } = useQuery({
    queryKey: ['projects'],
    queryFn: async () => await getProjectsAsync(),
    retry: 1,
    staleTime: timeInMinutes(10),
  });
  return (
    <div className='container py-8'>
      <div className="flex justify-between items-center pb-4 border-b border-pale-sky">
        <h2 className='text-2xl font-black'>Projects</h2>
        <Link to={'add-project'} className='rounded-2xl bg-dodger-blue text-white py-1.5 px-2.5 hover:shadow-lg hover:-translate-y-1 transition-all duration-200'>Add Project</Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 my-6">
        {isLoading ? <></> : data?.map(p => <ProjectCard project={p} />)}
      </div>
    </div>
  )
}

export default Home