import {
  Body,
  Controller,
  OperationId,
  Response,
  Route,
  SuccessResponse,
  Tags,
  Security,
  Put,
} from '@tsoa/runtime';
import { ReplyCasterRequestUseCase } from 'adapters/useCases/casters';
import { injectable } from 'tsyringe';
import { EStatus } from 'enums';

@injectable()
@Route('/caster')
@Tags('/casters')
export class ReplyCasterRequestController extends Controller {
  constructor(private replyCasterRequestUseCase: ReplyCasterRequestUseCase) {
    super();
  }

  @SuccessResponse(201, 'Created')
  @Response(422, 'Unprocessable Entity')
  @Put()
  @Security('bearer')
  @OperationId('replyCasterRequest')
  public async handler(
    @Body()
    request: {
      feedId: string;
      casterId: string;
      requestStatus: EStatus;
    }
  ) {
    const { casterId, feedId, requestStatus } = request;

    const data = { casterId, feedId, requestStatus };

    const result = await this.replyCasterRequestUseCase.execute(data);

    return result;
  }
}
