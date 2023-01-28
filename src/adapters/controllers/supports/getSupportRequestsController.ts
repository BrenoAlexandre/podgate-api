import {
  Body,
  Controller,
  OperationId,
  Response,
  Route,
  SuccessResponse,
  Tags,
  Security,
  Get,
} from '@tsoa/runtime';
import { GetSupportRequestsUseCase } from 'adapters/useCases/supports';
import { injectable } from 'tsyringe';

@injectable()
@Route('/support')
@Tags('/supports')
export class GetSupportRequestsController extends Controller {
  constructor(private getSupportRequestsUseCase: GetSupportRequestsUseCase) {
    super();
  }

  @SuccessResponse(200, 'Ok')
  @Response(404, 'Not Found')
  @Get()
  @Security('bearer')
  @OperationId('getSupportRequests')
  public async handler(@Body() request: { feedId: string }) {
    const { feedId } = request;

    const result = await this.getSupportRequestsUseCase.execute(feedId);

    return result;
  }
}
