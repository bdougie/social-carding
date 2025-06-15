'use server'

import { load } from 'cheerio';

export async function downloadImage(imageUrl) {
  try {
    const response = await fetch(imageUrl);
    if (!response.ok) {
      throw new Error(`Failed to fetch image: ${response.statusText}`);
    }
    
    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const base64 = buffer.toString('base64');
    const contentType = response.headers.get('content-type') || 'image/png';
    
    return {
      success: true,
      data: `data:${contentType};base64,${base64}`,
      contentType
    };
  } catch (error) {
    console.error('Error downloading image:', error);
    return {
      success: false,
      error: error.message
    };
  }
}

export async function fetchMetadata(url) {
  console.log('🔍 Starting metadata fetch for URL:', url);
  
  if (!url) {
    console.error('❌ No URL provided');
    return { error: 'URL is required' };
  }

  try {
    // Step 1: URL Format and Structure Validation
    console.log('📋 Step 1: Validating URL format and structure');
    
    // Ensure URL has protocol
    let normalizedUrl = url.trim();
    console.log('🔧 Original URL:', normalizedUrl);
    
    if (!normalizedUrl.startsWith('http://') && !normalizedUrl.startsWith('https://')) {
      normalizedUrl = 'https://' + normalizedUrl;
      console.log('🔧 Added HTTPS protocol:', normalizedUrl);
    }

    // Validate URL structure
    let parsedUrl;
    try {
      parsedUrl = new URL(normalizedUrl);
      console.log('✅ URL structure valid:', {
        protocol: parsedUrl.protocol,
        hostname: parsedUrl.hostname,
        pathname: parsedUrl.pathname,
        search: parsedUrl.search
      });
    } catch (urlError) {
      console.error('❌ Invalid URL format:', urlError.message);
      return { error: 'Invalid URL format. Please check the URL and try again.' };
    }

    // Check for suspicious or blocked domains
    const blockedDomains = ['localhost', '127.0.0.1', '0.0.0.0'];
    if (blockedDomains.some(domain => parsedUrl.hostname.includes(domain))) {
      console.error('❌ Blocked domain detected:', parsedUrl.hostname);
      return { error: 'Cannot fetch metadata from local or blocked domains' };
    }

    // Step 2: Server-side Network Checks
    console.log('🌐 Step 2: Performing server-side network checks');
    
    // Create AbortController for timeout with longer duration
    const controller = new AbortController();
    const timeoutId = setTimeout(() => {
      console.log('⏰ Request timeout after 30 seconds');
      controller.abort();
    }, 30000);

    // Enhanced headers for better compatibility
    const headers = {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8',
      'Accept-Language': 'en-US,en;q=0.9',
      'Accept-Encoding': 'gzip, deflate, br',
      'Cache-Control': 'no-cache',
      'Pragma': 'no-cache',
      'Sec-Fetch-Dest': 'document',
      'Sec-Fetch-Mode': 'navigate',
      'Sec-Fetch-Site': 'none',
      'Upgrade-Insecure-Requests': '1'
    };

    console.log('📡 Making fetch request with headers:', Object.keys(headers));

    let response;
    try {
      // Try HTTPS first, then fallback to HTTP if needed
      response = await fetch(normalizedUrl, {
        method: 'GET',
        headers,
        signal: controller.signal,
        redirect: 'follow',
        // Add additional options for better compatibility
        mode: 'cors',
        credentials: 'omit'
      });
      
      console.log('📊 Response received:', {
        status: response.status,
        statusText: response.statusText,
        headers: Object.fromEntries(response.headers.entries()),
        url: response.url,
        redirected: response.redirected
      });
      
    } catch (fetchError) {
      console.error('❌ Fetch error details:', {
        name: fetchError.name,
        message: fetchError.message,
        cause: fetchError.cause,
        stack: fetchError.stack
      });
      
      // Try HTTP fallback if HTTPS failed
      if (normalizedUrl.startsWith('https://')) {
        console.log('🔄 Trying HTTP fallback...');
        const httpUrl = normalizedUrl.replace('https://', 'http://');
        
        try {
          response = await fetch(httpUrl, {
            method: 'GET',
            headers,
            signal: controller.signal,
            redirect: 'follow',
            mode: 'cors',
            credentials: 'omit'
          });
          
          console.log('✅ HTTP fallback successful:', response.status);
          normalizedUrl = httpUrl;
          
        } catch (httpError) {
          console.error('❌ HTTP fallback also failed:', httpError.message);
          
          // Provide specific error messages based on error type
          if (fetchError.name === 'AbortError') {
            return { error: 'Request timeout. The website took too long to respond. Please try again.' };
          } else if (fetchError.message.includes('fetch failed') || fetchError.message.includes('network')) {
            return { error: 'Network error. Please check your internet connection and try again. The website might be temporarily unavailable.' };
          } else if (fetchError.message.includes('CORS')) {
            return { error: 'Cross-origin request blocked. This website does not allow external access to its content.' };
          } else {
            return { error: `Failed to fetch URL: ${fetchError.message}. Please verify the URL is correct and accessible.` };
          }
        }
      } else {
        // Provide specific error messages
        if (fetchError.name === 'AbortError') {
          return { error: 'Request timeout. The website took too long to respond. Please try again.' };
        } else if (fetchError.message.includes('fetch failed') || fetchError.message.includes('network')) {
          return { error: 'Network error. Please check your internet connection and try again. The website might be temporarily unavailable.' };
        } else {
          return { error: `Failed to fetch URL: ${fetchError.message}. Please verify the URL is correct and accessible.` };
        }
      }
    } finally {
      clearTimeout(timeoutId);
    }

    // Step 3: Response Validation
    console.log('📋 Step 3: Validating response');
    
    if (!response.ok) {
      console.error('❌ HTTP error:', response.status, response.statusText);
      
      if (response.status === 403) {
        return { error: 'Access forbidden. The website blocks automated requests.' };
      } else if (response.status === 404) {
        return { error: 'Page not found. Please check if the URL is correct.' };
      } else if (response.status === 429) {
        return { error: 'Too many requests. Please wait a moment and try again.' };
      } else if (response.status >= 500) {
        return { error: 'Server error. The website is experiencing technical difficulties.' };
      } else {
        return { error: `HTTP ${response.status}: ${response.statusText}` };
      }
    }

    // Check content type
    const contentType = response.headers.get('content-type') || '';
    console.log('📄 Content-Type:', contentType);
    
    if (!contentType.includes('text/html') && !contentType.includes('application/xhtml')) {
      console.warn('⚠️ Non-HTML content type detected:', contentType);
    }

    // Step 4: Content Processing
    console.log('📝 Step 4: Processing HTML content');
    
    const html = await response.text();
    console.log('📊 HTML content length:', html.length);
    
    if (html.length === 0) {
      return { error: 'Empty response received from the website.' };
    }

    const $ = load(html);

    // Extract metadata with detailed logging
    console.log('🔍 Extracting metadata...');
    
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

    console.log('📊 Extracted metadata:', {
      title: metadata.title ? `"${metadata.title.substring(0, 50)}..."` : 'None',
      description: metadata.description ? `"${metadata.description.substring(0, 50)}..."` : 'None',
      image: metadata.image.url ? 'Found' : 'None',
      site_name: metadata.site_name || 'None'
    });

    // Ensure we have at least some data
    if (!metadata.title && !metadata.description && !metadata.image.url) {
      console.warn('⚠️ No metadata found');
      return { 
        error: 'No social media metadata found. This page may not have Open Graph or Twitter Card tags configured.',
        data: metadata // Still return the basic data
      };
    }

    console.log('✅ Metadata extraction successful');
    return { data: metadata };
    
  } catch (error) {
    console.error('💥 Unexpected error during metadata fetch:', {
      name: error.name,
      message: error.message,
      stack: error.stack
    });
    
    return { 
      error: `Unexpected error: ${error.message || 'Unknown error occurred'}. Please try again.` 
    };
  }
}

