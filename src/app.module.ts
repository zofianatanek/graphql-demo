import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm'
import { GraphQLModule } from '@nestjs/graphql';
import { BookModule } from './book/book.module';
import { Book } from './book/book.entity';
import { AuthorModule } from './author/author.module';
import { Author } from './author/author.entity';
import { publishWrapperDirectiveTransformer } from './directives/published.directive';
import { GraphQLDirective, DirectiveLocation } from 'graphql';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mongodb',
      url: 'mongodb://localhost/bookstore',
      synchronize: true,
      useUnifiedTopology: true,
      entities: [Book, Author]
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: 'schema.gql',
      transformSchema: (schema) => publishWrapperDirectiveTransformer(schema, 'published'),
      buildSchemaOptions: {
        directives: [
          new GraphQLDirective({
            name: 'published',
            locations: [DirectiveLocation.FIELD_DEFINITION],
          }),
        ],
      },
      installSubscriptionHandlers: true,
    }),
    BookModule,
    AuthorModule,
  ],
})
export class AppModule {}
