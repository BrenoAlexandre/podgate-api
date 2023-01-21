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
import { UnsubscribeUseCase } from 'adapters/useCases/subscriptions';

@injectable()
@Route('/subscription')
@Tags('/subscriptions')
export class UnsubscribeController extends Controller {
  constructor(private unsubscribeUseCase: UnsubscribeUseCase) {
    super();
  }

  @SuccessResponse(200, 'Ok')
  @Response(422, 'Unprocessable Entity')
  @Security('bearer')
  @Put('unsubscribe')
  @OperationId('unsubscribe')
  public async handler(
    @Body() request: { feedId: string },
    @Request() req: IAuthRequest
  ) {
    const { user } = req;
    const { feedId } = request;

    const data = { userId: user._id.toString(), feedId };

    const result = await this.unsubscribeUseCase.execute(data);

    return result;
  }
}
