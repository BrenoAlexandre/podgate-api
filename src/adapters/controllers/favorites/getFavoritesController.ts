import {
  Controller,
  OperationId,
  Response,
  Request,
  Route,
  SuccessResponse,
  Tags,
  Security,
  Get,
} from '@tsoa/runtime';
import { injectable } from 'tsyringe';
import { GetFavoritesUseCase } from 'adapters/useCases/favorites';
import { IFavoriteDocument } from 'models/IFavoriteModel';
import { IAuthRequest } from 'interfaces/IAuthRequest';

@injectable()
@Route('/favorite')
@Tags('/favorites')
export class GetFavoritesController extends Controller {
  constructor(private getFavoritesUseCase: GetFavoritesUseCase) {
    super();
  }

  @SuccessResponse(200, 'Ok')
  @Response(422, 'Unprocessable Entity')
  @Security('bearer')
  @Get()
  @OperationId('addFavorite')
  public async handler(@Request() req: IAuthRequest) {
    const { user } = req;

    const data = { userId: user._id.toString() };

    const result: IFavoriteDocument = await this.getFavoritesUseCase.execute(
      data
    );

    return result;
  }
}
