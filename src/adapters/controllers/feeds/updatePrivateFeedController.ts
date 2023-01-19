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
  Request,
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
  @Put('feedPrivacy/{feedId}')
  @OperationId('changeFeedPrivacyById')
  public async handler(@Path() feedId: string, @Request() req: IAuthRequest) {
    const { user } = req;

    const data = { feedId, userId: user._id };

    const result: IFeedDocument =
      await this.changeFeedPrivacyByIdUseCase.execute(data);

    return result;
  }
}
