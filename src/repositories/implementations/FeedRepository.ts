import { getCategoriesResponseDTO } from 'adapters/controllers/feeds/DTOs';
import { IFeedDocument, IFeedInput } from 'models/IFeedModel';
import FeedModel from 'models/implementations/FeedModel';
import { ObjectId } from 'mongodb';
import IFeedRepository from 'repositories/IFeedRepository';

export default class FeedRepository implements IFeedRepository {
  async save(feed: IFeedInput): Promise<IFeedDocument | null> {
    console.log(feed);

    const newFeed = await FeedModel.create<IFeedInput>(feed);

    return newFeed ?? null;
  }

  async findFeedByUrl(url: string): Promise<IFeedDocument | null> {
    const feed = FeedModel.findOne({ url: url }).populate('episodesId');
    return feed ?? null;
  }

  async findFeedById(id: string): Promise<IFeedDocument | null> {
    const feed = FeedModel.findOne({ _id: id }).populate('episodesId');
    return feed ?? null;
  }

  async fetchCategories(): Promise<getCategoriesResponseDTO[] | null> {
    const categories = await FeedModel.aggregate([
      { $group: { _id: '$category', feeds: { $push: '$$ROOT' } } },
      {
        $lookup: {
          from: 'episodes',
          localField: 'episodesId',
          foreignField: '_id',
          as: 'episodes',
        },
      },
      {
        $lookup: {
          from: 'casters',
          localField: 'casterId',
          foreignField: '_id',
          as: 'caster',
        },
      },
    ]);

    return categories;
  }

  async fetchFeedsByCategory(
    category: string
  ): Promise<IFeedDocument[] | null> {
    const feeds = await FeedModel.find({ category });

    return feeds ?? null;
  }

  async deleteFeedById(id: string): Promise<boolean> {
    const deletedFeed = await FeedModel.deleteOne({ _id: id });
    return deletedFeed.acknowledged;
  }

  async changeFeedPrivacy(
    feedId: string,
    casterId: ObjectId,
    privacy: boolean
  ): Promise<IFeedDocument | null> {
    const feed = await FeedModel.findOne({ _id: feedId, casterId });
    if (!feed) return null;

    feed.isPrivate = privacy;

    await feed.save();
    return feed;
  }

  async claimFeed(
    feedId: string,
    attachTo: ObjectId,
    casterId: ObjectId,
    isPrivate: boolean
  ): Promise<IFeedDocument | null> {
    const feed = await FeedModel.findById(feedId);

    if (!feed) return null;

    await feed.claimFeed(attachTo, new ObjectId(casterId), isPrivate);

    const attachedFeed = await FeedModel.findById(attachTo);

    if (attachedFeed) {
      await attachedFeed.setPrivateFeed(feed._id);
    }

    return feed;
  }
}
