import { ApiProperty } from "@nestjs/swagger";

export class CreateBgSlokaDto {
    @ApiProperty()
    slokaNo: string;

    @ApiProperty()
    orderNo:number;

    @ApiProperty()
    slokaText: string;

    @ApiProperty()
    SlokaVoice: string;

    @ApiProperty()
    slokaMeaning: string;
}
