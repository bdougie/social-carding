import { downloadImage } from '../actions/downloadActions';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const url = searchParams.get('url');
  
  return downloadImage(url);
}
