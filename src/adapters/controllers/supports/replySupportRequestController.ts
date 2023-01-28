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
import { ReplySupportRequestUseCase } from 'adapters/useCases/supports';
import { injectable } from 'tsyringe';
import { EStatus } from 'enums';

@injectable()
@Route('/support')
@Tags('/supports')
export class ReplySupportRequestController extends Controller {
  constructor(private replySupportRequestUseCase: ReplySupportRequestUseCase) {
    super();
  }

  @SuccessResponse(201, 'Created')
  @Response(422, 'Unprocessable Entity')
  @Put()
  @Security('bearer')
  @OperationId('replySupportRequest')
  public async handler(
    @Body()
    request: {
      supportId: string;
      feedId: string;
      requestStatus: EStatus;
    }
  ) {
    const { feedId, supportId, requestStatus } = request;

    const data = { feedId, supportId, requestStatus };

    const result = await this.replySupportRequestUseCase.execute(data);

    return result;
  }
}
