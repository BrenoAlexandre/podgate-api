import {
  Body,
  Controller,
  Post,
  OperationId,
  Response,
  Route,
  SuccessResponse,
  Tags,
  Security,
  Request,
} from '@tsoa/runtime';
import { SubmitCasterRequestUseCase } from 'adapters/useCases/casters';
import { IAuthRequest } from 'interfaces/IAuthRequest';
import { injectable } from 'tsyringe';

@injectable()
@Route('/caster')
@Tags('/casters')
export class SubmitCasterRequestController extends Controller {
  constructor(private submitCasterRequestUseCase: SubmitCasterRequestUseCase) {
    super();
  }

  @SuccessResponse(201, 'Created')
  @Response(422, 'Unprocessable Entity')
  @Post()
  @Security('bearer')
  @OperationId('submitCasterRequest')
  public async handler(
    @Body() request: { feedId: string; proofUrl: string },
    @Request() req: IAuthRequest
  ) {
    const { user } = req;
    const { feedId, proofUrl } = request;

    const data = { userId: user._id.toString(), feedId, proofUrl };

    const result = await this.submitCasterRequestUseCase.execute(data);

    return result;
  }
}
