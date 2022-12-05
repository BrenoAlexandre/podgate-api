import {
  Controller,
  Get,
  OperationId,
  Response,
  Route,
  SuccessResponse,
  Tags,
} from '@tsoa/runtime';
import { injectable } from 'tsyringe';
import { GetUsersUseCase } from 'adapters/useCases/users';
import { IGetUserResponseDTO } from './DTOs';

@injectable()
@Route('/users')
@Tags('/users')
export class GetUsersController extends Controller {
  constructor(private getUsersUseCase: GetUsersUseCase) {
    super();
  }

  @SuccessResponse(200, 'Ok')
  @Response(404, 'Not found')
  @Get()
  @OperationId('getUsers')
  public async handler() {
    const result: IGetUserResponseDTO[] = await this.getUsersUseCase.execute();

    return result;
  }
}
