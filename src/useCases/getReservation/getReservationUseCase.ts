import { singleton } from 'tsyringe';
import ReservationRepository from '../../services/implementations/reservationRepository';
import { IGetReservationRequestDTO } from './getReservationRequestDTO';
import { IGetReservationResponseDTO } from './getReservationResponseDTO';

@singleton()
class GetReservationUseCase {
  constructor(private reservationRepository: ReservationRepository) {}

  public async execute({
    reservationId,
  }: IGetReservationRequestDTO): Promise<IGetReservationResponseDTO> {
    const result = await this.reservationRepository.getOne(reservationId);

    if (!result) {
      throw new Error('Reservation not found.');
    }

    return result;
  }
}

export default GetReservationUseCase;
