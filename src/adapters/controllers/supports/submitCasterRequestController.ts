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
import { SubmitSupportRequestUseCase } from 'adapters/useCases/supports';
import { IAuthRequest } from 'interfaces/IAuthRequest';
import { injectable } from 'tsyringe';

@injectable()
@Route('/support')
@Tags('/supports')
export class SubmitSupportRequestController extends Controller {
  constructor(
    private submitSupportRequestUseCase: SubmitSupportRequestUseCase
  ) {
    super();
  }

  @SuccessResponse(201, 'Created')
  @Response(422, 'Unprocessable Entity')
  @Post()
  @Security('bearer')
  @OperationId('submitSupportRequest')
  public async handler(
    @Body() request: { feedId: string; receiptUrl: string },
    @Request() req: IAuthRequest
  ) {
    const { user } = req;
    const { feedId, receiptUrl } = request;

    const data = { userId: user._id.toString(), feedId, receiptUrl };

    const result = await this.submitSupportRequestUseCase.execute(data);

    return result;
  }
}
