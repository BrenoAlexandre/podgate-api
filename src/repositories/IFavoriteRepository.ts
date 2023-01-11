import { IFavoriteDocument } from 'models/IFavoriteModel';

export default interface IFavoriteRepository {
  create(userId: string, feedId: string): Promise<IFavoriteDocument | null>;
  findFavoritesList(userId: string): Promise<IFavoriteDocument | null>;
  addToList(userId: string, feedId: string): Promise<IFavoriteDocument | null>;
  removeFromList(
    userId: string,
    feedId: string
  ): Promise<IFavoriteDocument | null>;
}
