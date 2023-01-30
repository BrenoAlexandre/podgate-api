import axios from 'axios';
import { IEpisodeInput } from 'models/IEpisodeModel';
import { parseString } from 'xml2js';

export const fetchFeed = async (url: string) => {
  const feedJson = await fetchData(url);
  const result = formatData(feedJson);

  return result;
};

const fetchData = async (url: string) => {
  try {
    const feed = await axios.get(url);
    return await new Promise((resolve, reject) =>
      parseString(feed.data, function (err, result) {
        if (err) {
          reject(err);
        }
        resolve(result.rss);
      })
    );
  } catch (err) {
    console.error(err);
  }
};

const formatData = (feedJson: any) => {
  const episodeData: IEpisodeInput[] = feedJson.channel[0].item.map(
    (episode: any) => {
      return {
        photoUrl:
          typeof episode['itunes:image'] == 'undefined'
            ? feedJson.channel[0].image[0].url[0]
            : episode['itunes:image'][0].$.href,
        title: episode.title[0],
        description: episode.description[0],
        length: episode['itunes:duration'][0],
        pubDate: episode.pubDate[0],
        audioUrl: episode.enclosure.url || episode.enclosure[0].$.url,
      };
    }
  );

  const feedData = {
    title: feedJson.channel[0].title[0],
    description: feedJson.channel[0].description[0],
    author:
      typeof feedJson.channel[0].author == 'undefined'
        ? feedJson.channel[0]['itunes:author'][0]
        : feedJson.channel[0].author[0],
    photoUrl: feedJson.channel[0].image[0].url[0],
    category: feedJson.channel[0]['itunes:category'][0].$.text,
  };

  return { episodeData, feedData };
};
