import { NextFunction, Request, Response } from 'express';
import DeleteReservationUseCase from './deleteReservationUseCase';

class DeleteReservationController {
  constructor(private deleteReservation: DeleteReservationUseCase) {}

  public async handler(req: Request, res: Response, next: NextFunction) {
    try {
      const { reservationId } = req.body;

      const data: IDeleteReservationRequestDTO = { reservationId };

      await this.deleteReservation.execute(data);

      return res.status(204).send();
    } catch (err) {
      console.error(err);
      next();
    }
  }
}
export default DeleteReservationController;
