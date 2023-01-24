import { IEpisodeInput } from 'models/IEpisodeModel';
import EpisodeModel from 'models/implementations/EpisodeModel';
import { ObjectId } from 'mongodb';
import IEpisodesRepository from '../IEpisodesRepository';

export default class EpisodeRepository implements IEpisodesRepository {
  async saveEpisodes(episodes: IEpisodeInput[]): Promise<ObjectId> {
    const newEpisodeList = await EpisodeModel.create({
      feedId: null,
      episodes: episodes,
    });

    newEpisodeList.save();

    return newEpisodeList._id;
  }

  async updateFeedId(episodesId: ObjectId, feedId: ObjectId): Promise<void> {
    const episodesList = await EpisodeModel.findById(episodesId);
    episodesList?.changeFeedId(feedId);
  }

  async updateEpisodes(
    feedId: string,
    episodes: IEpisodeInput[]
  ): Promise<void> {
    const episodesList = await EpisodeModel.findOne({ feedId });

    if (!episodesList) return;

    episodesList.episodes = episodes;
  }
}
