// Client-side URL validation utilities

export function validateUrl(url) {
  if (!url || typeof url !== 'string') {
    return { valid: false, error: 'URL is required' };
  }

  const trimmedUrl = url.trim();
  
  if (trimmedUrl.length === 0) {
    return { valid: false, error: 'URL cannot be empty' };
  }

  // Check for basic URL patterns
  const urlPattern = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/i;
  
  if (!urlPattern.test(trimmedUrl)) {
    return { valid: false, error: 'Please enter a valid URL format' };
  }

  return { valid: true, normalizedUrl: trimmedUrl };
}