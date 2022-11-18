import {
  Body,
  Controller,
  Post,
  Response,
  Route,
  SuccessResponse,
  Tags,
} from '@tsoa/runtime';
import { OperationId } from 'tsoa';
import { injectable } from 'tsyringe';
import { ICreateUserRequestDTO } from './DTOs/createUserRequestDTO';
import { ICreateUserResponseDTO } from './DTOs/createUserResponseDTO';
import CreateUserUseCase from '../../useCases/users/createUserUseCase';

@injectable()
@Route('/user')
@Tags('/users')
export class CreateUserController extends Controller {
  constructor(private createUserUseCase: CreateUserUseCase) {
    super();
  }

  @SuccessResponse(201, 'Created')
  @Response(422, 'Unprocessable Entity')
  @Post()
  @OperationId('createUser')
  public async handler(@Body() request: ICreateUserRequestDTO) {
    const { name, email, password, passwordConfirmation } = request;

    const data: ICreateUserRequestDTO = {
      name,
      email,
      password,
      passwordConfirmation,
    };

    const result: ICreateUserResponseDTO = await this.createUserUseCase.execute(
      data
    );

    return result;
  }
}
