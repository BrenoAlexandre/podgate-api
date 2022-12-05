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
      return null;
    });
  }

  async loginUser({ email, password }: ILoginInput): Promise<boolean> {
    const user = await UserModel.findOne({ email }, { lean: false });
    if (!user) return false;
    return user.comparePassword(password);
  }

  async deleteUserById(id: string): Promise<boolean> {
    const deletedUser = await UserModel.deleteOne({ _id: id });
    return deletedUser.acknowledged;
  }

  async updateUserById(id: string, data: IUserInput): Promise<boolean> {
    const updatedUser = await UserModel.updateOne({ _id: id }, data);
    return updatedUser.acknowledged;
  }
}
