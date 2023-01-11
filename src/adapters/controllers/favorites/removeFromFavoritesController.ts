import {
  Body,
  Controller,
  Delete,
  OperationId,
  Response,
  Request,
  Route,
  SuccessResponse,
  Tags,
  Security,
} from '@tsoa/runtime';
import { injectable } from 'tsyringe';
import { RemoveFromFavoritesUseCase } from 'adapters/useCases/favorites';
import { IFavoriteDocument } from 'models/IFavoriteModel';
import { IAuthRequest } from 'interfaces/IAuthRequest';

@injectable()
@Route('/favorite')
@Tags('/favorites')
export class RemoveFromFavoritesController extends Controller {
  constructor(private removeFromFavoritesUseCase: RemoveFromFavoritesUseCase) {
    super();
  }

  @SuccessResponse(200, 'Ok')
  @Response(422, 'Unprocessable Entity')
  @Security('bearer')
  @Delete()
  @OperationId('addFavorite')
  public async handler(
    @Body() request: { feedId: string },
    @Request() req: IAuthRequest
  ) {
    const { user } = req;
    const { feedId } = request;

    const data = { userId: user._id.toString(), feedId };

    const result: IFavoriteDocument =
      await this.removeFromFavoritesUseCase.execute(data);

    return result;
  }
}
