import {
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
export class DeleteReservationController {
  constructor(private deleteReservation: DeleteReservationUseCase) {}

  @SuccessResponse(204, 'Continue')
  @Response(404, 'Not found')
  @Delete()
  public async handler(@Path() reservationId: string) {
    const data: IDeleteReservationRequestDTO = { reservationId };

    await this.deleteReservation.execute(data);
  }
}
