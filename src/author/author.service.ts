import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BookService } from 'src/book/book.service';
import { Repository } from 'typeorm';
import { AuthorInputDTO } from './author.input';
import { Author } from './author.entity';

@Injectable()
export class AuthorService {
    constructor(
        @InjectRepository(Author) private authorRepository: Repository<Author>,

    ){}
    async getAll(): Promise<Author[]>{
        return await this.authorRepository.find()
    }

    async getByFullName(firstName: string, lastName: string): Promise<Author>{
        return this.authorRepository.findOneBy({
            firstName,
            lastName
        })
    }

    async addAuthor(data: AuthorInputDTO): Promise<Author>{
        const [, amount] = await this.authorRepository.findAndCount()
        const id = amount + 1
        const author = this.authorRepository.create({id, ...data, books: []})
        return await this.authorRepository.save(author)
    }

    async assignBook(authorId: number, bookId: number): Promise<Author>{
        const author = await this.authorRepository.findOneBy({id: authorId})
        author.books = [...author.books, bookId]
        const newAuthor = this.authorRepository.create(author)
        return await this.authorRepository.save(author)

    }
}
