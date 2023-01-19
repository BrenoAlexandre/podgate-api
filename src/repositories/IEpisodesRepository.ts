import { IEpisodeInput } from 'models/IEpisodeModel';

export default interface IEpisodesRepository {
  saveEpisodes(episodes: IEpisodeInput[]): Promise<string>;
  updateFeedId(episodesId: string, feedId: string): Promise<void>;
  updateEpisodes(feedId: string, episodes: IEpisodeInput[]): Promise<void>;
}
