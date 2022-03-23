import { InputType, Field } from "@nestjs/graphql";

@InputType()
export class AuthorInputDTO {
    
    @Field()
    firstName: string

    @Field()
    lastName: string

    @Field()
    yearOfBirth: string

    @Field()
    nationality: string
}