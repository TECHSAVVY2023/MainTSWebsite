export const useImageUrl = () => {
  const cleanImageUrl = (url?: string) => {
    if (!url) return ''
    const match = url.match(/^(.*?\.(jpg|jpeg|png|gif|webp|svg|bmp|pdf|doc|docx|mp4|mov|avi))/i)
    if (match) return match[1]!
    return url
  }

  const getImageUrl = (item: any, fallbackUrl = 'https://fpstorage.sgp1.cdn.digitaloceanspaces.com/www.techsavvies.space/logo.jpg') => {
    let url = ''
    if (item?.img) {
      url = item.img
    } else if (item?.files && item.files.length > 0) {
      url = item.files[0].url
    } else {
      url = fallbackUrl
    }
    return cleanImageUrl(url)
  }

  return { cleanImageUrl, getImageUrl }
}

