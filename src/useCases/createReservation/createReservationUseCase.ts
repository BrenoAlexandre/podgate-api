import ReservationRepository from '../../services/implementations/reservationRepository';

class CreateReservationUseCase {
  constructor(private reservationRepository: ReservationRepository) {}

  public async execute(data: any) {
    const result = await this.reservationRepository.create(data);

    return result;
  }
}

export default CreateReservationUseCase;
