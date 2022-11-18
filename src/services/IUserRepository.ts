import { IUser } from './IUser';

export interface IUserRepository {
  create: (data: any) => Promise<IUser>;
  getOne: (userId: string) => Promise<IUser | undefined>;
  getMany: () => Promise<IUser[] | undefined>;
  update: (userId: string, data: any) => Promise<IUser | undefined>;
  delete: (userId: string) => Promise<boolean>;
}
