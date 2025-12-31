// API Configuration for Unified Study Calculator Backend
const API_BASE_URL = 'https://api.calculator.globalmindsindia.com/api';

export const API_ENDPOINTS = {
  // Health check
  HEALTH: `${API_BASE_URL}/health`,
  
  // Cost Calculator endpoints
  COST_CALCULATOR: {
    CALCULATE: `${API_BASE_URL}/cost-calculator/calculate`,
    USER_DETAILS: `${API_BASE_URL}/cost-calculator/user-details`,
    REQUEST_CALLBACK: `${API_BASE_URL}/cost-calculator/request-callback`,
    DOWNLOAD_REQUEST: `${API_BASE_URL}/cost-calculator/download-request`,
    DOWNLOAD_PDF: `${API_BASE_URL}/cost-calculator/download-pdf`,
  },
  
  // Grade Calculator endpoints
  GRADE_CALCULATOR: {
    CALCULATE: `${API_BASE_URL}/grade-calculator/calculate`,
    USER_DETAILS: `${API_BASE_URL}/grade-calculator/user-details`,
    DOWNLOAD_PDF: `${API_BASE_URL}/grade-calculator/download-pdf`,
  }
};

// API utility functions
export const apiCall = async (url: string, options: RequestInit = {}) => {
  const defaultOptions: RequestInit = {
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include', // Include cookies for session management
  };

  const response = await fetch(url, { ...defaultOptions, ...options });
  
  if (!response.ok) {
    throw new Error(`API call failed: ${response.status} ${response.statusText}`);
  }
  
  return response.json();
};

export const postData = (url: string, data: any) => {
  return apiCall(url, {
    method: 'POST',
    body: JSON.stringify(data),
  });
};

export const getData = (url: string) => {
  return apiCall(url, {
    method: 'GET',
  });
};