import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class BookInputDTO {

    @Field()
    title: string

    @Field()
    author: number

    @Field()
    year: string

    @Field()
    genre: string

}