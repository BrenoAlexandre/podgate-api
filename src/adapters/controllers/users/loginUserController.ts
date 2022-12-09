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
import { LoginUserUseCase } from 'adapters/useCases/users';
import { injectable } from 'tsyringe';
import { ILoginUserRequestDTO } from './DTOs';

@injectable()
@Route('/login')
@Tags('/users')
export class LoginUserController extends Controller {
  constructor(private loginUserUseCase: LoginUserUseCase) {
    super();
  }

  @SuccessResponse(201, 'Created')
  @Response(422, 'Unprocessable Entity')
  @Post()
  @OperationId('loginUser')
  public async handler(@Body() request: ILoginUserRequestDTO) {
    const { email, password } = request;

    const data: ILoginUserRequestDTO = {
      email,
      password,
    };

    await this.loginUserUseCase.execute(data);

    //TODO Send the Token and add authentication to controllers
  }
}
