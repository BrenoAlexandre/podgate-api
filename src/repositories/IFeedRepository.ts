import { IFeedDocument, IFeedInput } from 'models/IFeedModel';

export default interface IFeedRepository {
  save(feed: IFeedInput): Promise<IFeedDocument | null>;
  findFeedByUrl(url: string): Promise<IFeedDocument | null>;
  findFeedById(id: string): Promise<IFeedDocument | null>;
  fetchFeedsGenres(): Promise<
    { genre: string; feeds: IFeedDocument[] }[] | null
  >;
  fetchFeedsByGenre(genre: string): Promise<IFeedDocument[] | null>;
  deleteFeedById(id: string): Promise<boolean>;
  changeFeedPrivacy(
    id: string,
    privacy: boolean
  ): Promise<IFeedDocument | null>;
  claimFeed(feedId: string, ownerId: string): Promise<IFeedDocument | null>;
}
