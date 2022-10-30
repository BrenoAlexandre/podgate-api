import {
  Body,
  Controller,
  Post,
  Response,
  Route,
  SuccessResponse,
  Tags,
} from '@tsoa/runtime';
import { injectable } from 'tsyringe';
import { ICreateReservationRequestDTO } from './createReservationRequestDTO';
import { ICreateReservationResponseDTO } from './createReservationResponseDTO';
import CreateReservationUseCase from './createReservationUseCase';

@injectable()
@Route('/reservation')
@Tags('reservations')
export class CreateReservationController extends Controller {
  constructor(private createReservationUseCase: CreateReservationUseCase) {
    super();
  }

  @SuccessResponse(201, 'Created')
  @Response(422, 'Unprocessable Entity')
  @Post()
  public async handler(@Body() request: ICreateReservationRequestDTO) {
    const { name, phone, date, places } = request;

    const data: ICreateReservationRequestDTO = {
      name,
      phone,
      date,
      places,
    };

    const result: ICreateReservationResponseDTO =
      await this.createReservationUseCase.execute(data);

    return result;
  }
}
