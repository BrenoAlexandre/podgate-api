import {
  Body,
  Controller,
  Path,
  Put,
  Response,
  Route,
  SuccessResponse,
  Tags,
} from '@tsoa/runtime';
import { injectable } from 'tsyringe';
import { IUpdateReservationRequestDTO } from './updateReservationRequestDTO';
import UpdateReservationUseCase from './updateReservationUseCase';

@injectable()
@Route('/reservation')
@Tags('reservations')
export class UpdateReservationController extends Controller {
  constructor(private updateReservationUseCase: UpdateReservationUseCase) {
    super();
  }

  @SuccessResponse(200, 'Ok')
  @Response(404, 'Not Found')
  @Put('{reservationId}')
  public async handler(
    @Body() request: IUpdateReservationRequestDTO,
    @Path() reservationId: string
  ) {
    const { date, name, phone, places, value } = request;

    const data: IUpdateReservationRequestDTO = {
      date,
      name,
      phone,
      places,
      value,
      reservationId,
    };

    const reservation = await this.updateReservationUseCase.execute(data);

    return reservation;
  }
}
