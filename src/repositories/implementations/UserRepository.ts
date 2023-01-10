import IUserRepository from 'repositories/IUserRepository';
import UserModel from 'models/implementations/UserModel';
import { ILoginInput, IUserDocument, IUserInput } from 'models/IUserModel';

export default class UserRepository implements IUserRepository {
  async save(user: IUserInput): Promise<IUserDocument | null> {
    return UserModel.create<IUserInput>(user);
  }

  async findUserById(id: string): Promise<IUserDocument | null> {
    return await UserModel.findById(id).catch((e) => {
      return null;
    });
  }

  async findUsers(): Promise<IUserDocument[] | null> {
    return await UserModel.find().catch((e) => {
      return null; //TODO Implementar?
    });
  }

  async loginUser({
    email,
    password,
  }: ILoginInput): Promise<IUserDocument | null> {
    const user = await UserModel.findOne({ email }, { lean: false });
    if (!user) return null;
    const isValid = user.comparePassword(password);
    if (!isValid) return null;
    return user;
  }

  async deleteUserById(id: string): Promise<boolean> {
    const deletedUser = await UserModel.deleteOne({ _id: id });
    return deletedUser.acknowledged;
  }

  async updateUserById(id: string, data: IUserInput): Promise<boolean> {
    const updatedUser = await UserModel.updateOne({ _id: id }, data);
    return updatedUser.acknowledged;
  }

  async changePassword(email: string, newPassword: string): Promise<boolean> {
    const user = await UserModel.findOne({ email }, { lean: false });
    if (!user) return false;
    const success = await user.setPassword(newPassword);
    return success;
  }
}
