import { useState } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import './App.css'
import Layout from './Layouts/Layout';
import Home from './Pages/Home';
import ProjectDetails from './Pages/Project/ProjectDetails';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import AddProject from './Pages/Project/AddProject';
import AddTask from './Pages/Project/AddTask';

const App = () => {
  const queryClient = new QueryClient();
  const router = createBrowserRouter([
    {
      path: '',
      element: <Layout />,
      children: [
        {
          index: true,
          element: <Home />
        },
        {
          path: "/project/:id",
          element: <ProjectDetails />
        },
        {
          path: "/project/:id/add-task",
          element: <AddTask />
        },
        {
          path: '/add-project',
          element: <AddProject />
        }
      ]
    },
  ])
  return (
    <QueryClientProvider client={queryClient} >
      <RouterProvider router={router} />
    </QueryClientProvider>
  )
}

export default App