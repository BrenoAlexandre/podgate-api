import SubscriptionModel from 'models/implementations/SubscriptionModel';
import { ISubscriptionDocument } from 'models/ISubscriptionModel';
import { ObjectId } from 'mongodb';
import ISubscriptionRepository from 'repositories/ISubscriptionRepository';

export default class SubscriptionRepository implements ISubscriptionRepository {
  async addSubscription(
    userId: string,
    feedId: string
  ): Promise<ISubscriptionDocument | null> {
    const subscriptionsList = await SubscriptionModel.findOne({ userId });

    const hasFavorite = subscriptionsList?.feedsId.find(
      (feed) => feed.toString() === feedId
    );

    if (hasFavorite) return null;

    if (!subscriptionsList) {
      const newSubscriptionList = await SubscriptionModel.create({
        userId,
        feedsId: [feedId],
      });
      return newSubscriptionList;
    }

    await subscriptionsList.addFeed(feedId);
    return subscriptionsList;
  }

  async removeSubscription(
    userId: string,
    feedId: string
  ): Promise<ISubscriptionDocument | null> {
    const subscriptionsList = await SubscriptionModel.findOne({ userId });

    if (!subscriptionsList) {
      return null;
    }

    await subscriptionsList.removeFeed(feedId);
    return subscriptionsList;
  }

  async getSubscriptions(userId: string): Promise<any[] | null> {
    const subscriptionList = await SubscriptionModel.aggregate([
      { $match: { userId: new ObjectId(userId) } },
      {
        $lookup: {
          from: 'feeds',
          localField: 'feedsId',
          foreignField: '_id',
          as: 'feeds',
        },
      },
      {
        $project: {
          _id: 1,
          userId: 1,
          feedsId: 1,
          feeds: 1,
          created_at: 1,
          updated_at: 1,
          addFeed: 1,
          removeFeed: 1,
        },
      },
    ]);

    if (subscriptionList.length === 0) return null;

    return subscriptionList;
  }
}
