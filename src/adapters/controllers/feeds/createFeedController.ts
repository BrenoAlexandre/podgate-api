import {
  Body,
  Controller,
  Post,
  OperationId,
  Response,
  Route,
  SuccessResponse,
  Tags,
} from '@tsoa/runtime';
import { CreateFeedUseCase } from 'adapters/useCases/feeds';
import { IFeedDocument } from '../../../models/IFeedModel';
import { injectable } from 'tsyringe';
import { ICreateFeedRequestDTO } from './DTOs';

@injectable()
@Route('/feed')
@Tags('/feeds')
export class CreateFeedController extends Controller {
  constructor(private createFeedUseCase: CreateFeedUseCase) {
    super();
  }

  @SuccessResponse(201, 'Created')
  @Response(422, 'Unprocessable Entity')
  @Post()
  @OperationId('createFeed')
  public async handler(@Body() request: ICreateFeedRequestDTO) {
    const { url } = request;

    const data = { url };

    const result: IFeedDocument = await this.createFeedUseCase.execute(data);

    return result;
  }
}
