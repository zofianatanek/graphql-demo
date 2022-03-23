import { Directive, Field, ObjectType } from '@nestjs/graphql';

@ObjectType('Book')
export class BookType {
  @Field()
  id: number;

  @Field()
  title: string;

  @Field()
  author: number;

  @Directive('@published')
  @Field()
  year: string;

  @Field()
  genre: string
}
