import { BadRequestException, ForbiddenException, Injectable } from '@nestjs/common';
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

import { ID } from "../core/types";
import { IReservationService } from "./interfaces/reservation-service.interface";
import { IReservationDto } from "./interfaces/reservation.interface";
import { Reservation, ReservationDocument } from "./models/reservation.model";
import { ReservationSearchOptions } from "./interfaces/reservation-user-params.interface";

@Injectable()
export class ReservationsService implements IReservationService {
    constructor(
        @InjectModel(Reservation.name) private reservationModel: Model<ReservationDocument>,
    ) {}

    async addReservation(data: IReservationDto): Promise<Reservation> {
        const reservations = await this.reservationModel.find({
            dateStart: { '$gte': data.dateStart },
            dateEnd: { '$lte': data.dateEnd },
        });

        if (reservations.length > 0) {
            throw new BadRequestException('Даты для бронирования заняты');
        }

        return this.reservationModel.create(data);
    }

    findById(id: ID): Promise<Reservation> {
        return this.reservationModel.findById(id);
    }

    async removeReservation(id: ID, userId?: ID): Promise<void> {
        const reservation = await this.findById(id);

        if (!reservation) {
            throw new BadRequestException('Брони с указанным ID не существует');
        }

        if (userId && reservation.userId !== userId) {
            throw new ForbiddenException('ID текущего пользователя не совпадает с ID пользователя в брони');
        }

        await this.reservationModel.findByIdAndRemove(id);
    }

    async getReservations(
        filter: ReservationSearchOptions
    ): Promise<Array<Reservation>> {
        const params = {
            userId: filter.userId
        };

        if (filter.dateStart) {
            params['dateStart'] = { '$gte': filter.dateStart };
        }

        if (filter.dateEnd) {
            params['dateEnd'] = { '$lte': filter.dateEnd };
        }

        return this.reservationModel.find(params);
    }
}
