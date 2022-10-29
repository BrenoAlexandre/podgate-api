import { IReservation } from '../IReservation';
import { IReservationRepository } from '../IReservationRepository';

class ReservationRepository implements IReservationRepository {
  private reservationsMock: IReservation[] = [
    {
      name: 'Brian Andre',
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

  public getOne = async (
    reservationId: string
  ): Promise<IReservation | undefined> => {
    return this.reservationsMock.find(
      (reservation) => reservation.reservationId === reservationId
    );
  };

  public getMany = async (): Promise<IReservation[] | undefined> => {
    return this.reservationsMock;
  };

  public update = async (
    reservationId: string,
    data: any
  ): Promise<IReservation | undefined> => {
    let found = this.reservationsMock.find(
      (reservation) => reservation.reservationId === reservationId
    );

    if (found) {
      found = { ...found, ...data };
    }

    return found;
  };

  public delete = async (id: string): Promise<boolean> => {
    const deletado = this.reservationsMock.find(
      (reservation) => reservation.reservationId === id
    );
    return !!deletado;
  };
}

export default ReservationRepository;
