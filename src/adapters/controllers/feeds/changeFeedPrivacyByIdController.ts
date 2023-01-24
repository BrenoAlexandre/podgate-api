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
  Security,
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
  @Security('bearer')
  @Put('{feedId}')
  @OperationId('changeFeedPrivacyById')
  public async handler(
    @Path() feedId: string,
    @Body() request: { isPrivate: boolean },
    @Request() req: IAuthRequest
  ) {
    const { user } = req;
    const { isPrivate } = request;

    const data = { feedId, userId: user._id.toString(), isPrivate };

    const result: IFeedDocument =
      await this.changeFeedPrivacyByIdUseCase.execute(data);

    return result;
  }
}
