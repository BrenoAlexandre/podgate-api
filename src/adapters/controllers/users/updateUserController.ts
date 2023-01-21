import {
  Body,
  Controller,
  OperationId,
  Path,
  Put,
  Request,
  Response,
  Route,
  Security,
  SuccessResponse,
  Tags,
} from '@tsoa/runtime';
import { injectable } from 'tsyringe';
import { IUpdateUserRequestDTO } from './DTOs';
import { UpdateUserUseCase } from '../../useCases/users/';
import { IAuthRequest } from 'interfaces/IAuthRequest';
import { IUpdateUserInput } from 'interfaces/UserUseCases';

@injectable()
@Route('/user')
@Tags('/users')
export class UpdateUserController extends Controller {
  constructor(private updateUserUseCase: UpdateUserUseCase) {
    super();
  }

  @SuccessResponse(200, 'Ok')
  @Response(404, 'Not Found')
  @Security('bearer')
  @Put()
  @OperationId('updateUser')
  public async handler(
    @Body() request: IUpdateUserRequestDTO,
    @Request() req: IAuthRequest
  ) {
    const { name, lastName, email } = request;
    const { user } = req;

    const data: IUpdateUserInput = {
      _id: user._id.toString(),
      name,
      lastName,
      email,
    };

    //TODO fix
    //! Está esvaziando campos quando enviado vazio

    await this.updateUserUseCase.execute(data);
  }
}
