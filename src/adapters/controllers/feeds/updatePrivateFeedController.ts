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
import { UpdatePrivateFeedUseCase } from 'adapters/useCases/feeds';
import { IAuthRequest } from 'interfaces/IAuthRequest';

@injectable()
@Route('/feed/private')
@Tags('/feeds')
export class ChangeFeedPrivacyByIdController extends Controller {
  constructor(private updatePrivateFeedUseCase: UpdatePrivateFeedUseCase) {
    super();
  }

  @SuccessResponse(200, 'Ok')
  @Response(422, 'Unprocessable Entity')
  @Put('feedPrivacy')
  @Security('bearer')
  @OperationId('updatePrivateFeed')
  public async handler(
    @Body()
    request: { feedId: string; attachTo?: string; isPrivate: boolean },
    @Request() req: IAuthRequest
  ) {
    const { user } = req;
    const { feedId, attachTo = '', isPrivate } = request;

    const data = { feedId, attachTo, userId: user._id.toString(), isPrivate };

    const result: IFeedDocument = await this.updatePrivateFeedUseCase.execute(
      data
    );

    return result;
  }
}
