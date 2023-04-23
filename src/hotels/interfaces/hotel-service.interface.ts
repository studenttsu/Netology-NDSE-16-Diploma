import { SearchHotelParams } from "./search-hotel-params.interface";
import { ID } from "../../core/types";
import { Hotel } from "../models/hotel.model";
import { UpdateHotelParams } from "./update-hotel-params.interface";
import { UpdateCreateHotelDto, HotelDto } from "../dto/HotelDto";
import { PageDto } from "../../core/pagination/PageDto";

export interface IHotelService {
    create(data: UpdateCreateHotelDto): Promise<Hotel>;
    findById(id: ID): Promise<Hotel>;
    search(params: SearchHotelParams): Promise<PageDto<HotelDto>>;
    update(id: ID, data: UpdateHotelParams): Promise<Hotel>;
}