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
import { IUpdateUserRequestDTO } from './DTOs';
import { UpdateUserUseCase } from '../../useCases/users/';

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
    const { name, lastName, email } = request;

    const data: IUpdateUserRequestDTO = {
      _id: userId,
      name,
      lastName,
      email,
    };

    const user = await this.updateUserUseCase.execute(data);

    return user;
  }
}
