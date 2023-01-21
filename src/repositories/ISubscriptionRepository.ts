import { ISubscriptionDocument } from 'models/ISubscriptionModel';

export default interface ISubscriptionRepository {
  addSubscription(
    userId: string,
    feedId: string
  ): Promise<ISubscriptionDocument | null>;
  removeSubscription(
    userId: string,
    feedId: string
  ): Promise<ISubscriptionDocument | null>;
  getSubscriptions(userId: string): Promise<any[] | null>;
}
