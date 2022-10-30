import {
  Get,
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
export class GetReservationController {
  constructor(private getReservationUseCase: GetReservationUseCase) {}

  @SuccessResponse(200, 'Ok')
  @Response(404, 'Not found')
  @Get()
  public async handler(@Path() reservationId: string) {
    const data: IGetReservationRequestDTO = { reservationId };

    const result: IGetReservationResponseDTO =
      await this.getReservationUseCase.execute(data);

    return result;
  }
}
