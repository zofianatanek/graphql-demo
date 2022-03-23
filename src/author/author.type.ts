import { ObjectType, Field, InterfaceType, registerEnumType } from "@nestjs/graphql";
import { BookType } from "src/book/book.type";
import { formatNameMiddleware } from "src/middleware/formatName.middleware";

export enum Nationality {
    British = "British",
    American = "American",
}

registerEnumType(Nationality, {
    name: "Nationality",
    description: "Possible nationalities",
    valuesMap: {
        British: {
            description : "Some description about this value"
        },
        American: {
            description : "Some description about this value"
        }
    }
})

@InterfaceType()
export abstract class Person {
    @Field()
    id: number;

    @Field({ middleware: [formatNameMiddleware]})
    firstName: string

    @Field()
    lastName: string

    @Field()
    yearOfBirth: string

    @Field(type => Nationality)
    nationality: Nationality
}

@ObjectType('Author', {implements: () => [Person]})
export class AuthorType {
    @Field(type => [BookType], {nullable: true})
    books: string[]

}