import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

import { Hotel, HotelDocument } from "../models/hotel.model";
import { ID } from "../../core/types";
import { IHotelService } from "../interfaces/hotel-service.interface";
import { SearchHotelParams } from "../interfaces/search-hotel-params.interface";
import { UpdateHotelParams } from "../interfaces/update-hotel-params.interface";
import { UpdateCreateHotelDto, HotelDto } from "../dto/HotelDto";
import { PageDto } from "../../core/pagination/PageDto";

@Injectable()
export class HotelsService implements IHotelService {
    constructor(
        @InjectModel(Hotel.name) private hotelModel: Model<HotelDocument>,
    ) {}

    create(data: UpdateCreateHotelDto): Promise<Hotel> {
        return this.hotelModel.create(data);
    }

    findById(id: ID): Promise<Hotel> {
        return this.hotelModel.findById(id);
    }

    async search(params: SearchHotelParams): Promise<PageDto<HotelDto>> {
        const filter = {};

        if (params.title) {
            filter['title'] = new RegExp(`^${params.title}`, 'i');
        }

        const total = await this.hotelModel.count();

        const results = await this.hotelModel.find(filter)
            .skip(params.offset)
            .limit(params.limit);

        return new PageDto<HotelDto>({
            results: results.map(x => new HotelDto(x)),
            limit: params.limit,
            offset: params.offset,
            total
        })
    }

    async update(id: ID, data: UpdateHotelParams): Promise<Hotel> {
        const hotel = await this.findById(id);

        if (!hotel) {
            throw new NotFoundException('Отель не найден');
        }

        await this.hotelModel.updateOne({_id: id}, data);
        return this.hotelModel.findById(id);
    }
}
