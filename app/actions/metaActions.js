'use server'

import og from 'open-graph';

export async function fetchMetadata(url) {
  if (!url) {
    return { error: 'URL is required' };
  }

  try {
    const data = await new Promise((resolve, reject) => {
      og(url, (error, results) => {
        if (error) reject(error);
        else resolve(results);
      });
    });
    
    return { data };
  } catch (error) {
    return { 
      error: error.message || 'Failed to fetch metadata' 
    };
  }
}
