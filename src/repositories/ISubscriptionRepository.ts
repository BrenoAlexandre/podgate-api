import { ISubscriptionDocument } from 'models/ISubscriptionModel';

export default interface ISubscriptionRepository {
  addSubscription(
    userId: string,
    feedId: string
  ): Promise<ISubscriptionDocument>;
  removeSubscription(
    userId: string,
    feedId: string
  ): Promise<ISubscriptionDocument | null>;
}
