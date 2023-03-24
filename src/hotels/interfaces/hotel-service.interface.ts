import { SearchHotelParams } from "./search-hotel-params.interface";
import { ID } from "../../core/types";
import { Hotel } from "../models/hotel.model";
import { UpdateHotelParams } from "./update-hotel-params.interface";

export interface IHotelService {
    create(data: any): Promise<Hotel>;
    findById(id: ID): Promise<Hotel>;
    search(params: SearchHotelParams): Promise<Hotel[]>;
    update(id: ID, data: UpdateHotelParams): Promise<Hotel>;
}