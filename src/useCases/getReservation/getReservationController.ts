import { NextFunction, Request, Response } from 'express';
import { IGetReservationRequestDTO } from './getReservationRequestDTO';
import { IGetReservationResponseDTO } from './getReservationResponseDTO';
import GetReservationUseCase from './getReservationUseCase';

class GetReservationController {
  constructor(private getReservationUseCase: GetReservationUseCase) {}

  public async handler(req: Request, res: Response, next: NextFunction) {
    try {
      const { reservationId } = req.params;

      const data: IGetReservationRequestDTO = { reservationId };

      const result: IGetReservationResponseDTO =
        await this.getReservationUseCase.execute(data);

      return res.status(200).send(result);
    } catch (err) {
      console.error(err);
      next();
    }
  }
}

export default GetReservationController;
