import {
  fetchCMSPosts,
  fetchCMSPost,
  createCMSPost,
  updateCMSPost,
  deleteCMSPost,
  uploadFiles
} from '~/utils/api'

export const useCMS = () => {
  const posts = ref<any[]>([])
  const currentPost = ref<any | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)

  const loadPosts = async () => {
    loading.value = true
    error.value = null
    try {
      posts.value = await fetchCMSPosts()
    } catch (err: any) {
      error.value = err?.message || 'Failed to load posts'
      console.error('Error loading posts:', err)
    } finally {
      loading.value = false
    }
  }

  const loadPost = async (id: number | string) => {
    loading.value = true
    error.value = null
    try {
      currentPost.value = await fetchCMSPost(id)
    } catch (err: any) {
      error.value = err?.message || 'Failed to load post'
      console.error('Error loading post:', err)
    } finally {
      loading.value = false
    }
  }

  const createPost = async (data: any) => {
    loading.value = true
    error.value = null
    try {
      const response = await createCMSPost(data)
      await loadPosts()
      return response
    } catch (err: any) {
      error.value = err?.message || 'Failed to create post'
      console.error('Error creating post:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  const updatePost = async (id: number | string, data: any) => {
    loading.value = true
    error.value = null
    try {
      const response = await updateCMSPost(id, data)
      await loadPosts()
      return response
    } catch (err: any) {
      error.value = err?.message || 'Failed to update post'
      console.error('Error updating post:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  const deletePost = async (id: number | string) => {
    loading.value = true
    error.value = null
    try {
      const response = await deleteCMSPost(id)
      await loadPosts()
      return response
    } catch (err: any) {
      error.value = err?.message || 'Failed to delete post'
      console.error('Error deleting post:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  const uploadMultipleFiles = async (files: File[]) => {
    loading.value = true
    error.value = null
    try {
      const response: any = await uploadFiles(files)
      return response.uploaded_files
    } catch (err: any) {
      error.value = err?.message || 'Failed to upload files'
      console.error('Error uploading files:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  return {
    posts,
    currentPost,
    loading,
    error,
    loadPosts,
    loadPost,
    createPost,
    updatePost,
    deletePost,
    uploadMultipleFiles
  }
}

