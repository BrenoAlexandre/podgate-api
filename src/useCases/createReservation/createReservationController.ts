import { Request, Response, NextFunction } from 'express';
import { ICreateReservationRequestDTO } from './createReservationRequestDTO';
import { ICreateReservationResponseDTO } from './createReservationResponseDTO';
import CreateReservationUseCase from './createReservationUseCase';

class CreateReservationController {
  constructor(private createReservationUseCase: CreateReservationUseCase) {}

  public async handler(req: Request, res: Response, next: NextFunction) {
    try {
      const { name, phone, date, places } = req.body;

      const data: ICreateReservationRequestDTO = {
        name,
        phone,
        date,
        places,
      };

      const result: ICreateReservationResponseDTO =
        await this.createReservationUseCase.execute(data);

      return res.status(201).send(result);
    } catch (err) {
      console.error(err);
      next();
    }
  }
}

export default CreateReservationController;
