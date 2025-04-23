import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import * as Sentry from "@sentry/browser";
import Layout from '@/app/components/layout/Layout';
import { useAuth } from '@/shared/hooks/useAuth';
import { api } from '@/modules/affiliatePrograms/api';
import { useUserRole, ROLES } from '@/modules/userRole';
import { LoadingSpinner, ErrorAlert } from '@/shared/components/ui';
import { formatDate } from '@/shared/utils/dateUtils';

export default function MyApps() {
  const { user, loading: authLoading } = useAuth();
  const { userRole } = useUserRole();
  const [apps, setApps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
    </Layout>
  );
}