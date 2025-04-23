import DashboardLayout from '@/components/layout/DashboardLayout';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import PostsTable from '@/components/admin/PostsTable';

export default function PostsPage() {
  return (
    <ProtectedRoute requiredRole="admin">
      <DashboardLayout title="Post Moderation">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">
              Post Moderation
            </h2>
          </div>
          <PostsTable />
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  );
}