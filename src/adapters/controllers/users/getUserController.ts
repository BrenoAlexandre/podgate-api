import {
  Controller,
  Get,
  OperationId,
  Path,
  Response,
  Route,
  SuccessResponse,
  Tags,
} from '@tsoa/runtime';
import { injectable } from 'tsyringe';
import { IGetUserRequestDTO, IGetUserResponseDTO } from './DTOs';
import { GetUserUseCase } from '../../useCases/users';

@injectable()
@Route('/user')
@Tags('/users')
export class GetUserController extends Controller {
  constructor(private getUserUseCase: GetUserUseCase) {
    super();
  }

  @SuccessResponse(200, 'Ok')
  @Response(404, 'Not found')
  @Get('{userId}')
  @OperationId('getUser')
  public async handler(@Path() userId: string) {
    const data: IGetUserRequestDTO = { userId };

    const result: IGetUserResponseDTO = await this.getUserUseCase.execute(data);

    return result;
  }
}
