import { Injectable } from '@nestjs/common';
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

import { ID } from "../../core/types";
import { IHotelRoomsService } from "../interfaces/hotel-rooms-service.interface";
import { SearchRoomsParams } from "../interfaces/search-rooms-params.interface";
import { HotelRoom, HotelRoomDocument } from "../models/hotel-room.model";
import { MinioClientService } from "../../minio-client/minio-client.service";
import { CreateHotelRoomDto } from "../dto/HotelRoomDto";
import { Hotel, HotelDocument } from "../models/hotel.model";

@Injectable()
export class HotelRoomsService implements IHotelRoomsService {
    constructor(
        @InjectModel(HotelRoom.name) private hotelRoomModel: Model<HotelRoomDocument>,
        @InjectModel(Hotel.name) private hotelModel: Model<HotelDocument>,
        private readonly minio: MinioClientService
    ) {}

    async create(data: CreateHotelRoomDto): Promise<HotelRoom> {
        const hotelRoom = await this.hotelRoomModel.create({
            ...data,
            hotel: data.hotelId
        });

        const images = await Promise.all(data.images.map(i => this.minio.uploadFile(i, hotelRoom.id)));
        await hotelRoom.updateOne({ images });

        return this.findById(hotelRoom.id);
    }

    async findById(id: ID): Promise<HotelRoom> {
        const room = await this.hotelRoomModel.findById(id);
        room.images = await Promise.all(room.images.map(i => this.minio.getFileUrl(i)));
        return room;
    }

    async search(params: SearchRoomsParams): Promise<HotelRoom[]> {
        const list = await this.hotelRoomModel.find();

        for (const room of list) {
            room.images = await Promise.all(room.images.map(i => this.minio.getFileUrl(i)));
        }

        return list;
    }

    async update(id: ID, data: Partial<HotelRoom>): Promise<HotelRoom> {
        return null;
    }
}
