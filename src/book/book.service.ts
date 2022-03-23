import {  Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BookInputDTO } from './book.input';
import { Book } from './book.entity';


@Injectable()
export class BookService {
    constructor(
        @InjectRepository(Book) private bookRepository: Repository<Book>
    ){}
    async getById(id: number): Promise<Book>{
        return await this.bookRepository.findOneByOrFail({id})
    }
    
    async getByTitle(title: string): Promise<Book>{
        return await this.bookRepository.findOneByOrFail({title})
    } 

    async getAll(): Promise<Book[]>{
        return await this.bookRepository.find()
    }

    async getByAuthor(author: number): Promise<Book[]>{
        return await this.bookRepository.findBy({author})
    }

    async getByYear(year: string): Promise<Book[]>{
        return await this.bookRepository.findBy({year})
    }

    async addBook(data: BookInputDTO): Promise<Book>{
        const [, amount] = await this.bookRepository.findAndCount()
        const id = amount + 1
        const book = this.bookRepository.create({id, ...data})
        return await this.bookRepository.save(book)
    }

    async getBooksByIds(ids: number[], year = ''): Promise<Book[]>{
        const where = year ? {
            id: {$in: ids}, year} : {id: {$in: ids}}
        
            const books = this.bookRepository.find({
            // @ts-expect-error test
            where
        })
        return books
      
    }
}

