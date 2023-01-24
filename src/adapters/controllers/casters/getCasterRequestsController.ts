import {
  Body,
  Controller,
  OperationId,
  Response,
  Route,
  SuccessResponse,
  Tags,
  Security,
  Request,
  Get,
} from '@tsoa/runtime';
import { GetCasterRequestsUseCase } from 'adapters/useCases/casters';
import { IAuthRequest } from 'interfaces/IAuthRequest';
import { injectable } from 'tsyringe';

@injectable()
@Route('/caster')
@Tags('/casters')
export class GetCasterRequestsController extends Controller {
  constructor(private getCasterRequestsUseCase: GetCasterRequestsUseCase) {
    super();
  }

  @SuccessResponse(200, 'Ok')
  @Response(404, 'Not Found')
  @Get()
  @Security('bearer')
  @OperationId('getCasterRequests')
  public async handler(@Request() req: IAuthRequest) {
    const { user } = req;

    if (user.email === 'admin@admin.com') {
      const result = await this.getCasterRequestsUseCase.execute();

      return result;
    } else {
      this.setStatus(404);
    }
  }
}
