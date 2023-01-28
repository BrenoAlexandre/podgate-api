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
import { UpdateSupportReceiptUseCase } from 'adapters/useCases/supports';
import { injectable } from 'tsyringe';

@injectable()
@Route('/support')
@Tags('/supports')
export class UpdateSupportReceiptController extends Controller {
  constructor(
    private updateSupportReceiptUseCase: UpdateSupportReceiptUseCase
  ) {
    super();
  }

  @SuccessResponse(201, 'Created')
  @Response(422, 'Unprocessable Entity')
  @Put('receipt')
  @Security('bearer')
  @OperationId('updateSupportReceipt')
  public async handler(
    @Body()
    request: {
      supportId: string;
      feedId: string;
      newReceiptUrl: string;
    }
  ) {
    const { feedId, supportId, newReceiptUrl } = request;

    const data = { feedId, supportId, newReceiptUrl };

    const result = await this.updateSupportReceiptUseCase.execute(data);

    return result;
  }
}
