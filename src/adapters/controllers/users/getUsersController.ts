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
import GetUsersUseCase from '../../useCases/users/getUsersUseCase';

@injectable()
@Route('/user')
@Tags('/users')
export class GetUsersController extends Controller {
  constructor(private getUsersUseCase: GetUsersUseCase) {
    super();
  }

  @Response(404, 'Not found')
  @SuccessResponse(200, 'Ok')
  @Get()
  @OperationId('getUsers')
  public async handler() {
    const users = await this.getUsersUseCase.execute();

    return users;
  }
}
