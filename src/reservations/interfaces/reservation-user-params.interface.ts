import { ID } from "../../common/types";

export interface ReservationSearchOptions {
    userId: ID;
    dateStart: Date;
    dateEnd: Date;
}