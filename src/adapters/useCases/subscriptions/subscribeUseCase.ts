import { CustomError } from 'config/CustomError';
import { ISubscriptionDocument } from 'models/ISubscriptionModel';
import SubscriptionRepository from 'repositories/implementations/SubscriptionRepository';
import UserRepository from 'repositories/implementations/UserRepository';
import { singleton } from 'tsyringe';

@singleton()
export class SubscribeUseCase {
  constructor(
    private subscriptionRepository: SubscriptionRepository,
    private userRepository: UserRepository
  ) {}

  public async execute(data: {
    userId: string;
    feedId: string;
  }): Promise<ISubscriptionDocument> {
    const { userId, feedId } = data;

    const subscriptions = await this.subscriptionRepository.addSubscription(
      userId,
      feedId
    );

    if (!subscriptions) throw CustomError.unprocess('Unable save subscription');

    const user = await this.userRepository.findUserById(userId);

    if (!user) throw CustomError.unprocess('Unable to find user');

    if (!user?.subscriptionsId) {
      user?.addSubscriptionsKey(subscriptions._id.toString());
    }

    return subscriptions;
  }
}
