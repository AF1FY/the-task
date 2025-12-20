"use client"
import { Link, useLocation  } from 'react-router-dom'
import ThemeToggle from './ThemeToggle';
// import { useEffect } from 'react';
const Navbar = () => {
    const {pathname} = useLocation();
    return (
        <nav className='md:h-16 p-2 bg-background md:flex md:items-center border-b border-athens-gray flex-1 z-10'>
            <div className='container w-full flex flex-col md:flex-row justify-between items-center gap-2'>
                <Link to={'/'}>
                    <h1 className='text-4xl font-black'>The Task</h1>
                </Link>
                <div>
                    <ul className='flex flex-col md:flex-row gap-4 items-center font-bold relative'>
                        <li className={` relative `} hidden={!(pathname.includes('project'))}>
                            <Link to={'/'} className={`rag ${pathname.endsWith('projects') ? 'selected' : ''}`}>
                                Projects
                            </Link>
                        </li>
                        <span>
                            <ThemeToggle/>
                        </span>
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default Navbar