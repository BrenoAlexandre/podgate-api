import { NextFunction, Request, Response } from 'express';
import GetReservationsUseCase from './getReservationsUseCase';

class GetReservationsController {
  constructor(private getReservationsUseCase: GetReservationsUseCase) {}

  public async handler(req: Request, res: Response, next: NextFunction) {
    try {
      const reservations = await this.getReservationsUseCase.execute();

      return res.status(200).send(reservations);
    } catch (err) {
      console.error(err);
      next();
    }
  }
}

export default GetReservationsController;
