import { ObjectId } from 'mongoose';

export interface FeedModel {
  _id: ObjectId;
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
  _id: ObjectId;
  url: string;
  title: string;
  duration: number;
  description: string;
  imageUrl: string;
  isPrivate: boolean;
  created_At: Date;
  updated_At: Date;
}
