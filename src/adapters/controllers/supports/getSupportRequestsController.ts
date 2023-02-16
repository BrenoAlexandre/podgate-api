import {
  Body,
  Controller,
  OperationId,
  Response,
  Route,
  SuccessResponse,
  Tags,
  Security,
} from '@tsoa/runtime';
import { Get } from '@tsoa/runtime/dist/decorators/methods';
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
  public async handler() {
    const result = await this.getSupportRequestsUseCase.execute();

    return result;
  }
}
