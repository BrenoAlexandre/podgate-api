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
      reservationId: '1',
    },
    {
      name: 'Arthur Farais',
      phone: '51 918273645',
      date: new Date(),
      places: 8,
      value: 400,
      reservationId: '2',
    },
    {
      name: 'Johnsons Lopez',
      phone: '51 9537853',
      date: new Date(),
      places: 5,
      value: 300,
      reservationId: '3',
    },
    {
      name: 'Eduardo Garcia',
      phone: '51 9337853',
      date: new Date(),
      places: 2,
      value: 120,
      reservationId: '4',
    },
  ];

  public create = async (data: any): Promise<IReservation> => {
    return {
      name: 'John Doe',
      phone: '51 987654321',
      date: new Date(),
      places: 3,
      value: 150,
      reservationId: String(Math.floor(Math.random() * (100 ^ 2))),
    };
  };

  public getOne = async (id: string): Promise<IReservation | undefined> => {
    return this.reservationsMock.find(
      (reservation) => reservation.reservationId === id
    );
  };

  public getMany = async () => {
    return this.reservationsMock;
  };

  public update = async (reservationId: string, data: any) => {
    let found = this.reservationsMock.find(
      (reservation) => reservation.reservationId === reservationId
    );

    if (found) {
      found = { ...found, ...data };
    }

    return found;
  };

  public delete = async (id: string) => {
    const deletado = this.reservationsMock.find(
      (reservation) => reservation.reservationId === id
    );
    return !!deletado;
  };
}

export default ReservationRepository;
