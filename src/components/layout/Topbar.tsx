'use client';

import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/lib/store';
import { toggleSidebar, toggleDarkMode } from '@/features/uiSlice';
import { useRouter } from 'next/navigation';
import { logout } from '@/features/authSlice';
import { IoIosMenu } from 'react-icons/io';
import { MdDarkMode, MdOutlineLightMode } from 'react-icons/md';

const Topbar = () => {
    const dispatch = useDispatch();
    const router = useRouter();
    const { currentPageTitle, darkMode } = useSelector(
        (state: RootState) => state.ui
    );
    const { user } = useSelector((state: RootState) => state.auth);

    const handleLogout = () => {
        logout();
        dispatch(logout());
        router.push('/login');
    };

    return (
        <header className="bg-white dark:bg-gray-800 shadow-sm z-10">
            <div className="flex items-center justify-between px-6 py-4">
                <div className="flex items-center">
                    <button
                        onClick={() => dispatch(toggleSidebar())}
                        className="mr-4 text-gray-500 dark:text-gray-400 focus:outline-none"
                    >
                        <IoIosMenu className='text-xl'/>
                    </button>
                    <h1 className="text-xl font-semibold text-gray-800 dark:text-white">
                        {currentPageTitle}
                    </h1>
                </div>

                <div className="flex items-center space-x-4">
                    <button
                        onClick={() => dispatch(toggleDarkMode())}
                        className="text-gray-500 dark:text-gray-400 focus:outline-none"
                    >
                        {darkMode ? (
                            <MdOutlineLightMode className='text-xl'/>
                        ) : (
                            <MdDarkMode className='text-xl'/>
                        )}
                    </button>



                    <button className="flex items-center focus:outline-none">
                        <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white">
                            {user?.name.charAt(0)}
                        </div>
                        <span className="ml-2 text-sm font-medium text-gray-700 dark:text-gray-200">
                            {user?.name}
                        </span>
                    </button>

                    <button
                        onClick={handleLogout}
                        className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 w-full text-left"
                    >
                        Logout
                    </button>
                </div>
            </div>
        </header>
    );
};

export default Topbar;