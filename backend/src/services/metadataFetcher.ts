import axios from 'axios';
import * as cheerio from 'cheerio';
import Metadata from '../model/metadataModel';

function prefixHttps(url: string): string {
    // Check if the URL already starts with 'http://' or 'https://'
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
      return `https://${url}`;
    }
    return url;
  }

export const fetchMetadata = async (urls: string[]): Promise<Metadata[]>  => {
  const metadataResults = await Promise.all(
    urls.map(async (url: string) => {
      try {
        console.log("Requesting site: ", url)
        const fixedUrl = prefixHttps(url)
        const { data } = await axios.get(fixedUrl);
        const $ = cheerio.load(data);
        const title = $('head title').text();
        const description = $('meta[name="description"]').attr('content') || 'No description available';
        let image = $('meta[property="og:image"]').attr('content') || '';
        if (image !== '') {
          image= image.startsWith('http') ? image : new URL(image, fixedUrl).href;
        } else {
          // image is empty, Extract favicon - fallback!
          let favicon = $('link[rel="icon"]').attr('href') ||
          $('link[rel="shortcut icon"]').attr('href') ||
          $('link[rel="apple-touch-icon"]').attr('href') || '';
          // Ensure favicon URL is absolute
          if (favicon && !favicon.startsWith('http')) {
            favicon = new URL(favicon, prefixHttps(url)).href;
          }
          image = favicon
        }
        return { title, description, image, isFailed: false, url: fixedUrl};
      } catch (error) {
        console.log("Failed to get information for: ", url, " error: ", error)
        return { title: 'Failed to fetch', description: 'Error retrieving metadata', image: '', isFailed: true, url:url};
      }
    })
  );
  return metadataResults;
};
