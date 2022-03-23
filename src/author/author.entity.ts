import { Column, Entity, ObjectIdColumn, PrimaryColumn } from "typeorm";

@Entity() 
    export class Author {
        @ObjectIdColumn()
        _id: string;

        @PrimaryColumn()
        id: number

        @Column()
        firstName: string;

        @Column()
        lastName: string

        @Column()
        yearOfBirth: string
    
        @Column()
        nationality: string

        @Column()
        books: number[]
    }
