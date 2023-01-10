import { IFeedDocument } from '../../../../models/IFeedModel';

export interface getCategoriesResponseDTO {
  category: string;
  feeds: IFeedDocument[];
}
