import { IEpisodeInput } from 'models/IEpisodeModel';
import EpisodeModel from 'models/implementations/EpisodeModel';
import IEpisodesRepository from '../IEpisodesRepository';

export default class EpisodeRepository implements IEpisodesRepository {
  async saveEpisodes(episodes: IEpisodeInput[]): Promise<string> {
    const newEpisodeList = await EpisodeModel.create({
      feedId: null,
      episodes: episodes,
    });

    newEpisodeList.save();

    return newEpisodeList._id.toString();
  }

  async updateFeedId(episodesId: string, feedId: string): Promise<void> {
    const episodesList = await EpisodeModel.findById(episodesId);
    episodesList?.changeFeedId(feedId);
  }
}
