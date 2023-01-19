import { IEpisodeInput } from 'models/IEpisodeModel';

export default interface IEpisodesRepository {
  saveEpisodes(episodes: IEpisodeInput[]): Promise<string>;
  updateFeedId(episodesId: string, feedId: string): Promise<void>;
}
