// API utility functions for TECHSAVVY

type CmsId = number | string
type JsonRecord = Record<string, unknown>

export interface UploadFilesResponse {
  uploaded_files: unknown[]
  [key: string]: unknown
}

/**
 * Get the base API URL from runtime config
 */
export const useApiBase = (): string => {
  const config = useRuntimeConfig()
  return config.public.apiBase.replace(/\/+$/, '')
}

/**
 * Base URL for S3 assets (if needed)
 */
export const BASE_ASSETS_URL =
  'https://fpstorage.sgp1.cdn.digitaloceanspaces.com/techsavvy/newsfeed/'

/**
 * Construct a full API URL from an endpoint
 */
export const getApiUrl = (endpoint: string): string => {
  const base = useApiBase()
  const clean = endpoint.replace(/^\/+/, '')
  const [path, query] = clean.split('?', 2)
  const normalizedPath = path.endsWith('/') ? path : `${path}/`
  return query ? `${base}/${normalizedPath}?${query}` : `${base}/${normalizedPath}`
}

/**
 * API Endpoints for TECHSAVVY
 */
export const API_ENDPOINTS = {
  CMS: {
    LIST: 'cms/list/',
    DETAIL: (id: CmsId) => `cms/${id}/`,
    CREATE: 'cms/create/',
    EDIT: (id: CmsId) => `cms/edit/${id}/`,
    DELETE: (id: CmsId) => `cms/delete/${id}/`,
  },
  UPLOAD: 'cms/upload/',
} as const

/**
 * Upload multiple files to S3
 */
export const uploadFiles = async (files: File[]): Promise<UploadFilesResponse> => {
  const formData = new FormData()

  files.forEach((file) => {
    formData.append('file', file)
  })

  const uploadUrl = getApiUrl(API_ENDPOINTS.UPLOAD)
  console.log('Uploading to:', uploadUrl)
  console.log('Files count:', files.length)

  try {
    const response = await $fetch<UploadFilesResponse>(uploadUrl, {
      method: 'POST',
      body: formData,
    })
    console.log('Upload successful:', response)
    return response
  } catch (error) {
    console.error('File upload error:', error)
    console.error('Upload URL was:', uploadUrl)
    throw error
  }
}

/**
 * Fetch all CMS posts
 */
export const fetchCMSPosts = async <T = unknown[]>(): Promise<T> => {
  try {
    const response = await $fetch<T>(getApiUrl(API_ENDPOINTS.CMS.LIST))
    return response
  } catch (error) {
    console.error('Error fetching CMS posts:', error)
    throw error
  }
}

/**
 * Fetch a single CMS post by ID
 */
export const fetchCMSPost = async <T = unknown>(id: CmsId): Promise<T> => {
  try {
    const response = await $fetch<T>(getApiUrl(API_ENDPOINTS.CMS.DETAIL(id)))
    return response
  } catch (error) {
    console.error(`Error fetching CMS post ${id}:`, error)
    throw error
  }
}

/**
 * Create a new CMS post
 */
export const createCMSPost = async <T = unknown>(
  data: JsonRecord,
): Promise<T> => {
  try {
    console.log('API: Creating CMS post...')
    console.log('API: URL:', getApiUrl(API_ENDPOINTS.CMS.CREATE))
    console.log('API: Data:', data)

    const response = await $fetch<T>(getApiUrl(API_ENDPOINTS.CMS.CREATE), {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    })

    console.log('API: Create response:', response)
    return response
  } catch (error: unknown) {
    const fetchError = error as { response?: unknown; data?: unknown }
    console.error('API: Error creating CMS post:', error)
    console.error('API: Error response:', fetchError.response)
    console.error('API: Error data:', fetchError.data)
    throw error
  }
}

/**
 * Update an existing CMS post
 */
export const updateCMSPost = async <T = unknown>(
  id: CmsId,
  data: JsonRecord,
): Promise<T> => {
  try {
    const response = await $fetch<T>(getApiUrl(API_ENDPOINTS.CMS.EDIT(id)), {
      method: 'PUT',
      body: data,
    })
    return response
  } catch (error) {
    console.error(`Error updating CMS post ${id}:`, error)
    throw error
  }
}

/**
 * Delete a CMS post
 */
export const deleteCMSPost = async <T = unknown>(id: CmsId): Promise<T> => {
  try {
    const response = await $fetch<T>(getApiUrl(API_ENDPOINTS.CMS.DELETE(id)), {
      method: 'DELETE',
    })
    return response
  } catch (error) {
    console.error(`Error deleting CMS post ${id}:`, error)
    throw error
  }
}
