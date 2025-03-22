'use server'

import { NextResponse } from 'next/server';

export async function downloadImage(url) {
  try {
    if (!url) {
      return new Response('URL is required', { status: 400 });
    }

    // Fetch the image from the provided URL
    const imageResponse = await fetch(url);
    
    if (!imageResponse.ok) {
      throw new Error(`Failed to fetch image: ${imageResponse.statusText}`);
    }

    // Get the image data as a buffer
    const imageBuffer = await imageResponse.arrayBuffer();
    
    // Extract filename from URL or use a default name
    const urlObj = new URL(url);
    const pathSegments = urlObj.pathname.split('/');
    const filename = pathSegments[pathSegments.length - 1] || 'image';
    
    // Determine content type based on file extension or use a default
    let contentType = 'image/jpeg'; // Default content type
    if (filename.endsWith('.png')) contentType = 'image/png';
    if (filename.endsWith('.gif')) contentType = 'image/gif';
    if (filename.endsWith('.webp')) contentType = 'image/webp';

    // Create a new response with appropriate headers for download
    return new Response(imageBuffer, {
      headers: {
        'Content-Type': contentType,
        'Content-Disposition': `attachment; filename="${filename}"`,
        'Content-Length': imageBuffer.byteLength.toString()
      }
    });
  } catch (error) {
    console.error('Error downloading image:', error);
    return new Response(`Error downloading image: ${error.message}`, { status: 500 });
  }
}
