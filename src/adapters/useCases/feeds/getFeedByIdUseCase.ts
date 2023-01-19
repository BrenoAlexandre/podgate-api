import { singleton } from 'tsyringe';
import { CustomError } from 'config/CustomError';
import FeedRepository from 'repositories/implementations/FeedRepository';
import { IFeedDocument } from 'models/IFeedModel';
import EpisodeRepository from 'repositories/implementations/EpisodeRepository';
import { IEpisodeInput } from 'models/IEpisodeModel';
import { parseString } from 'xml2js';
import axios from 'axios';

@singleton()
export class GetFeedByIdUseCase {
  constructor(
    private feedRepository: FeedRepository,
    private episodeRepository: EpisodeRepository
  ) {}

  private async fetchFeedData(url: string) {
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
  }

  private async fetchNewEpisodes(
    feedId: string,
    feedUrl: string
  ): Promise<void> {
    const feedData: any = await this.fetchFeedData(feedUrl);

    const episodes: IEpisodeInput[] = feedData.channel[0].item.map(
      (episode: any) => {
        return {
          photoUrl: episode['itunes:image'][0],
          title: episode.title[0],
          description: episode.description[0],
          length: episode['itunes:duration'][0],
          pubDate: episode.pubDate[0],
        };
      }
    );

    await this.episodeRepository.updateEpisodes(feedId, episodes);
  }

  public async execute(data: { feedId: string }): Promise<IFeedDocument> {
    const { feedId } = data;

    const result = await this.feedRepository.findFeedById(feedId);

    if (!result) {
      throw CustomError.badRequest('Unable to find feed.');
    }

    await this.fetchNewEpisodes(feedId, result.url);

    return result;
  }
}
