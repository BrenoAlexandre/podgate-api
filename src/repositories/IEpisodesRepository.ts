import { IEpisodeInput } from 'models/IEpisodeModel';
import { ObjectId } from 'mongodb';

export default interface IEpisodesRepository {
  saveEpisodes(episodes: IEpisodeInput[]): Promise<ObjectId>;
  updateFeedId(episodesId: ObjectId, feedId: ObjectId): Promise<void>;
  updateEpisodes(feedId: string, episodes: IEpisodeInput[]): Promise<void>;
}
