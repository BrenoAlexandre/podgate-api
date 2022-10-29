export interface IReservationRepository {
  create: (data: any) => any;
  getOne: (data: any) => any;
  getMany: () => any;
  update: (data: any) => any;
  delete: (data: any) => any;
}
