import type {
  LoginRequest,
  LoginResponse,
  PatientsResponse,
  DriversResponse,
  PatientDetailResponse,
  DriverDetailResponse,
} from '../types';

const API_BASE_URL = 'http://ec2-13-49-244-247.eu-north-1.compute.amazonaws.com/api/v1';

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
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...options.headers,
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
export const getAllDrivers = async (): Promise<DriversResponse> => {
  return apiCall<DriversResponse>('/driver/getAllDrivers', {
    method: 'GET',
  });
};

// Get driver by ID
export const getDriverById = async (id: string): Promise<DriverDetailResponse> => {
  return apiCall<DriverDetailResponse>(`/driver/getdriverById?id=${id}`, {
    method: 'GET',
  });
};
