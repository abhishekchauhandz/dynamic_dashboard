'use client';

import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/lib/store';
import { changePassword } from '@/features/authSlice';
import { toggleDarkMode } from '@/features/uiSlice';

const SettingsForm = () => {
  const { darkMode } = useSelector((state: RootState) => state.ui);
  const dispatch = useDispatch();
  const [passwords, setPasswords] = useState({
    current: '',
    new: '',
    confirm: ''
  });
  const [error, setError] = useState('');

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswords(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (passwords.new !== passwords.confirm) {
      setError('New passwords do not match');
      return;
    }
    
    if (passwords.new.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    // In a real app, you would:
    // 1. Verify current password with backend
    // 2. Hash the new password
    // 3. Send to backend to update
    
    // For our mock implementation:
    dispatch(changePassword({ newPassword: passwords.new }));
    
    // Reset form
    setPasswords({
      current: '',
      new: '',
      confirm: ''
    });
    setError('');
  };

  return (
    <div className="bg-white dark:bg-gray-700 rounded-lg shadow p-6 max-w-2xl">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-medium text-gray-800 dark:text-white">
              Dark Mode
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Toggle between light and dark theme
            </p>
          </div>
          <button
            onClick={() => dispatch(toggleDarkMode())}
            className={`relative inline-flex h-6 w-11 items-center rounded-full ${
              darkMode ? 'bg-blue-600' : 'bg-gray-200'
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                darkMode ? 'translate-x-6' : 'translate-x-1'
              }`}
            />
          </button>
        </div>
        
        <div className="border-t border-gray-200 dark:border-gray-600 pt-6">
          <h3 className="text-lg font-medium text-gray-800 dark:text-white mb-2">
            Change Password
          </h3>
          {error && (
            <div className="mb-4 text-sm text-red-600 dark:text-red-400">
              {error}
            </div>
          )}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Current Password
              </label>
              <input
                type="password"
                name="current"
                value={passwords.current}
                onChange={handlePasswordChange}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                New Password
              </label>
              <input
                type="password"
                name="new"
                value={passwords.new}
                onChange={handlePasswordChange}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Confirm New Password
              </label>
              <input
                type="password"
                name="confirm"
                value={passwords.confirm}
                onChange={handlePasswordChange}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-white"
              />
            </div>
            <button
              type="submit"
              className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Update Password
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SettingsForm;