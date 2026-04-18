// API utility functions for TECHSAVVY

/**
 * Get the base API URL from runtime config
 * @returns {string} Base API URL without trailing slash
 */
export const useApiBase = () => {
  const config = useRuntimeConfig();
  return config.public.apiBase.replace(/\/+$/, "");
};

/**
 * Base URL for S3 assets (if needed)
 */
export const BASE_ASSETS_URL = "https://fpstorage.sgp1.cdn.digitaloceanspaces.com/techsavvy/newsfeed/";

/**
 * Construct a full API URL from an endpoint
 * @param {string} endpoint - The API endpoint (e.g., 'cms/list/')
 * @returns {string} Full API URL
 */
export const getApiUrl = (endpoint) => {
  const BASE = useApiBase();
  const clean = endpoint.replace(/^\/+/, "");
  const [path, query] = clean.split("?", 2);
  const normalizedPath = path.endsWith("/") ? path : `${path}/`;
  return query ? `${BASE}/${normalizedPath}?${query}` : `${BASE}/${normalizedPath}`;
};

/**
 * API Endpoints for TECHSAVVY
 */
export const API_ENDPOINTS = {
  // CMS Data Posting endpoints
  CMS: {
    LIST: "cms/list/",
    DETAIL: (id) => `cms/${id}/`,
    CREATE: "cms/create/",
    EDIT: (id) => `cms/edit/${id}/`,
    DELETE: (id) => `cms/delete/${id}/`,
  },

  // File upload endpoint
  UPLOAD: "cms/upload/",
};

/**
 * Upload multiple files to S3
 * @param {File[]} files - Array of File objects to upload
 * @returns {Promise<Object>} Response with uploaded_files array
 */
export const uploadFiles = async (files) => {
  const formData = new FormData();

  // Append all files with the same key 'file'
  files.forEach((file) => {
    formData.append('file', file);
  });

  const uploadUrl = getApiUrl(API_ENDPOINTS.UPLOAD);
  console.log('📤 Uploading to:', uploadUrl);
  console.log('📦 Files count:', files.length);

  try {
    const response = await $fetch(uploadUrl, {
      method: 'POST',
      body: formData,
    });
    console.log('✅ Upload successful:', response);
    return response;
  } catch (error) {
    console.error('❌ File upload error:', error);
    console.error('Upload URL was:', uploadUrl);
    throw error;
  }
};

/**
 * Fetch all CMS posts
 * @returns {Promise<Array>} Array of CMS posts
 */
export const fetchCMSPosts = async () => {
  try {
    const response = await $fetch(getApiUrl(API_ENDPOINTS.CMS.LIST));
    return response;
  } catch (error) {
    console.error('Error fetching CMS posts:', error);
    throw error;
  }
};

/**
 * Fetch a single CMS post by ID
 * @param {number} id - Post ID
 * @returns {Promise<Object>} CMS post object
 */
export const fetchCMSPost = async (id) => {
  try {
    const response = await $fetch(getApiUrl(API_ENDPOINTS.CMS.DETAIL(id)));
    return response;
  } catch (error) {
    console.error(`Error fetching CMS post ${id}:`, error);
    throw error;
  }
};

/**
 * Create a new CMS post
 * @param {Object} data - Post data
 * @returns {Promise<Object>} Response object
 */
export const createCMSPost = async (data) => {
  try {
    console.log('API: Creating CMS post...');
    console.log('API: URL:', getApiUrl(API_ENDPOINTS.CMS.CREATE));
    console.log('API: Data:', data);

    const response = await $fetch(getApiUrl(API_ENDPOINTS.CMS.CREATE), {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    console.log('API: Create response:', response);
    return response;
  } catch (error) {
    console.error('API: Error creating CMS post:', error);
    console.error('API: Error response:', error.response);
    console.error('API: Error data:', error.data);
    throw error;
  }
};

/**
 * Update an existing CMS post
 * @param {number} id - Post ID
 * @param {Object} data - Updated post data
 * @returns {Promise<Object>} Response object
 */
export const updateCMSPost = async (id, data) => {
  try {
    const response = await $fetch(getApiUrl(API_ENDPOINTS.CMS.EDIT(id)), {
      method: 'PUT',
      body: data,
    });
    return response;
  } catch (error) {
    console.error(`Error updating CMS post ${id}:`, error);
    throw error;
  }
};

/**
 * Delete a CMS post
 * @param {number} id - Post ID
 * @returns {Promise<Object>} Response object
 */
export const deleteCMSPost = async (id) => {
  try {
    const response = await $fetch(getApiUrl(API_ENDPOINTS.CMS.DELETE(id)), {
      method: 'DELETE',
    });
    return response;
  } catch (error) {
    console.error(`Error deleting CMS post ${id}:`, error);
    throw error;
  }
};

