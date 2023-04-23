import { Injectable } from '@nestjs/common';
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

import { IHotelRoomsService } from "../interfaces/hotel-rooms-service.interface";
import { SearchRoomsParams } from "../interfaces/search-rooms-params.interface";
import { HotelRoom, HotelRoomDocument } from "../models/hotel-room.model";
import { ID } from "../../core/types";

@Injectable()
export class HotelRoomsService implements IHotelRoomsService {
    constructor(
        @InjectModel(HotelRoom.name) private hotelRoomModel: Model<HotelRoomDocument>,
    ) {
    }

    async create(data: Partial<HotelRoom>): Promise<HotelRoom> {
        return null;
    }

    async findById(id: ID): Promise<HotelRoom> {
        return null;
    }

    async search(params: SearchRoomsParams): Promise<HotelRoom[]> {
        return [];
    }

    async update(id: ID, data: Partial<HotelRoom>): Promise<HotelRoom> {
        return null;
    }
}
