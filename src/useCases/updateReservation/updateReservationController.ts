import { NextFunction, Request, Response } from 'express';
import { IUpdateReservationRequestDTO } from './updateReservationRequestDTO';
import UpdateReservationUseCase from './updateReservationUseCase';

class UpdateReservationController {
  constructor(private updateReservationUseCase: UpdateReservationUseCase) {}

  public async handler(req: Request, res: Response, next: NextFunction) {
    try {
      const { reservationId } = req.params;
      const { date, name, phone, places, value } = req.body;

      const data: IUpdateReservationRequestDTO = {
        date,
        name,
        phone,
        places,
        value,
        reservationId,
      };

      const reservation = await this.updateReservationUseCase.execute(data);

      return res.status(200).send(reservation);
    } catch (err) {
      console.error(err);
      next();
    }
  }
}

export default UpdateReservationController;
