import {
  Controller,
  OperationId,
  Response,
  Route,
  SuccessResponse,
  Tags,
  Security,
} from '@tsoa/runtime';
import { Get } from '@tsoa/runtime/dist/decorators/methods';
import { GetUserSupportsUseCase } from 'adapters/useCases/supports';
import { IAuthRequest } from 'interfaces/IAuthRequest';
import { Request } from 'tsoa';
import { injectable } from 'tsyringe';

@injectable()
@Route('/support')
@Tags('/supports')
export class GetUserSupportsController extends Controller {
  constructor(private getUserSupportsUseCase: GetUserSupportsUseCase) {
    super();
  }

  @SuccessResponse(200, 'Ok')
  @Response(404, 'Not Found')
  @Get('user')
  @Security('bearer')
  @OperationId('getUserSupport')
  public async handler(@Request() req: IAuthRequest) {
    const { user } = req;

    const result = await this.getUserSupportsUseCase.execute(
      user._id.toString()
    );

    return result;
  }
}
