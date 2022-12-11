import { IUserDocument } from 'models/IUserModel';

export interface IAuthRequest extends Request {
  user: IUserDocument;
}
