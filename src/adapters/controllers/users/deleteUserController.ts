import {
  Controller,
  Delete,
  OperationId,
  Path,
  Response,
  Route,
  SuccessResponse,
  Tags,
} from '@tsoa/runtime';
import { injectable } from 'tsyringe';
import DeleteUserUseCase from '../../useCases/users/deleteUserUseCase';
import { IDeleteUserRequestDTO } from './DTOs/deleteUserRequestDTO';

@injectable()
@Route('/user')
@Tags('/users')
export class DeleteUserController extends Controller {
  constructor(private deleteUser: DeleteUserUseCase) {
    super();
  }

  @SuccessResponse(204, 'Continue')
  @Response(404, 'Not found')
  @Delete('{userId}')
  @OperationId('deleteUser')
  public async handler(@Path() userId: string) {
    const data: IDeleteUserRequestDTO = { userId };

    await this.deleteUser.execute(data);
  }
}
