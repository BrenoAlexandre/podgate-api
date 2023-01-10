import {
  Controller,
  Delete,
  OperationId,
  Path,
  Response,
  Route,
  Security,
  SuccessResponse,
  Tags,
} from '@tsoa/runtime';
import { injectable } from 'tsyringe';
import { DeleteUserUseCase } from '../../useCases/users';
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
  @Security('bearer')
  @Delete('{userId}')
  @OperationId('deleteUser')
  public async handler(@Path() userId: string) {
    const data: IDeleteUserRequestDTO = { userId };

    await this.deleteUser.execute(data);
  }
}
