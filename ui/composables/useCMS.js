// Composable for CMS data management
import { 
  fetchCMSPosts, 
  fetchCMSPost, 
  createCMSPost, 
  updateCMSPost, 
  deleteCMSPost,
  uploadFiles 
} from '~/app/utils/api';

export const useCMS = () => {
  const posts = ref([]);
  const currentPost = ref(null);
  const loading = ref(false);
  const error = ref(null);

  /**
   * Load all CMS posts
   */
  const loadPosts = async () => {
    loading.value = true;
    error.value = null;
    try {
      posts.value = await fetchCMSPosts();
    } catch (err) {
      error.value = err.message || 'Failed to load posts';
      console.error('Error loading posts:', err);
    } finally {
      loading.value = false;
    }
  };

  /**
   * Load a single post by ID
   */
  const loadPost = async (id) => {
    loading.value = true;
    error.value = null;
    try {
      currentPost.value = await fetchCMSPost(id);
    } catch (err) {
      error.value = err.message || 'Failed to load post';
      console.error('Error loading post:', err);
    } finally {
      loading.value = false;
    }
  };

  /**
   * Create a new post
   */
  const createPost = async (data) => {
    loading.value = true;
    error.value = null;
    try {
      const response = await createCMSPost(data);
      await loadPosts(); // Refresh the list
      return response;
    } catch (err) {
      error.value = err.message || 'Failed to create post';
      console.error('Error creating post:', err);
      throw err;
    } finally {
      loading.value = false;
    }
  };

  /**
   * Update an existing post
   */
  const updatePost = async (id, data) => {
    loading.value = true;
    error.value = null;
    try {
      const response = await updateCMSPost(id, data);
      await loadPosts(); // Refresh the list
      return response;
    } catch (err) {
      error.value = err.message || 'Failed to update post';
      console.error('Error updating post:', err);
      throw err;
    } finally {
      loading.value = false;
    }
  };

  /**
   * Delete a post
   */
  const deletePost = async (id) => {
    loading.value = true;
    error.value = null;
    try {
      const response = await deleteCMSPost(id);
      await loadPosts(); // Refresh the list
      return response;
    } catch (err) {
      error.value = err.message || 'Failed to delete post';
      console.error('Error deleting post:', err);
      throw err;
    } finally {
      loading.value = false;
    }
  };

  /**
   * Upload multiple files
   */
  const uploadMultipleFiles = async (files) => {
    loading.value = true;
    error.value = null;
    try {
      const response = await uploadFiles(files);
      return response.uploaded_files; // Returns array of {name, url}
    } catch (err) {
      error.value = err.message || 'Failed to upload files';
      console.error('Error uploading files:', err);
      throw err;
    } finally {
      loading.value = false;
    }
  };

  return {
    // State
    posts,
    currentPost,
    loading,
    error,
    
    // Methods
    loadPosts,
    loadPost,
    createPost,
    updatePost,
    deletePost,
    uploadMultipleFiles,
  };
};

