import {
  Body,
  Controller,
  OperationId,
  Response,
  Route,
  SuccessResponse,
  Tags,
  Put,
  Path,
} from '@tsoa/runtime';
import { IFeedDocument } from '../../../models/IFeedModel';
import { injectable } from 'tsyringe';
import { ChangeFeedPrivacyByIdUseCase } from 'adapters/useCases/feeds';

@injectable()
@Route('/feed')
@Tags('/feeds')
export class ChangeFeedPrivacyByIdController extends Controller {
  constructor(
    private changeFeedPrivacyByIdUseCase: ChangeFeedPrivacyByIdUseCase
  ) {
    super();
  }

  @SuccessResponse(200, 'Ok')
  @Response(422, 'Unprocessable Entity')
  @Put('feedPrivacy/{feedId}')
  @OperationId('changeFeedPrivacyById')
  public async handler(
    @Path() feedId: string,
    @Body() request: { isPrivate: boolean }
  ) {
    const { isPrivate } = request;

    const data = { feedId, isPrivate };

    const result: IFeedDocument =
      await this.changeFeedPrivacyByIdUseCase.execute(data);

    return result;
  }
}
