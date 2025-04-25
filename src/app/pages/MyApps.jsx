import React, { useState, useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import * as Sentry from "@sentry/browser";
import Layout from '@/app/components/layout/Layout';
import { useAuth } from '@/shared/hooks/useAuth';
import { api } from '@/modules/affiliatePrograms/api';
import { useUserRole, ROLES } from '@/modules/userRole';
import { LoadingSpinner, ErrorAlert, Modal } from '@/shared/components/ui';
import { formatDate } from '@/shared/utils/dateUtils';

export default function MyApps() {
  const { user, loading: authLoading } = useAuth();
  const { userRole } = useUserRole();
  const [apps, setApps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [notification, setNotification] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [appToDelete, setAppToDelete] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const location = useLocation();

  useEffect(() => {
    if (location.state?.notification) {
      setNotification(location.state.notification);
      // Clear the notification from location state
      window.history.replaceState({}, document.title);
    }
  }, [location]);

  useEffect(() => {
    if (user && userRole === ROLES.CREATOR) {
      fetchMyApps();
    }
  }, [user, userRole]);

  const fetchMyApps = async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await api.getMyApps();
      setApps(result.apps || []);
    } catch (error) {
      console.error('Error fetching your apps:', error);
      Sentry.captureException(error);
      setError('Failed to load your submitted apps. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const openDeleteModal = (app) => {
    setAppToDelete(app);
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setAppToDelete(null);
  };

  const handleDeleteApp = async () => {
    if (!appToDelete) return;
    
    try {
      setIsDeleting(true);
      await api.deleteApp(appToDelete.id);
      setApps(apps.filter(app => app.id !== appToDelete.id));
      setNotification(`Successfully deleted "${appToDelete.appName}"`);
      closeDeleteModal();
    } catch (error) {
      console.error('Error deleting app:', error);
      Sentry.captureException(error);
      setError(`Failed to delete app: ${error.message}`);
    } finally {
      setIsDeleting(false);
    }
  };

  const getStatusBadge = (status) => {
    const statusClasses = {
      pending: 'bg-yellow-100 text-yellow-800 border-yellow-200',
      approved: 'bg-green-100 text-green-800 border-green-200',
      rejected: 'bg-red-100 text-red-800 border-red-200'
    };

    const statusLabels = {
      pending: 'Pending Review',
      approved: 'Approved',
      rejected: 'Rejected'
    };

    return (
      <span className={`px-2.5 py-1 text-xs font-medium rounded-full border ${statusClasses[status] || 'bg-gray-100 text-gray-800 border-gray-200'}`}>
        {statusLabels[status] || status}
      </span>
    );
  };

  if (authLoading) {
    return (
      <Layout>
        <div className="flex justify-center items-center py-20">
          <LoadingSpinner />
        </div>
      </Layout>
    );
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (userRole !== ROLES.CREATOR) {
    return <Navigate to="/marketplace" />;
  }

  return (
    <Layout>
      <div className="bg-secondary-50 py-8">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h1 className="text-3xl font-bold text-secondary-900 mb-2">My Submitted Apps</h1>
            <p className="text-secondary-600">
              Manage and view the status of all your submitted affiliate programs.
            </p>
          </div>
        </div>
      </div>

      <div className="py-8">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            {notification && (
              <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-6 rounded-md">
                <div className="flex">
                  <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>{notification}</span>
                </div>
              </div>
            )}

            {error && <ErrorAlert message={error} />}

            {loading ? (
              <div className="flex justify-center py-10">
                <LoadingSpinner />
              </div>
            ) : apps.length === 0 ? (
              <div className="bg-white rounded-xl shadow-soft p-10 text-center">
                <div className="mb-4">
                  <svg className="mx-auto h-16 w-16 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m6.75 12H9m1.5-12H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No apps submitted yet</h3>
                <p className="text-gray-500 mb-6">You haven't submitted any affiliate programs yet.</p>
                <a href="/submit-app" className="inline-flex items-center justify-center px-5 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-md font-medium cursor-pointer transition-all">
                  Submit Your First App
                </a>
              </div>
            ) : (
              <div>
                <div className="bg-white rounded-xl shadow-soft overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            App Name
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Status
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Submitted
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Last Updated
                          </th>
                          <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {apps.map((app) => (
                          <tr key={app.id} className="hover:bg-gray-50 transition-colors">
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center">
                                <div>
                                  <div className="text-sm font-medium text-gray-900">{app.appName}</div>
                                  <div className="text-sm text-gray-500 truncate max-w-xs">{app.appDescription.substring(0, 60)}...</div>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              {getStatusBadge(app.status)}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {formatDate(app.createdAt)}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {formatDate(app.updatedAt)}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                              <button 
                                onClick={() => openDeleteModal(app)}
                                className="text-red-600 hover:text-red-900 transition-colors cursor-pointer"
                              >
                                Delete
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && (
        <Modal onClose={closeDeleteModal} title="Delete App">
          <div className="p-4">
            <p className="mb-4">
              Are you sure you want to delete "{appToDelete?.appName}"? This action cannot be undone.
            </p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={closeDeleteModal}
                className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded cursor-pointer transition-colors"
                disabled={isDeleting}
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteApp}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded cursor-pointer transition-colors"
                disabled={isDeleting}
              >
                {isDeleting ? (
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Deleting...
                  </span>
                ) : 'Delete App'}
              </button>
            </div>
          </div>
        </Modal>
      )}
    </Layout>
  );
}