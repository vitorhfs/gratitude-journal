import {Entity, PrimaryGeneratedColumn, Column, OneToMany} from "typeorm";
import { Phrase } from "./Phrase";

@Entity({ name: 'users'})
export class User {
    @PrimaryGeneratedColumn("uuid")
    id: number;

    @Column({ type: 'varchar', length: 150})
    name: string;

    @Column()
    auth: string;

    @OneToMany(type => Phrase, phrase => phrase.user)
    phrases: Promise<Phrase[]>;
}
