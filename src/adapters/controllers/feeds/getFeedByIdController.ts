import {
  Controller,
  OperationId,
  Response,
  Route,
  SuccessResponse,
  Tags,
  Get,
  Path,
} from '@tsoa/runtime';
import { IFeedDocument } from '../../../models/IFeedModel';
import { injectable } from 'tsyringe';
import { GetFeedByIdUseCase } from 'adapters/useCases/feeds';

@injectable()
@Route('/feed')
@Tags('/feeds')
export class FindFeedByIdController extends Controller {
  constructor(private getFeedByIdUseCase: GetFeedByIdUseCase) {
    super();
  }

  @SuccessResponse(200, 'Ok')
  @Response(422, 'Unprocessable Entity')
  @Get('{feedId}')
  @OperationId('findFeedById')
  public async handler(@Path() feedId: string) {
    const data = { feedId };

    const result: IFeedDocument = await this.getFeedByIdUseCase.execute(data);

    return result;
  }
}
