import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateProductDto {

    @IsString()
    @IsNotEmpty()
    name: string;

    @IsNumber()
    @IsNotEmpty()
    stock: number;

    @IsString()
    @IsNotEmpty()
    description: string;
}
