import { Reservation } from '../models/reservation.model';
import { ReservationSearchOptions } from './reservation-user-params.interface';
import { ID } from '../../core/types';
import { IReservationDto } from './reservation.interface';

export interface IReservationService {
  addReservation(data: IReservationDto): Promise<Reservation>;
  removeReservation(id: ID): Promise<void>;
  getReservations(
    filter: ReservationSearchOptions,
  ): Promise<Array<Reservation>>;
}
