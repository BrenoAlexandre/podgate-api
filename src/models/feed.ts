export interface FeedModel {
  _id: string; //! ObjectId
  url: string;
  privateUrl?: string;
  title: string;
  description: string;
  author: string;
  imageUrl: string;
  categories: string;
  episodes: EpisodeModel[];
  created_At: Date;
  updated_At: Date;
}

export interface EpisodeModel {
  _id: string; //! ObjectId
  url: string;
  title: string;
  duration: number;
  description: string;
  imageUrl: string;
  isPrivate: boolean;
  created_At: Date;
  updated_At: Date;
}
