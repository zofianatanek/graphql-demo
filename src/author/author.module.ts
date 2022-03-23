import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookModule } from 'src/book/book.module';
import { Author } from './author.entity';
import { AuthorResolver } from './author.resolver';
import { AuthorService } from './author.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Author]),
    forwardRef(() => BookModule)
  ],
  exports: [AuthorService],
  providers: [AuthorResolver, AuthorService]
})
export class AuthorModule {}
