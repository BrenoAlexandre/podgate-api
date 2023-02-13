import {
  Controller,
  OperationId,
  Response,
  Route,
  SuccessResponse,
  Tags,
  Get,
  Request,
  Security,
} from '@tsoa/runtime';
import { injectable } from 'tsyringe';
import { IAuthRequest } from 'interfaces/IAuthRequest';
import { GetSubscriptionsUseCase } from 'adapters/useCases/subscriptions';

@injectable()
@Route('/subscription')
@Tags('/subscriptions')
export class GetSubscriptionsController extends Controller {
  constructor(private getSubscriptionsUseCase: GetSubscriptionsUseCase) {
    super();
  }

  @SuccessResponse(200, 'Ok')
  @Response(422, 'Unprocessable Entity')
  @Security('bearer')
  @Get()
  @OperationId('getSubscriptions')
  public async handler(@Request() req: IAuthRequest) {
    const { user } = req;

    const data = { userId: user._id.toString() };

    const result = await this.getSubscriptionsUseCase.execute(data);

    return result;
  }
}
