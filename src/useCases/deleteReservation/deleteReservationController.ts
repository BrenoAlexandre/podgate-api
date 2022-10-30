import {
  Controller,
  Delete,
  Path,
  Response,
  Route,
  SuccessResponse,
  Tags,
} from '@tsoa/runtime';
import { injectable } from 'tsyringe';
import DeleteReservationUseCase from './deleteReservationUseCase';

@injectable()
@Route('/reservation')
@Tags('reservations')
export class DeleteReservationController extends Controller {
  constructor(private deleteReservation: DeleteReservationUseCase) {
    super();
  }

  @SuccessResponse(204, 'Continue')
  @Response(404, 'Not found')
  @Delete('{reservationId}')
  public async handler(@Path() reservationId: string) {
    const data: IDeleteReservationRequestDTO = { reservationId };

    await this.deleteReservation.execute(data);
  }
}
