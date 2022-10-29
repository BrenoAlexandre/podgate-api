import { IReservation } from './IReservation';

export interface IReservationRepository {
  create: (data: any) => Promise<IReservation>;
  getOne: (reservationId: string) => Promise<IReservation | undefined>;
  getMany: () => Promise<IReservation[] | undefined>;
  update: (
    reservationId: string,
    data: any
  ) => Promise<IReservation | undefined>;
  delete: (data: any) => Promise<boolean>;
}
