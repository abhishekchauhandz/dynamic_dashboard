import DashboardLayout from '@/components/layout/DashboardLayout';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import UsersTable from '@/components/admin/UsersTable';

export default function UsersPage() {
  return (
    <ProtectedRoute requiredRole="admin">
      <DashboardLayout title="User Management">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">
              User Management
            </h2>
          </div>
          <UsersTable />
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  );
}