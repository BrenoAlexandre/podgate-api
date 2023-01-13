import {
  Body,
  Controller,
  Post,
  OperationId,
  Response,
  Request,
  Route,
  SuccessResponse,
  Tags,
  Security,
} from '@tsoa/runtime';
import { injectable } from 'tsyringe';
import { AddToFavoritesUseCase } from 'adapters/useCases/favorites';
import { IFavoriteDocument } from '../../../models/IFavoriteModel';
import { IAuthRequest } from 'interfaces/IAuthRequest';

@injectable()
@Route('/favorite')
@Tags('/favorites')
export class AddToFavoritesController extends Controller {
  constructor(private addToFavoritesUseCase: AddToFavoritesUseCase) {
    super();
  }

  @SuccessResponse(200, 'Ok')
  @Response(422, 'Unprocessable Entity')
  @Security('bearer')
  @Post()
  @OperationId('addFavorite')
  public async handler(
    @Body() request: { feedId: string },
    @Request() req: IAuthRequest
  ) {
    const { user } = req;
    const { feedId } = request;

    const data = { userId: user._id.toString(), feedId };

    const result: IFavoriteDocument = await this.addToFavoritesUseCase.execute(
      data
    );

    return result;
  }
}
