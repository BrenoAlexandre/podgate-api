import { singleton } from 'tsyringe';
import { CustomError } from 'config/CustomError';
import FavoriteRepository from 'repositories/implementations/FavoriteRepository';
import FeedRepository from 'repositories/implementations/FeedRepository';
import { IFavoriteDocument } from 'models/IFavoriteModel';

@singleton()
export class RemoveFromFavoritesUseCase {
  constructor(
    private favoriteRepository: FavoriteRepository,
    private feedRepository: FeedRepository
  ) {}

  private async validate(feedId: string) {
    const errors = [];

    const feed = await this.feedRepository.findFeedById(feedId);

    if (!feed) errors.push('Feed does not exist');

    if (errors.length > 0) {
      throw CustomError.badRequest(
        'Unable to remove feed to favorites',
        errors
      );
    }
  }

  public async execute(data: {
    userId: string;
    feedId: string;
  }): Promise<IFavoriteDocument> {
    const { userId, feedId } = data;

    this.validate(feedId);

    const hasList = await this.favoriteRepository.findFavoritesList(userId);

    if (!hasList) {
      const newList = await this.favoriteRepository.create(userId, '');
      if (!newList) {
        throw CustomError.badRequest('Unable to create favorites list.');
      }
      return newList;
    }

    const newList = await this.favoriteRepository.removeFromList(
      userId,
      feedId
    );

    if (!newList) {
      throw CustomError.badRequest('Unable to remove from favorites.');
    }

    return newList;
  }
}
