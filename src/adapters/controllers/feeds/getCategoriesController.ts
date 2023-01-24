import {
  Body,
  Get,
  Controller,
  OperationId,
  Response,
  Route,
  SuccessResponse,
  Tags,
} from '@tsoa/runtime';
import { injectable } from 'tsyringe';
import { GetCategoriesUseCase } from 'adapters/useCases/feeds';
import { getCategoriesResponseDTO } from './DTOs';

@injectable()
@Route('/feed/category')
@Tags('/feeds')
export class ChangeFeedPrivacyIdController extends Controller {
  constructor(private getCategoriesUseCase: GetCategoriesUseCase) {
    super();
  }

  @SuccessResponse(200, 'Ok')
  @Response(422, 'Unprocessable Entity')
  @Get()
  @OperationId('getCategories')
  public async handler() {
    const result: getCategoriesResponseDTO[] =
      await this.getCategoriesUseCase.execute();

    return result;
  }
}
