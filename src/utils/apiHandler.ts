// src/utils/apiHandler.ts (or similar)

import { ApiError } from '../utils/ApiError';

interface BackendResponse {
    success: boolean;
    code: number;
    message: string;
    errors: any;
}

// Function to handle fetching and error processing
export async function handleApiResponse<T>(
  response: Response
): Promise<T> {
  const isJson = response.headers.get('content-type')?.includes('application/json');
  const data: BackendResponse = isJson ? await response.json() : { success: false, code: response.status, message: response.statusText, errors: null };

  if (!response.ok || !data.success) {
    // Log the full error to the console for developer debugging
    console.error('API Error Response:', data);

    // Use the backend's message, defaulting to a generic one
    const message = data.message || `An error occurred (Status: ${response.status})`;
    
    // Throw the custom error
    throw new ApiError(message, data.code, data.errors);
  }

  // Assuming successful data is contained in the top-level object or a 'data' field
  // You might need to adjust this return based on your successful API response structure.
  return data as T; 
}