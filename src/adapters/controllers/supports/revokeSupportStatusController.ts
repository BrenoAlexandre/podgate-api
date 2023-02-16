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
import { RevokeSupportStatusUseCase } from 'adapters/useCases/supports';
import { injectable } from 'tsyringe';

@injectable()
@Route('/support')
@Tags('/supports')
export class RevokeSupportStatusController extends Controller {
  constructor(private revokeSupportStatusUseCase: RevokeSupportStatusUseCase) {
    super();
  }

  @SuccessResponse(201, 'Created')
  @Response(422, 'Unprocessable Entity')
  @Put('revoke')
  @Security('bearer')
  @OperationId('revokeSupportRequest')
  public async handler(@Body() request: { feedId: string; supportId: string }) {
    const { feedId, supportId } = request;

    const data = { feedId, supportId };

    const result = await this.revokeSupportStatusUseCase.execute(data);

    return result;
  }
}
