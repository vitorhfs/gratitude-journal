import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";

@Entity({ name: 'phrases'})
export class Phrase {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "varchar", length: "300"})
  content: string;

  @Column()
  date: string;

  @ManyToOne(type => User, user => user.phrases)
  user: string;
}