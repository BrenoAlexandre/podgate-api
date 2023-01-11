import { IFavoriteDocument } from 'models/IFavoriteModel';
import FavoriteModel from 'models/implementations/FavoriteModel';
import IFavoriteRepository from 'repositories/IFavoriteRepository';

export default class FavoriteRepository implements IFavoriteRepository {
  async create(
    userId: string,
    feedId: string
  ): Promise<IFavoriteDocument | null> {
    const data = { userId, feedsId: [feedId] };

    const newList = await FavoriteModel.create(data);

    return newList ?? null;
  }

  async findFavoritesList(userId: string): Promise<IFavoriteDocument | null> {
    const list = await FavoriteModel.findOne({ userId });
    return list ?? null;
  }

  async addToList(
    userId: string,
    feedId: string
  ): Promise<IFavoriteDocument | null> {
    const list = await FavoriteModel.findOne({ userId });

    if (!list) return null;

    const newList = list.addFeed(feedId);
    return newList;
  }

  async removeFromList(
    userId: string,
    feedId: string
  ): Promise<IFavoriteDocument | null> {
    const list = await FavoriteModel.findOne({ userId });

    if (!list) return null;

    const newList = list.removeFeed(feedId);
    return newList;
  }
}
