import SubscriptionModel from 'models/implementations/SubscriptionModel';
import { ISubscriptionDocument } from 'models/ISubscriptionModel';
import ISubscriptionRepository from 'repositories/ISubscriptionRepository';

export default class SubscriptionRepository implements ISubscriptionRepository {
  async addSubscription(
    userId: string,
    feedId: string
  ): Promise<ISubscriptionDocument> {
    const subscriptionsList = await SubscriptionModel.findOne({ userId });

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
}
