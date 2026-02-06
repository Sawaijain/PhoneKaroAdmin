import type {
  LoginRequest,
  LoginResponse,
  PatientsResponse,
  DriversResponse,
  PatientDetailResponse,
  DriverDetailResponse,
  RidesResponse,
} from '../types';

const API_BASE_URL = 'https://api.gyankunjkutir.com/api/v1';

// Get token from localStorage
export const getToken = (): string | null => {
  return localStorage.getItem('admin_token');
};

// Set token in localStorage
export const setToken = (token: string): void => {
  localStorage.setItem('admin_token', token);
};

// Remove token from localStorage
export const removeToken = (): void => {
  localStorage.removeItem('admin_token');
};

// Helper function to make API calls
const apiCall = async <T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> => {
  const token = getToken();
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string>),
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'Request failed' }));
    throw new Error(error.message || 'Request failed');
  }

  return response.json();
};

// Login API
export const login = async (credentials: LoginRequest): Promise<LoginResponse> => {
  const response = await apiCall<LoginResponse>('/admin/login', {
    method: 'POST',
    body: JSON.stringify(credentials),
  });

  if (response.data?.token) {
    setToken(response.data.token);
  }

  return response;
};

// Get all patients
export const getAllPatients = async (): Promise<PatientsResponse> => {
  return apiCall<PatientsResponse>('/patient/getAllPatient', {
    method: 'GET',
  });
};

// Get patient by ID
export const getPatientById = async (id: string): Promise<PatientDetailResponse> => {
  return apiCall<PatientDetailResponse>(`/patient/getpatientById?id=${id}`, {
    method: 'GET',
  });
};

// Get all drivers
export const getAllDrivers = async (
  params?: {
    page?: number;
    limit?: number;
    search?: string;
    isAvailable?: boolean;
  }
): Promise<DriversResponse> => {
  const queryParams = new URLSearchParams();
  
  if (params?.page !== undefined) {
    queryParams.append('page', params.page.toString());
  }
  if (params?.limit !== undefined) {
    queryParams.append('limit', params.limit.toString());
  }
  if (params?.search) {
    queryParams.append('search', params.search);
  }
  if (params?.isAvailable !== undefined) {
    queryParams.append('isAvailable', params.isAvailable.toString());
  }

  const queryString = queryParams.toString();
  const endpoint = `/driver/getAllDrivers${queryString ? `?${queryString}` : ''}`;

  return apiCall<DriversResponse>(endpoint, {
    method: 'GET',
  });
};

// Get driver by ID
export const getDriverById = async (id: string): Promise<DriverDetailResponse> => {
  return apiCall<DriverDetailResponse>(`/driver/getdriverById?id=${id}`, {
    method: 'GET',
  });
};

// Update driver approval status
export interface UpdateDriverApprovalRequest {
  id: string;
  isApproved: boolean;
}

export interface UpdateDriverApprovalResponse {
  code: number;
  message: string;
  data?: any;
}

export const updateDriverApprovalStatus = async (
  request: UpdateDriverApprovalRequest
): Promise<UpdateDriverApprovalResponse> => {
  return apiCall<UpdateDriverApprovalResponse>('/driver/updateDriverApprovalstatus', {
    method: 'PUT',
    body: JSON.stringify(request),
  });
};

// Get all rides
export const getAllRides = async (
  params?: {
    search?: string;
    rideStatus?: string;
    fromDate?: string;
    toDate?: string;
  }
): Promise<RidesResponse> => {
  const queryParams = new URLSearchParams();
  
  if (params?.search) {
    queryParams.append('search', params.search);
  }
  if (params?.rideStatus) {
    queryParams.append('rideStatus', params.rideStatus);
  }
  if (params?.fromDate) {
    queryParams.append('fromDate', params.fromDate);
  }
  if (params?.toDate) {
    queryParams.append('toDate', params.toDate);
  }

  const queryString = queryParams.toString();
  const endpoint = `/rideOrder/getAllRides${queryString ? `?${queryString}` : ''}`;

  return apiCall<RidesResponse>(endpoint, {
    method: 'GET',
  });
};

// Delete patient
export interface DeleteResponse {
  code: number;
  message: string;
  data?: any;
}

export const deletePatient = async (id: string): Promise<DeleteResponse> => {
  return apiCall<DeleteResponse>(`/patient/deletepatient?id=${id}`, {
    method: 'DELETE',
  });
};

// Delete driver
export const deleteDriver = async (id: string): Promise<DeleteResponse> => {
  return apiCall<DeleteResponse>(`/driver/deleteDriver?id=${id}`, {
    method: 'DELETE',
  });
};
