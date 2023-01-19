import { Document, ObjectId } from 'mongoose';

export interface IEpisodeInput {
  photoUrl: string;
  title: string;
  description: string;
  length: number;
  pubDate: Date;
}

export interface IEpisodeDocument extends Document {
  _id: ObjectId;
  feedId: string;
  episodes: IEpisodeInput[];
  created_At?: Date;
  updated_At?: Date;
  addEpisode(episode: IEpisodeInput): Promise<IEpisodeDocument>;
  addEpisodes(episodes: IEpisodeInput[]): Promise<IEpisodeDocument>;
  changeFeedId(feedId: string): Promise<IEpisodeDocument>;
}
