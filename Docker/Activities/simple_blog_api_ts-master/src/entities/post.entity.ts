import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity()
export default class Post {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column()
	title: string;

	@Column()
	body: string;

	@Column()
	author: string;

	@CreateDateColumn()
	timestamp: string;

}
