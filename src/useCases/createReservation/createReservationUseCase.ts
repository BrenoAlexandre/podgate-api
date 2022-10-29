import ReservationRepository from '../../services/implementations/reservationRepository';
import { ICreateReservationRequestDTO } from './createReservationRequestDTO';
import { ICreateReservationResponseDTO } from './createReservationResponseDTO';

class CreateReservationUseCase {
  constructor(private reservationRepository: ReservationRepository) {}

  public async execute(
    data: ICreateReservationRequestDTO
  ): Promise<ICreateReservationResponseDTO> {
    const result = await this.reservationRepository.create(data);

    if (!result) {
      throw new Error('Unable to create reservation.');
    }

    return result;
  }
}

export default CreateReservationUseCase;
