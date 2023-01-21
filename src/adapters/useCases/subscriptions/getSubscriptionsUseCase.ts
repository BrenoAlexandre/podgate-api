import { CustomError } from 'config/CustomError';
import { ISubscriptionDocument } from 'models/ISubscriptionModel';
import SubscriptionRepository from 'repositories/implementations/SubscriptionRepository';
import { singleton } from 'tsyringe';

@singleton()
export class GetSubscriptionsUseCase {
  constructor(private subscriptionRepository: SubscriptionRepository) {}

  public async execute(data: { userId: string }): Promise<any[]> {
    const { userId } = data;

    const subscriptions = await this.subscriptionRepository.getSubscriptions(
      userId
    );

    console.log(subscriptions);

    if (!subscriptions)
      throw CustomError.unprocess('Unable find subscription list');

    return subscriptions;
  }
}
