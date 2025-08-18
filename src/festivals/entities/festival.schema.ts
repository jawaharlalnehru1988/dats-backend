import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema({ timestamps: true })
export class Festival extends Document {
    @Prop({ required: true })
    festivalName: string;

    @Prop()
    otherName: string;

    @Prop({ required: true })
    startDate: string;

    @Prop({ required: true })
    importance: string;

    @Prop()
    breakfastDate: string;

    @Prop()
    breakfastUntil: string;

    @Prop()
    breakfastStartTime: string;

    @Prop()
    breakfastEndTime: string;

    @Prop()
    description: string;
}

export const FestivalSchema = SchemaFactory.createForClass(Festival);
