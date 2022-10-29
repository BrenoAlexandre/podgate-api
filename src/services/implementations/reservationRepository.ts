import { IReservation } from '../IReservation';
import { IReservationRepository } from '../IReservationRepository';

class ReservationRepository implements IReservationRepository {
  private reservationsMock: IReservation[] = [
    {
      name: 'Brone Alaxendra',
      phone: '51 987654321',
      date: new Date(),
      places: 2,
      value: 100,
      reservationId: Math.floor(Math.random() * (100 ^ 2)),
    },
    {
      name: 'Arthur Farais',
      phone: '51 918273645',
      date: new Date(),
      places: 8,
      value: 400,
      reservationId: Math.floor(Math.random() * (100 ^ 2)),
    },
  ];

  public create = async (data: any): Promise<IReservation> => {
    return {
      name: 'John Doe',
      phone: '51 987654321',
      date: new Date(),
      places: 3,
      value: 150,
      reservationId: Math.floor(Math.random() * (100 ^ 2)),
    };
  };

  public getOne = async (id: number): Promise<IReservation | undefined> => {
    return this.reservationsMock.find(
      (reservation) => reservation.reservationId === id
    );
  };

  public getMany = async () => {
    return 3;
  };

  public update = async (data: any) => {
    return 4;
  };

  public delete = async (data: any) => {
    return 5;
  };
}

export default ReservationRepository;
