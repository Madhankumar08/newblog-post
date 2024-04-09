import { IsUUID, IsString, IsNotEmpty } from "class-validator";

export class CreateBlogpostDto {
    @IsUUID()
    @IsString()
    id:string;
    
    @IsString()
    @IsNotEmpty()
    title: string;

    @IsString()
    @IsNotEmpty()
    content: string;

    @IsString()
    @IsNotEmpty()
    author:string;

    @IsString()
    publicationDate:Date;
}

