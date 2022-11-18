export interface ICreateUserResponseDTO {
  _id: string;
  name: string;
  email: string;
  favoritesId?: string;
  subscriptionsId?: string;
  casterId?: string;
  supportsId?: string;
  created_At: Date;
  updated_At: Date;
}
