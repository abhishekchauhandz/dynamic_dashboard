import DashboardLayout from '@/components/layout/DashboardLayout';
import ProtectedRoute from '@/components/auth/ProtectedRoute';

export default function DashboardPage() {
  return (
    <ProtectedRoute requiredRole="user">
      <DashboardLayout title="Dashboard">
        <div className="p-6">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-6">
            Welcome to your Dashboard
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Dashboard cards/widgets */}
            <div className="bg-white dark:bg-gray-700 rounded-lg shadow p-6">
              <h3 className="text-lg font-medium text-gray-800 dark:text-white">
                Recent Activity
              </h3>
              <p className="mt-2 text-gray-600 dark:text-gray-300">
                No recent activity to show.
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-700 rounded-lg shadow p-6">
              <h3 className="text-lg font-medium text-gray-800 dark:text-white">
                Notifications
              </h3>
              <p className="mt-2 text-gray-600 dark:text-gray-300">
                You have no new notifications.
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-700 rounded-lg shadow p-6">
              <h3 className="text-lg font-medium text-gray-800 dark:text-white">
                Quick Actions
              </h3>
              <div className="mt-4 space-y-2">
                <button className="w-full text-left px-3 py-2 text-sm bg-blue-50 dark:bg-blue-900 text-blue-700 dark:text-blue-200 rounded hover:bg-blue-100 dark:hover:bg-blue-800">
                  Update Profile
                </button>
                <button className="w-full text-left px-3 py-2 text-sm bg-green-50 dark:bg-green-900 text-green-700 dark:text-green-200 rounded hover:bg-green-100 dark:hover:bg-green-800">
                  Change Password
                </button>
              </div>
            </div>
          </div>
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  );
}