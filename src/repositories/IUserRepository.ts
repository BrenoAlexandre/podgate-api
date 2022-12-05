import {
  ILoginInput,
  IUserDocument,
  IUserInput,
  IUserUpdateInput,
} from 'models/IUserModel';

export default interface IUserRepository {
  save(user: IUserInput): Promise<IUserDocument | null>;
  findUserById(id: string): Promise<IUserDocument | null>;
  findUsers(): Promise<IUserDocument[] | null>;
  loginUser({ email, password }: ILoginInput): Promise<boolean>;
  deleteUserById(id: string): Promise<boolean>;
  updateUserById(id: string, data: IUserUpdateInput): Promise<boolean>;
}
