'use client';

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/lib/store';
import { setPageTitle } from '@/features/uiSlice';
import Sidebar from './Sidebar';
import Topbar from './Topbar';
import { usePathname } from 'next/navigation';

interface DashboardLayoutProps {
  children: React.ReactNode;
  title: string;
}

export default function DashboardLayout({
  children,
  title,
}: DashboardLayoutProps) {
  const dispatch = useDispatch();
  const { sidebarCollapsed, darkMode } = useSelector(
    (state: RootState) => state.ui
  );
  const pathname = usePathname();

  useEffect(() => {
    dispatch(setPageTitle(title));
  }, [title, dispatch]);

  useEffect(() => {
    // Apply dark mode class to body
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
      <Sidebar collapsed={sidebarCollapsed} currentPath={pathname} />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Topbar />
        
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50 dark:bg-gray-800 p-4">
          {children}
        </main>
      </div>
    </div>
  );
}