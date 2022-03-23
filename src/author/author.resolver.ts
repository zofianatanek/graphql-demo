import { Args, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { BookService } from 'src/book/book.service';
import { AuthorInputDTO } from './author.input';
import { Author } from './author.entity';
import { AuthorService } from './author.service';
import { AuthorType } from './author.type';

@Resolver(of => AuthorType)
export class AuthorResolver {
    constructor (
        private authorService: AuthorService,
        private bookService: BookService,
        ){}

    @Query(returns => [AuthorType], {name: 'authors'})
    async getAll(){
        return await this.authorService.getAll()
    }

    @Query(returns =>  AuthorType, {name: 'author'})
    async getByFullName(
        @Args('firstName') firstName: string,
        @Args('lastName') lastName: string){
        return this.authorService.getByFullName(firstName, lastName)
    }

    @Mutation(returns => AuthorType, {name: 'addAuthor'})
    async addAuthor(
        @Args('authorDetails') data: AuthorInputDTO
    ){
        return await this.authorService.addAuthor(data)
    }

    @ResolveField()
    async books(@Parent() author: Author,
    @Args("year", {nullable: true}) year: string) {
        return this.bookService.getBooksByIds(author.books, year)
    }


}
