import { ID } from '../../core/types';
import { HotelRoom } from '../models/hotel-room.model';
import { SearchRoomsParams } from './search-rooms-params.interface';
import { CreateHotelRoomDto } from '../dto/HotelRoomDto';

export interface IHotelRoomsService {
  create(data: CreateHotelRoomDto): Promise<HotelRoom>;
  findById(id: ID): Promise<HotelRoom>;
  search(params: SearchRoomsParams): Promise<HotelRoom[]>;
  update(id: ID, data: Partial<HotelRoom>): Promise<HotelRoom>;
}
