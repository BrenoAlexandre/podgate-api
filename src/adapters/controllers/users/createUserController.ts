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
import { injectable } from 'tsyringe';
import { ICreateUserRequestDTO, ICreateUserResponseDTO } from './DTOs';
import { CreateUserUseCase } from '../../useCases/users';

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
    const { name, lastName, email, password, passwordConfirmation } = request;

    const data: ICreateUserRequestDTO = {
      name,
      lastName,
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
