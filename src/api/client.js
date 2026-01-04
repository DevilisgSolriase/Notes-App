import { API_BASE_URL } from "../config/env";
import { fetchAuthSession } from 'aws-amplify/auth';

console.log('Loaded API_BASE_URL:', API_BASE_URL);  // Debug log

export async function apiFetch(path, options = {}) {
  const session = await fetchAuthSession();
  const token = session.tokens?.accessToken?.toString();

  const headers = {
    "Content-Type": "application/json",
    ...(token && { Authorization: `Bearer ${token}` }),
    ...options.headers,
  };

  const baseUrl = API_BASE_URL.replace(/\/$/, '');  // Remove trailing slash
  const fullUrl = `${baseUrl}${path}`;
  console.log('API Fetch URL:', fullUrl);  // Log the full URL
  console.log('API Fetch Headers:', headers);  // Log headers for debugging

  const res = await fetch(fullUrl, {
    ...options,
    headers,
  });
  console.log('Fetch response status:', res.status);  // Log status

  if (!res.ok) {
    console.error('Fetch failed with status:', res.status, res.statusText);
    throw new Error(`API error: ${res.status}`);
  }

  console.log('Fetch successful');  // Log success
  return res.json();
}