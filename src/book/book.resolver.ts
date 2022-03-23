import { Args, Mutation, Query, Subscription } from "@nestjs/graphql";
import { Resolver } from "@nestjs/graphql";
import { PubSub } from 'graphql-subscriptions';
import { AuthorService } from "src/author/author.service";
import { BookInputDTO } from "./book.input";
import { BookService } from "./book.service";
import { BookType } from "./book.type"

const pubSub = new PubSub()

@Resolver(of => BookType)
export class BookResolver{
    constructor(
        private bookService: BookService,
        private authorService: AuthorService
    ){}
    
    @Query(returns => BookType, {name: 'book'})
    async getById(
        @Args('id') id: number) 
        {
        return await this.bookService.getById(id)
    }
    @Query(returns => BookType, {name: 'title'})
    async getByTitle(
        @Args('title') title: string) 
        {
        return await this.bookService.getByTitle(title)
    }
    @Query(returns => [BookType], {name: 'booksByAuthor'})
    async getByAuthor(
        @Args('author') author: number) 
        {
        return await this.bookService.getByAuthor(author)
    }
    @Query(returns => [BookType], {name: 'booksByYear'})
    async getByYear(
        @Args('year') author: number) 
        {
        return await this.bookService.getByAuthor(author)
    }

    @Query(returns => [BookType], {name: 'books'})
    async getAll() {
        return await this.bookService.getAll()
    }

    @Mutation(returns => BookType)
    async addBook( 
        @Args('bookDetails') data: BookInputDTO,
        ){
            const book = await this.bookService.addBook(data);
            await this.authorService.assignBook(data.author, book.id)
            pubSub.publish('bookAdded', {bookAdded: book})
            pubSub.publish('specificBookAdded', {specificBookAdded: book})
        return book
    }

    @Subscription(returns => BookType, {
    })
    bookAdded(){
        return pubSub.asyncIterator('bookAdded')
    }

    @Subscription(returns => BookType, {
        filter: (payload, variables) => 
        payload.specificBookAdded.title === variables.title
        
    })
    specificBookAdded(@Args('title') title: string){
        return pubSub.asyncIterator('specificBookAdded')
    }
}