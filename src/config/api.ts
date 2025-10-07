/**
 * API Configuration
 *
 * This file centralizes all API-related configuration.
 * The API URL is determined by the environment:
 * - Development: uses GATSBY_STRAPI_API_URL from .env.development
 * - Production: uses GATSBY_STRAPI_API_URL from .env.production
 * - Fallback: http://localhost:1337
 */

export const API_URL =
  process.env.GATSBY_STRAPI_API_URL || "http://localhost:1337";

/**
 * Helper function to build full API endpoint URLs
 * @param endpoint - The API endpoint path (e.g., '/api/portfolios')
 * @returns Full URL to the API endpoint
 */
export const getApiUrl = (endpoint: string): string => {
  // Remove leading slash if present to avoid double slashes
  const cleanEndpoint = endpoint.startsWith("/") ? endpoint : `/${endpoint}`;
  return `${API_URL}${cleanEndpoint}`;
};

/**
 * Helper function to build full media URLs
 * @param path - The media path from Strapi (e.g., '/uploads/image.jpg')
 * @returns Full URL to the media file
 */
export const getMediaUrl = (path: string): string => {
  if (!path) return "";
  // If path is already a full URL, return as is
  if (path.startsWith("http://") || path.startsWith("https://")) {
    return path;
  }
  // Otherwise, prepend the API URL
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  return `${API_URL}${cleanPath}`;
};
