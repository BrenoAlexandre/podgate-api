import {
  Body,
  Controller,
  OperationId,
  Response,
  Route,
  SuccessResponse,
  Tags,
  Put,
  Request,
  Security,
} from '@tsoa/runtime';
import { IFeedDocument } from '../../../models/IFeedModel';
import { injectable } from 'tsyringe';
import { ChangeFeedPrivacyByIdUseCase } from 'adapters/useCases/feeds';
import { IAuthRequest } from 'interfaces/IAuthRequest';

@injectable()
@Route('/feed/private')
@Tags('/feeds')
export class ChangeFeedPrivacyByIdController extends Controller {
  constructor(
    private changeFeedPrivacyByIdUseCase: ChangeFeedPrivacyByIdUseCase
  ) {
    super();
  }

  @SuccessResponse(200, 'Ok')
  @Response(422, 'Unprocessable Entity')
  @Put('feedPrivacy')
  @Security('bearer')
  @OperationId('changeFeedPrivacyById')
  public async handler(
    @Body() request: { feedId: string; isPrivate: boolean },
    @Request() req: IAuthRequest
  ) {
    const { user } = req;
    const { feedId, isPrivate } = request;

    const data = { feedId, isPrivate, userId: user._id };

    const result: IFeedDocument =
      await this.changeFeedPrivacyByIdUseCase.execute(data);

    return result;
  }
}
