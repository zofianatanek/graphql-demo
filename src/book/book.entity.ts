import { Column, Entity, ObjectIdColumn, PrimaryColumn } from "typeorm";

@Entity()
export class Book {
    @ObjectIdColumn()
    _id: string;

    @PrimaryColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    author: number;

    @Column()
    year: string;

    @Column()
    genre: string
}