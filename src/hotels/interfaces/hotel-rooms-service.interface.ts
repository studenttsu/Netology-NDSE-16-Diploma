import { ID } from "../../common/types";
import { HotelRoom } from "../models/hotel-room.model";
import { SearchRoomsParams } from "./search-rooms-params.interface";

export interface IHotelRoomsService {
    create(data: Partial<HotelRoom>): Promise<HotelRoom>;
    findById(id: ID): Promise<HotelRoom>;
    search(params: SearchRoomsParams): Promise<HotelRoom[]>;
    update(id: ID, data: Partial<HotelRoom>): Promise<HotelRoom>;
}