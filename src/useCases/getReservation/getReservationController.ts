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
import { IGetReservationRequestDTO } from './getReservationRequestDTO';
import { IGetReservationResponseDTO } from './getReservationResponseDTO';
import GetReservationUseCase from './getReservationUseCase';

@injectable()
@Route('/reservation')
@Tags('reservations')
export class GetReservationController extends Controller {
  constructor(private getReservationUseCase: GetReservationUseCase) {
    super();
  }

  @SuccessResponse(200, 'Ok')
  @Response(404, 'Not found')
  @Get('{reservationId}')
  @OperationId('getReservation')
  public async handler(@Path() reservationId: string) {
    const data: IGetReservationRequestDTO = { reservationId };

    const result: IGetReservationResponseDTO =
      await this.getReservationUseCase.execute(data);

    return result;
  }
}
