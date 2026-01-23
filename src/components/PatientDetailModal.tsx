import React from 'react';
import type { Patient } from '../types';

interface PatientDetailModalProps {
  patient: Patient;
  onClose: () => void;
}

const PatientDetailModal: React.FC<PatientDetailModalProps> = ({ patient, onClose }) => {
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
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-900">Patient Details</h2>
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

        <div className="px-6 py-4 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Patient ID</label>
              <p className="mt-1 text-sm text-gray-900">{patient._id}</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Patient Name</label>
              <p className="mt-1 text-sm text-gray-900">{patient.patientName || 'N/A'}</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Phone Number</label>
              <p className="mt-1 text-sm text-gray-900">{patient.phoneNumber}</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Alternate Phone</label>
              <p className="mt-1 text-sm text-gray-900">{patient.alternatePhoneNumber || 'N/A'}</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <p className="mt-1 text-sm text-gray-900">{patient.email || 'N/A'}</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Gender</label>
              <p className="mt-1 text-sm text-gray-900">{patient.gendar || 'N/A'}</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Reference Code</label>
              <p className="mt-1 text-sm text-gray-900">{patient.refCode || 'N/A'}</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Registration Date</label>
              <p className="mt-1 text-sm text-gray-900">{formatDate(patient.registerationDate)}</p>
            </div>

            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700">Address</label>
              <p className="mt-1 text-sm text-gray-900">{patient.address || 'N/A'}</p>
            </div>

            {patient.lat && patient.long && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Latitude</label>
                  <p className="mt-1 text-sm text-gray-900">{patient.lat}</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Longitude</label>
                  <p className="mt-1 text-sm text-gray-900">{patient.long}</p>
                </div>
              </>
            )}

            {patient.location && (
              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700">Location Coordinates</label>
                <p className="mt-1 text-sm text-gray-900">
                  Long: {patient.location.coordinates[0]}, Lat: {patient.location.coordinates[1]}
                </p>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700">Created At</label>
              <p className="mt-1 text-sm text-gray-900">{formatDate(patient.createdAt)}</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Updated At</label>
              <p className="mt-1 text-sm text-gray-900">{formatDate(patient.updatedAt)}</p>
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

export default PatientDetailModal;
