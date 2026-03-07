// Composable for public CMS content with search and filtering
import { ref, computed } from 'vue'

export const useCMSContent = () => {
  const allContent = ref([])
  const loading = ref(false)
  const error = ref(null)
  const searchQuery = ref('')

  const API_URL = 'https://api.techsavvies.space/api/techsavvy_app/cms/list/'

  /**
   * Fetch all CMS content
   */
  const fetchContent = async () => {
    loading.value = true
    error.value = null
    try {
      console.log('Fetching from:', API_URL)
      const response = await fetch(API_URL)
      console.log('Response status:', response.status)
      if (!response.ok) {
        throw new Error('Failed to fetch content')
      }
      const data = await response.json()
      console.log('Fetched data:', data)
      console.log('Data length:', data?.length || 0)
      allContent.value = data
      console.log('allContent.value:', allContent.value)
      return data
    } catch (err) {
      error.value = err.message || 'Failed to load content'
      console.error('Error fetching content:', err)
      return []
    } finally {
      loading.value = false
    }
  }

  /**
   * Filter content by approval status (only published)
   */
  const publishedContent = computed(() => {
    const published = allContent.value.filter(item =>
      item.approval_status === 'published'
    )
    console.log('Published content count:', published.length)
    return published
  })

  /**
   * Filter content by genre/filter
   */
  const filterByGenre = (genre) => {
    if (!genre || genre === 'All') {
      return publishedContent.value
    }
    return publishedContent.value.filter(item => {
      if (!item.filters) return false

      // Handle filters as array or string
      if (Array.isArray(item.filters)) {
        return item.filters.some(filter =>
          filter.toLowerCase().includes(genre.toLowerCase())
        )
      } else {
        const filters = item.filters.toLowerCase()
        return filters.includes(genre.toLowerCase())
      }
    })
  }

  /**
   * Filter content by location
   */
  const filterByLocation = (location) => {
    if (!location) {
      return publishedContent.value
    }
    return publishedContent.value.filter(item => {
      const itemLocation = item.location ? item.location.toLowerCase() : ''
      return itemLocation.includes(location.toLowerCase())
    })
  }

  /**
   * Search content across multiple fields
   * Searches: title, descriptions, filters, location
   */
  const searchContent = computed(() => {
    if (!searchQuery.value) {
      return publishedContent.value
    }

    const query = searchQuery.value.toLowerCase()

    return publishedContent.value.filter(item => {
      // Search fields: title, descriptions, filters, location
      const title = item.title ? item.title.toLowerCase() : ''
      const descriptions = item.descriptions ? item.descriptions.toLowerCase() : ''

      // Handle filters array
      let filtersText = ''
      if (item.filters) {
        if (Array.isArray(item.filters)) {
          filtersText = item.filters.join(' ').toLowerCase()
        } else {
          filtersText = item.filters.toLowerCase()
        }
      }

      const location = item.location ? item.location.toLowerCase() : ''

      return (
        title.includes(query) ||
        descriptions.includes(query) ||
        filtersText.includes(query) ||
        location.includes(query)
      )
    })
  })

  /**
   * Get featured content (first N items)
   */
  const getFeaturedContent = (limit = 10) => {
    return publishedContent.value.slice(0, limit)
  }

  /**
   * Get recent content sorted by date
   */
  const getRecentContent = (limit = 10) => {
    return [...publishedContent.value]
      .sort((a, b) => new Date(b.date) - new Date(a.date))
      .slice(0, limit)
  }

  /**
   * Get upcoming events (future dates)
   */
  const getUpcomingEvents = () => {
    const now = new Date()
    return publishedContent.value
      .filter(item => {
        if (!item.date) return false
        const eventDate = new Date(item.date)
        return eventDate > now
      })
      .sort((a, b) => new Date(a.date) - new Date(b.date))
  }

  /**
   * Get content by multiple filters
   */
  const getFilteredContent = (filters = {}) => {
    let result = publishedContent.value

    // Filter by genre
    if (filters.genre && filters.genre !== 'All') {
      result = result.filter(item => {
        if (!item.filters) return false

        // Handle filters as array or string
        if (Array.isArray(item.filters)) {
          return item.filters.some(filter =>
            filter.toLowerCase().includes(filters.genre.toLowerCase())
          )
        } else {
          const itemFilters = item.filters.toLowerCase()
          return itemFilters.includes(filters.genre.toLowerCase())
        }
      })
    }

    // Filter by location
    if (filters.location) {
      result = result.filter(item => {
        const itemLocation = item.location ? item.location.toLowerCase() : ''
        return itemLocation.includes(filters.location.toLowerCase())
      })
    }

    // Filter by date range
    if (filters.dateFrom) {
      result = result.filter(item => {
        if (!item.date) return false
        return new Date(item.date) >= new Date(filters.dateFrom)
      })
    }

    if (filters.dateTo) {
      result = result.filter(item => {
        if (!item.date) return false
        return new Date(item.date) <= new Date(filters.dateTo)
      })
    }

    return result
  }

  return {
    // State
    allContent,
    loading,
    error,
    searchQuery,
    
    // Computed
    publishedContent,
    searchContent,
    
    // Methods
    fetchContent,
    filterByGenre,
    filterByLocation,
    getFeaturedContent,
    getRecentContent,
    getUpcomingEvents,
    getFilteredContent
  }
}

