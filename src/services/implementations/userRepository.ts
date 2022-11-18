import { IUser } from '../IUser';
import _ from 'lodash';
import { IUserRepository } from '../IUserRepository';

class UserRepository implements IUserRepository {
  private usersMock: IUser[] = [
    {
      _id: '1',
      name: 'Brian Andre',
      email: 'breno@duck.com',
      favoritesId: undefined,
      subscriptionsId: undefined,
      casterId: undefined,
      supportsId: undefined,
      created_At: new Date(),
      updated_At: new Date(),
    },
    {
      _id: '2',
      name: 'Arthur Farais',
      email: 'Arthur@duck.com',
      favoritesId: undefined,
      subscriptionsId: undefined,
      casterId: undefined,
      supportsId: undefined,
      created_At: new Date(),
      updated_At: new Date(),
    },
    {
      _id: '2',
      name: 'Johnson Lopez',
      email: 'john@duck.com',
      favoritesId: undefined,
      subscriptionsId: undefined,
      casterId: undefined,
      supportsId: undefined,
      created_At: new Date(),
      updated_At: new Date(),
    },
    {
      _id: '4',
      name: 'Eduardo Garcia',
      email: 'Garcia@duck.com',
      favoritesId: undefined,
      subscriptionsId: undefined,
      casterId: undefined,
      supportsId: undefined,
      created_At: new Date(),
      updated_At: new Date(),
    },
  ];

  public create = async (data: any): Promise<IUser> => {
    const { name, email, password } = data;

    const newUser = {
      _id: `${Math.floor(Math.random()) * 20 + 1}`,
      name,
      email,
      favoritesId: undefined,
      subscriptionsId: undefined,
      casterId: undefined,
      supportsId: undefined,
      created_At: new Date(),
      updated_At: new Date(),
    };

    //? Save user to database

    return newUser;
  };

  public getOne = async (userId: string): Promise<IUser | undefined> => {
    return this.usersMock.find((user) => user._id === userId);
  };

  public getMany = async (): Promise<IUser[] | undefined> => {
    return this.usersMock;
  };

  public update = async (
    userId: string,
    data: any
  ): Promise<IUser | undefined> => {
    let found = this.usersMock.find((user) => user._id === userId);

    if (found) {
      found = { ...found, ...data };
    }

    return found;
  };

  public delete = async (userId: string): Promise<boolean> => {
    const deleted = this.usersMock.find((user) => user._id === userId);
    return !!deleted;
  };
}

export default UserRepository;
