import DashboardLayout from '@/components/layout/DashboardLayout';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import SettingsForm from '@/components/settings/SettingsForm';

export default function SettingsPage() {
  return (
    <ProtectedRoute>
      <DashboardLayout title="Settings">
        <div className="p-6">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-6">
            Settings
          </h2>
          <SettingsForm />
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  );
}