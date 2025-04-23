import DashboardLayout from '@/components/layout/DashboardLayout';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import ProfileForm from '@/components/profile/ProfileForm';

export default function ProfilePage() {
  return (
    <ProtectedRoute>
      <DashboardLayout title="Profile">
        <div className="p-6">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-6">
            Your Profile
          </h2>
          <ProfileForm />
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  );
}