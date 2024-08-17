import axios from 'axios';
import * as cheerio from 'cheerio'; // For HTML parsing

export const fetchMetadata = async (urls: string[]) => {
  const metadataResults = await Promise.all(
    urls.map(async (url: string) => {
      try {
        const { data } = await axios.get(url);
        const $ = cheerio.load(data);

        const title = $('head title').text();
        const description = $('meta[name="description"]').attr('content') || 'No description available';
        const image = $('meta[property="og:image"]').attr('content') || '';

        return { title, description, image };
      } catch (error) {
        return { title: 'Failed to fetch', description: 'Error retrieving metadata', image: '' };
      }
    })
  );
  return metadataResults;
};
