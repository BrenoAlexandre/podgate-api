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
import { injectable } from 'tsyringe';
import { IAuthRequest } from 'interfaces/IAuthRequest';
import { SubscribeUseCase } from 'adapters/useCases/subscriptions';

@injectable()
@Route('/subscription')
@Tags('/subscriptions')
export class SubscribeController extends Controller {
  constructor(private subscribeUseCase: SubscribeUseCase) {
    super();
  }

  @SuccessResponse(200, 'Ok')
  @Response(422, 'Unprocessable Entity')
  @Security('bearer')
  @Put('subscribe')
  @OperationId('subscribe')
  public async handler(
    @Body() request: { feedId: string },
    @Request() req: IAuthRequest
  ) {
    const { user } = req;
    const { feedId } = request;

    const data = { userId: user._id.toString(), feedId };

    const result = await this.subscribeUseCase.execute(data);

    return result;
  }
}
