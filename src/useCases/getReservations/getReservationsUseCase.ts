import { singleton } from 'tsyringe';
import ReservationRepository from '../../services/implementations/reservationRepository';

@singleton()
class GetReservationsUseCase {
  constructor(private reservationRepository: ReservationRepository) {}

  public async execute() {
    const reservations = await this.reservationRepository.getMany();

    if (!reservations) {
      throw new Error('No reservations found.');
    }

    return reservations;
  }
}

export default GetReservationsUseCase;
