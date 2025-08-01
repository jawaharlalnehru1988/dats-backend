import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number; // Unique identifier for the user

  @Column()
  name: string; // Name of the user

  @Column({ unique: true })
  email: string; // Email of the user

  @Column()
  phone: string; // Phone number of the user

  @Column()
  address: string; // Address of the user

  @Column()
  password: string; // Password of the user

  @Column()
  role: string; // Role of the user (e.g., admin, user)

  @Column({ default: true })
  isActive: boolean; // Status of the user (active or inactive)
}
