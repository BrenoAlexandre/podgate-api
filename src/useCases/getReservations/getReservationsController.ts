import {
  Controller,
  Get,
  OperationId,
  Response,
  Route,
  SuccessResponse,
  Tags,
} from '@tsoa/runtime';
import { injectable } from 'tsyringe';
import GetReservationsUseCase from './getReservationsUseCase';

@injectable()
@Route('/reservation')
@Tags('reservations')
export class GetReservationsController extends Controller {
  constructor(private getReservationsUseCase: GetReservationsUseCase) {
    super();
  }

  @Response(404, 'Not found')
  @SuccessResponse(200, 'Ok')
  @Get()
  @OperationId('getReservations')
  public async handler() {
    const reservations = await this.getReservationsUseCase.execute();

    return reservations;
  }
}
