export interface ICreateUserInput {
  name: string;
  lastName: string;
  email: string;
  password: string;
  passwordConfirmation: string;
}

export interface IUpdateUserInput {
  _id: string;
  name?: string;
  lastName?: string;
  email?: string;
}
