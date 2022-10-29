import ReservationRepository from '../../services/implementations/reservationRepository';
import { IGetReservationResponseDTO } from './getReservationResponseDTO';

class GetReservationUseCase {
  constructor(private reservationRepository: ReservationRepository) {}

  public async execute({
    reservationId,
  }: IGetReservationRequestDTO): Promise<IGetReservationResponseDTO> {
    const result = await this.reservationRepository.getOne(reservationId);

    if (!result) {
      throw new Error('Reserva não encontrada');
    }

    return result;
  }
}

export default GetReservationUseCase;
