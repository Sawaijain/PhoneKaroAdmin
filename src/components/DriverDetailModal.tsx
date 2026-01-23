import React from 'react';
import type { Driver } from '../types';

interface DriverDetailModalProps {
  driver: Driver;
  onClose: () => void;
}

const DriverDetailModal: React.FC<DriverDetailModalProps> = ({ driver, onClose }) => {
  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'N/A';
    try {
      return new Date(dateString).toLocaleString();
    } catch {
      return dateString;
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-900">Driver Details</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <div className="px-6 py-4 space-y-6">
          {/* Basic Information */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Basic Information</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Driver ID</label>
                <p className="mt-1 text-sm text-gray-900">{driver._id}</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Driver Name</label>
                <p className="mt-1 text-sm text-gray-900">{driver.driverName || 'N/A'}</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Phone Number</label>
                <p className="mt-1 text-sm text-gray-900">{driver.phoneNumber}</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <p className="mt-1 text-sm text-gray-900">{driver.email || 'N/A'}</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Aadhar Number</label>
                <p className="mt-1 text-sm text-gray-900">{driver.driverAadharNo || 'N/A'}</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">License Number</label>
                <p className="mt-1 text-sm text-gray-900">{driver.driverLicenceNo || 'N/A'}</p>
              </div>

              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700">Address</label>
                <p className="mt-1 text-sm text-gray-900">{driver.address || 'N/A'}</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Status</label>
                <p className="mt-1">
                  <span
                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      driver.isAvailable
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {driver.isAvailable ? 'Available' : 'Unavailable'}
                  </span>
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Active</label>
                <p className="mt-1">
                  <span
                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      driver.isActive
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {driver.isActive ? 'Active' : 'Inactive'}
                  </span>
                </p>
              </div>

              {driver.lat && driver.long && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Latitude</label>
                    <p className="mt-1 text-sm text-gray-900">{driver.lat}</p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Longitude</label>
                    <p className="mt-1 text-sm text-gray-900">{driver.long}</p>
                  </div>
                </>
              )}

              {driver.location && (
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700">Location Coordinates</label>
                  <p className="mt-1 text-sm text-gray-900">
                    Long: {driver.location.coordinates[0]}, Lat: {driver.location.coordinates[1]}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Owner Details */}
          {driver.ownerDetails && (
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Owner Details</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Owner Name</label>
                  <p className="mt-1 text-sm text-gray-900">{driver.ownerDetails.ownerName || 'N/A'}</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Owner ID</label>
                  <p className="mt-1 text-sm text-gray-900">{driver.ownerDetails.ownerId || 'N/A'}</p>
                </div>

                {driver.ownerDetails.ownerFile && (
                  <div className="col-span-2">
                    <label className="block text-sm font-medium text-gray-700">Owner File</label>
                    <a
                      href={driver.ownerDetails.ownerFile}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-1 text-sm text-indigo-600 hover:text-indigo-800"
                    >
                      View File
                    </a>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Documents */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Documents</h3>
            <div className="grid grid-cols-2 gap-4">
              {driver.driverProfile && (
                <div>
                  <label className="block text-sm font-medium text-gray-700">Profile Picture</label>
                  <a
                    href={driver.driverProfile}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-1 text-sm text-indigo-600 hover:text-indigo-800"
                  >
                    View Image
                  </a>
                </div>
              )}

              {driver.driverAadharFile && (
                <div>
                  <label className="block text-sm font-medium text-gray-700">Aadhar File</label>
                  <a
                    href={driver.driverAadharFile}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-1 text-sm text-indigo-600 hover:text-indigo-800"
                  >
                    View File
                  </a>
                </div>
              )}

              {driver.driverLicenceFile && (
                <div>
                  <label className="block text-sm font-medium text-gray-700">License File</label>
                  <a
                    href={driver.driverLicenceFile}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-1 text-sm text-indigo-600 hover:text-indigo-800"
                  >
                    View File
                  </a>
                </div>
              )}
            </div>
          </div>

          {/* Ambulances */}
          {driver.ambulances && driver.ambulances.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Ambulances ({driver.ambulances.length})
              </h3>
              <div className="space-y-4">
                {driver.ambulances.map((ambulance, index) => (
                  <div key={ambulance._id} className="border border-gray-200 rounded-lg p-4">
                    <h4 className="font-medium text-gray-900 mb-2">Ambulance {index + 1}</h4>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Type</label>
                        <p className="mt-1 text-sm text-gray-900">{ambulance.ambulanceType}</p>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700">Ambulance No</label>
                        <p className="mt-1 text-sm text-gray-900">{ambulance.ambulanceNo}</p>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700">Registration No</label>
                        <p className="mt-1 text-sm text-gray-900">{ambulance.registrationNo}</p>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700">RC No</label>
                        <p className="mt-1 text-sm text-gray-900">{ambulance.ambulanceRcNo}</p>
                      </div>

                      {ambulance.ambulanceFile && (
                        <div>
                          <label className="block text-sm font-medium text-gray-700">Ambulance Image</label>
                          <a
                            href={ambulance.ambulanceFile}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-1 text-sm text-indigo-600 hover:text-indigo-800"
                          >
                            View Image
                          </a>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Timestamps */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Timestamps</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Created At</label>
                <p className="mt-1 text-sm text-gray-900">{formatDate(driver.createdAt)}</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Updated At</label>
                <p className="mt-1 text-sm text-gray-900">{formatDate(driver.updatedAt)}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="sticky bottom-0 bg-gray-50 border-t border-gray-200 px-6 py-4 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default DriverDetailModal;
