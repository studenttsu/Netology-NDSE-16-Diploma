import { ApiProperty } from '@nestjs/swagger';

interface IPageParams<T> {
    total: number;
    limit: number;
    offset: number;
    results: T[];
}

export class PageDto<T> {
    @ApiProperty()
    total: number;

    @ApiProperty()
    limit: number;

    @ApiProperty()
    offset: number;

    @ApiProperty()
    results: T[];

    constructor(params: IPageParams<T>) {
        this.total = params.total;
        this.limit = params.limit;
        this.offset = params.offset;
        this.results = params.results;
    }
}
