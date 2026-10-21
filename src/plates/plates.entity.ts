import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity({ schema: process.env.PLATES_SCHEMA, name: 'plates' })
export class Plates {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty()
  @Column()
  nameCar: string;

  @ApiProperty()
  @Column({ unique: true })
  WordPlates: string;

  @ApiProperty()
  @Column({ unique: true })
  NumPlates: number;

  @ApiProperty()
  @Column({ type: 'timestamptz', nullable: true })
  CreatedAt: Date;

  @ApiProperty()
  @Column({ type: 'timestamptz', nullable: true })
  ValidUntil: Date;
}
