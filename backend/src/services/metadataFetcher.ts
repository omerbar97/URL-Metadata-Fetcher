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
        const { data } = await axios.get(prefixHttps(url));
        const $ = cheerio.load(data);
        const title = $('head title').text();
        const description = $('meta[name="description"]').attr('content') || 'No description available';
        const image = $('meta[property="og:image"]').attr('content') || '';
        return { title, description, image, isFailed: false, url: url};
      } catch (error) {
        console.log("Failed to get information for: ", url)
        return { title: 'Failed to fetch', description: 'Error retrieving metadata', image: '', isFailed: true, url:url};
      }
    })
  );
  return metadataResults;
};
