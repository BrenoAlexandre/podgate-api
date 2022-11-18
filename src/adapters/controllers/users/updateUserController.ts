import {
  Body,
  Controller,
  OperationId,
  Path,
  Put,
  Response,
  Route,
  SuccessResponse,
  Tags,
} from '@tsoa/runtime';
import { injectable } from 'tsyringe';
import { IUpdateUserRequestDTO } from './DTOs/updateUserRequestDTO';
import UpdateUserUseCase from '../../useCases/users/updateUserUseCase';

@injectable()
@Route('/user')
@Tags('/users')
export class UpdateUserController extends Controller {
  constructor(private updateUserUseCase: UpdateUserUseCase) {
    super();
  }

  @SuccessResponse(200, 'Ok')
  @Response(404, 'Not Found')
  @Put('{userId}')
  @OperationId('updateUser')
  public async handler(
    @Body() request: IUpdateUserRequestDTO,
    @Path() userId: string
  ) {
    const { name, email } = request;

    const data: IUpdateUserRequestDTO = {
      name,
      email,
      _id: userId,
    };

    const user = await this.updateUserUseCase.execute(data);

    return user;
  }
}
