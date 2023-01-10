import {
  Get,
  Controller,
  OperationId,
  Response,
  Route,
  SuccessResponse,
  Tags,
  Path,
} from '@tsoa/runtime';
import { IFeedDocument } from '../../../models/IFeedModel';
import { injectable } from 'tsyringe';
import { GetFeedsByCategoryUseCase } from 'adapters/useCases/feeds';

@injectable()
@Route('/feed')
@Tags('/feeds')
export class GetFeedsByCategoryController extends Controller {
  constructor(private getFeedsByCategoryUseCase: GetFeedsByCategoryUseCase) {
    super();
  }

  @SuccessResponse(200, 'Ok')
  @Response(422, 'Unprocessable Entity')
  @Get('category/{category}')
  @OperationId('getFeedsByCategory')
  public async handler(@Path() category: string) {
    const data = { category };

    const result: IFeedDocument[] =
      await this.getFeedsByCategoryUseCase.execute(data);

    return result;
  }
}
