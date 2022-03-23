import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthorModule } from 'src/author/author.module';
import { Book } from './book.entity';
import { BookResolver } from './book.resolver';
import { BookService } from './book.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([Book]),
        forwardRef(() => AuthorModule)
    ],
    exports: [BookService],
    providers: [BookResolver, BookService]
})
export class BookModule {}
