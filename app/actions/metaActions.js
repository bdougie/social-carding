'use server'

import { load } from 'cheerio';

export async function fetchMetadata(url) {
  if (!url) {
    return { error: 'URL is required' };
  }

  try {
    // Ensure URL has protocol
    let normalizedUrl = url;
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
      normalizedUrl = 'https://' + url;
    }

    // Validate URL
    try {
      new URL(normalizedUrl);
    } catch {
      return { error: 'Invalid URL format' };
    }

    const response = await fetch(normalizedUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      },
      timeout: 10000
    });

    if (!response.ok) {
      return { error: `Failed to fetch URL: ${response.status} ${response.statusText}` };
    }

    const html = await response.text();
    const $ = load(html);

    // Extract metadata
    const metadata = {
      title: $('meta[property="og:title"]').attr('content') || 
             $('meta[name="twitter:title"]').attr('content') || 
             $('title').text() || '',
      
      description: $('meta[property="og:description"]').attr('content') || 
                   $('meta[name="twitter:description"]').attr('content') || 
                   $('meta[name="description"]').attr('content') || '',
      
      image: {
        url: $('meta[property="og:image"]').attr('content') || 
             $('meta[name="twitter:image"]').attr('content') || ''
      },
      
      url: $('meta[property="og:url"]').attr('content') || normalizedUrl,
      
      site_name: $('meta[property="og:site_name"]').attr('content') || 
                 $('meta[name="application-name"]').attr('content') || '',
      
      type: $('meta[property="og:type"]').attr('content') || 'website'
    };

    // Clean up the data
    Object.keys(metadata).forEach(key => {
      if (typeof metadata[key] === 'string') {
        metadata[key] = metadata[key].trim();
      }
    });

    // Ensure we have at least some data
    if (!metadata.title && !metadata.description && !metadata.image.url) {
      return { error: 'No metadata found for this URL. The page may not have Open Graph or Twitter Card tags.' };
    }

    return { data: metadata };
    
  } catch (error) {
    console.error('Metadata fetch error:', error);
    return { 
      error: `Failed to fetch metadata: ${error.message || 'Unknown error'}` 
    };
  }
}