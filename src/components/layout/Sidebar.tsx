'use client';

import Link from 'next/link';
import { useSelector } from 'react-redux';
import { RootState } from '@/lib/store';

interface SidebarProps {
  collapsed: boolean;
  currentPath: string;
}

const Sidebar = ({ collapsed, currentPath }: SidebarProps) => {
  const { user } = useSelector((state: RootState) => state.auth);
  const isAdmin = user?.role === 'admin';

  const navItems = [
    // Only show dashboard for non-admin users
    ...(isAdmin ? [] : [
      { href: '/dashboard', icon: 'dashboard', label: 'Dashboard', roles: ['user'] }
    ]),
    { href: '/profile', icon: 'person', label: 'Profile', roles: ['user', 'admin'] },
    { href: '/settings', icon: 'settings', label: 'Settings', roles: ['user', 'admin'] },
    // Admin-only items
    { href: '/admin/users', icon: 'people', label: 'User Management', roles: ['admin'] },
    { href: '/admin/posts', icon: 'article', label: 'Post Moderation', roles: ['admin'] },
  ];

  return (
    <div
      className={`bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 shadow-lg transition-all duration-300 ease-in-out ${
        collapsed ? 'w-20' : 'w-64'
      } h-full`}
    >
      <div className="p-4 flex items-center justify-center dark:border-gray-700">
        {collapsed ? (
          <div className="text-xl font-bold">D</div>
        ) : (
          <div className="text-xl font-bold">Dashboard</div>
        )}
      </div>
      
      <nav className="mt-6">
        {navItems
          .filter((item) => item.roles.includes(user?.role || ''))
          .map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center px-6 py-3 transition-colors duration-200 ${
                currentPath.startsWith(item.href)
                  ? 'bg-blue-50 dark:bg-blue-900 text-blue-600 dark:text-blue-200'
                  : 'hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              <span className="material-icons-outlined mr-3">{item.icon}</span>
              {!collapsed && <span>{item.label}</span>}
            </Link>
          ))}
      </nav>
    </div>
  );
};

export default Sidebar;