// API client for MongoDB backend server

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://smart-doorbell-entry.onrender.com/api';

// Helper function to make API requests
const apiRequest = async (endpoint: string, options: RequestInit = {}) => {
  const token = localStorage.getItem('authToken');
  
  const config: RequestInit = {
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    },
    ...options,
  };

  const response = await fetch(`${API_BASE_URL}${endpoint}`, config);
  
  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: 'Network error' }));
    throw new Error(error.error || `HTTP error! status: ${response.status}`);
  }

  return response.json();
};

// Authentication API
export const authAPI = {
  // Register a new user
  register: async (email: string, password: string, fullName: string) => {
    const data = await apiRequest('/auth/register', {
      method: 'POST',
      body: JSON.stringify({ email, password, fullName }),
    });
    
    if (data.token) {
      localStorage.setItem('authToken', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
    }
    
    return data;
  },

  // Login
  login: async (email: string, password: string) => {
    const data = await apiRequest('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
    
    if (data.token) {
      localStorage.setItem('authToken', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
    }
    
    return data;
  },

  // Verify token
  verify: async () => {
    return await apiRequest('/auth/verify');
  },

  // Logout
  logout: () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
  },

  // Get current user from localStorage
  getCurrentUser: () => {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  },

  // Check if user is authenticated
  isAuthenticated: () => {
    return !!localStorage.getItem('authToken');
  },
};

// Faces API
export const facesAPI = {
  // Get all faces for a user
  getAll: async (userId: string) => {
    return await apiRequest(`/faces?userId=${userId}`);
  },

  // Create a new face
  create: async (userId: string, name: string, descriptors: number[][], imageUrl: string) => {
    return await apiRequest('/faces', {
      method: 'POST',
      body: JSON.stringify({ userId, name, descriptors, imageUrl }),
    });
  },

  // Delete a face
  delete: async (faceId: string) => {
    return await apiRequest(`/faces/${faceId}`, {
      method: 'DELETE',
    });
  },
};

// Logs API
export const logsAPI = {
  // Get all logs for a user
  getAll: async (userId: string) => {
    return await apiRequest(`/logs?userId=${userId}`);
  },

  // Create a new log entry
  create: async (userId: string, recognizedPerson: string | null, action: string) => {
    return await apiRequest('/logs', {
      method: 'POST',
      body: JSON.stringify({ userId, recognizedPerson, action }),
    });
  },
};

export default authAPI;
