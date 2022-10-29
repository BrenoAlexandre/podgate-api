import ReservationRepository from '../../services/implementations/reservationRepository';
import { IUpdateReservationRequestDTO } from './updateReservationRequestDTO';

class UpdateReservationUseCase {
  constructor(private reservationRepository: ReservationRepository) {}

  public async execute(data: IUpdateReservationRequestDTO) {
    const { date, name, phone, places, value, reservationId } = data;

    const updatedReservation = await this.reservationRepository.update(
      reservationId,
      { date, name, phone, places, value }
    );

    if (!updatedReservation) {
      throw new Error('Nenhuma reserva com esse id.');
    }

    return updatedReservation;
  }
}

export default UpdateReservationUseCase;
