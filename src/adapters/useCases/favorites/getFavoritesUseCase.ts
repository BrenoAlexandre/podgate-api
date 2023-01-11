import { singleton } from 'tsyringe';
import { CustomError } from 'config/CustomError';
import FavoriteRepository from 'repositories/implementations/FavoriteRepository';
import { IFavoriteDocument } from 'models/IFavoriteModel';

@singleton()
export class GetFavoritesUseCase {
  constructor(private favoriteRepository: FavoriteRepository) {}

  public async execute(data: { userId: string }): Promise<IFavoriteDocument> {
    const { userId } = data;

    const favList = await this.favoriteRepository.findFavoritesList(userId);

    if (!favList) {
      throw CustomError.badRequest(`User doesn't have favorites.`);
    }

    return favList;
  }
}
