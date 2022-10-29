import { IReservationRepository } from '../IReservationRepository';

class ReservationRepository implements IReservationRepository {
  public create = async (data: any) => {
    return {
      name: 'John Doe',
      phone: '51 987654321',
      date: new Date(),
      places: 3,
      value: 150,
    };
  };

  public getOne = async (data: any) => {
    return 2;
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
