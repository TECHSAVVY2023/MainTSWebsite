// API utility functions for TECHSAVVY (copied from ui/app/utils/api.js, adapted to TS)

export const useApiBase = () => {
  const config = useRuntimeConfig()
  return (config.public.apiBase as string).replace(/\/+$/, '')
}

export const BASE_ASSETS_URL =
  'https://fpstorage.sgp1.cdn.digitaloceanspaces.com/techsavvy/newsfeed/'

export const getApiUrl = (endpoint: string) => {
  const BASE = useApiBase()
  const clean = endpoint.replace(/^\/+/, '')
  const [path = '', query] = clean.split('?', 2)
  const normalizedPath = path.endsWith('/') ? path : `${path}/`
  return query ? `${BASE}/${normalizedPath}?${query}` : `${BASE}/${normalizedPath}`
}

export const API_ENDPOINTS = {
  CMS: {
    LIST: 'techsavvy_app/cms/list/',
    DETAIL: (id: number | string) => `techsavvy_app/cms/${id}/`,
    CREATE: 'techsavvy_app/cms/create/',
    EDIT: (id: number | string) => `techsavvy_app/cms/edit/${id}/`,
    DELETE: (id: number | string) => `techsavvy_app/cms/delete/${id}/`
  },
  UPLOAD: 'techsavvy_app/cms/upload/'
}

export const uploadFiles = async (files: File[]) => {
  const formData = new FormData()
  files.forEach((file) => {
    formData.append('file', file)
  })

  const uploadUrl = getApiUrl(API_ENDPOINTS.UPLOAD)

  const response = await $fetch(uploadUrl, {
    method: 'POST',
    body: formData as any
  })
  return response as any
}

export const fetchCMSPosts = async () => {
  const response = await $fetch(getApiUrl(API_ENDPOINTS.CMS.LIST))
  return response as any[]
}

export const fetchCMSPost = async (id: number | string) => {
  const response = await $fetch(getApiUrl(API_ENDPOINTS.CMS.DETAIL(id)))
  return response as any
}

export const createCMSPost = async (data: any) => {
  const response = await $fetch(getApiUrl(API_ENDPOINTS.CMS.CREATE), {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json'
    }
  })
  return response as any
}

export const updateCMSPost = async (id: number | string, data: any) => {
  const response = await $fetch(getApiUrl(API_ENDPOINTS.CMS.EDIT(id)), {
    method: 'PUT',
    body: data
  })
  return response as any
}

export const deleteCMSPost = async (id: number | string) => {
  const response = await $fetch(getApiUrl(API_ENDPOINTS.CMS.DELETE(id)), {
    method: 'DELETE'
  })
  return response as any
}

